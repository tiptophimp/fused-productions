import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getPrisma, isDatabaseConfigured } from '@/lib/db';
import { REFRESH_COOKIE, signAccessToken } from '@/lib/auth/tokens';
import { createRefreshToken, hashRefreshToken } from '@/lib/auth/refresh';
import { applySessionCookies, clearSessionCookies } from '@/lib/auth/cookies';

export async function POST() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: 'Portal database is not configured' }, { status: 503 });
  }

  const jar = await cookies();
  const refresh = jar.get(REFRESH_COOKIE)?.value;
  if (!refresh) {
    return clearSessionCookies(NextResponse.json({ error: 'No refresh token' }, { status: 401 }));
  }

  const prisma = getPrisma();
  const tokenHash = hashRefreshToken(refresh);
  const stored = await prisma.refreshToken.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!stored || stored.expiresAt < new Date()) {
    if (stored) await prisma.refreshToken.delete({ where: { id: stored.id } }).catch(() => undefined);
    return clearSessionCookies(NextResponse.json({ error: 'Refresh expired' }, { status: 401 }));
  }

  await prisma.refreshToken.delete({ where: { id: stored.id } });
  const nextRefresh = createRefreshToken();
  await prisma.refreshToken.create({
    data: {
      userId: stored.userId,
      tokenHash: hashRefreshToken(nextRefresh),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  const access = await signAccessToken({
    sub: stored.user.id,
    email: stored.user.email,
    role: stored.user.role,
    name: stored.user.name,
  });

  const response = NextResponse.json({ ok: true, role: stored.user.role });
  return applySessionCookies(response, access, nextRefresh);
}
