import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import type { Role } from '@prisma/client';
import { getPrisma, isDatabaseConfigured } from '@/lib/db';
import { ACCESS_COOKIE, verifyAccessToken, type AccessClaims } from '@/lib/auth/tokens';

export async function readSession(): Promise<AccessClaims | null> {
  if (!isDatabaseConfigured()) return null;
  const token = (await cookies()).get(ACCESS_COOKIE)?.value;
  if (!token) return null;
  try {
    return await verifyAccessToken(token);
  } catch {
    return null;
  }
}

export async function requireApiSession(
  roles?: Role[]
): Promise<{ session: AccessClaims; error: null } | { session: null; error: NextResponse }> {
  const session = await readSession();
  if (!session) {
    return { session: null, error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }
  if (roles && !roles.includes(session.role)) {
    return { session: null, error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) };
  }
  return { session, error: null };
}

export function requestIp(request: NextRequest) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

export { getPrisma };
