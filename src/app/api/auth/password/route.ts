import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireApiSession } from '@/lib/auth/session';
import { getPrisma } from '@/lib/db';
import { hashPassword, verifyPassword } from '@/lib/auth/password';

const schema = z.object({
  current: z.string().min(8),
  next: z.string().min(8),
});

export async function POST(request: NextRequest) {
  const { session, error } = await requireApiSession();
  if (error) return error;

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Current and new password required (8+ characters)' }, { status: 400 });
  }

  const prisma = getPrisma();
  const user = await prisma.user.findUnique({ where: { id: session.sub } });
  if (!user || !(await verifyPassword(parsed.data.current, user.passwordHash))) {
    return NextResponse.json({ error: 'Current password is wrong' }, { status: 401 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: await hashPassword(parsed.data.next) },
  });
  await prisma.refreshToken.deleteMany({ where: { userId: user.id } });
  return NextResponse.json({ ok: true });
}
