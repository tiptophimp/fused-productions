import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getPrisma, isDatabaseConfigured } from '@/lib/db';
import { verifyPassword } from '@/lib/auth/password';
import { signAccessToken } from '@/lib/auth/tokens';
import { createRefreshToken, hashRefreshToken } from '@/lib/auth/refresh';
import { applySessionCookies } from '@/lib/auth/cookies';
import { clientIp } from '@/lib/ops/client-ip';
import { isRateLimited } from '@/lib/ops/rate-limit';

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: 'Portal database is not configured' }, { status: 503 });
  }

  const ip = clientIp(request);
  if (isRateLimited(`login:${ip}`, 20, 15 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many login attempts' }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
  }

  const prisma = getPrisma();
  const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const access = await signAccessToken({
    sub: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  });
  const refresh = createRefreshToken();
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash: hashRefreshToken(refresh),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  const response = NextResponse.json({
    ok: true,
    role: user.role,
    name: user.name,
  });
  return applySessionCookies(response, access, refresh);
}
