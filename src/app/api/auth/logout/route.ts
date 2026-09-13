import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getPrisma, isDatabaseConfigured } from '@/lib/db';
import { REFRESH_COOKIE } from '@/lib/auth/tokens';
import { hashRefreshToken } from '@/lib/auth/refresh';
import { clearSessionCookies } from '@/lib/auth/cookies';

export async function POST() {
  if (isDatabaseConfigured()) {
    const refresh = (await cookies()).get(REFRESH_COOKIE)?.value;
    if (refresh) {
      await getPrisma()
        .refreshToken.deleteMany({ where: { tokenHash: hashRefreshToken(refresh) } })
        .catch(() => undefined);
    }
  }
  return clearSessionCookies(NextResponse.json({ ok: true }));
}
