import { NextResponse } from 'next/server';
import { ACCESS_COOKIE, REFRESH_COOKIE } from '@/lib/auth/tokens';

const isProd = process.env.NODE_ENV === 'production';

export function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax' as const,
    path: '/',
    maxAge,
  };
}

export function applySessionCookies(response: NextResponse, access: string, refresh: string) {
  response.cookies.set(ACCESS_COOKIE, access, cookieOptions(60 * 60 * 24));
  response.cookies.set(REFRESH_COOKIE, refresh, cookieOptions(60 * 60 * 24 * 30));
  return response;
}

export function clearSessionCookies(response: NextResponse) {
  response.cookies.set(ACCESS_COOKIE, '', { ...cookieOptions(0), maxAge: 0 });
  response.cookies.set(REFRESH_COOKIE, '', { ...cookieOptions(0), maxAge: 0 });
  return response;
}
