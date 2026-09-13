import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ACCESS_COOKIE, verifyAccessToken } from '@/lib/auth/tokens';

const roleHome: Record<string, string> = {
  admin: '/admin',
  client: '/client',
  vendor: '/vendor',
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ACCESS_COOKIE)?.value;

  if (pathname === '/login') {
    if (!token) return NextResponse.next();
    try {
      const session = await verifyAccessToken(token);
      return NextResponse.redirect(new URL(roleHome[session.role] ?? '/', request.url));
    } catch {
      return NextResponse.next();
    }
  }

  if (!token) {
    const login = new URL('/login', request.url);
    login.searchParams.set('next', pathname);
    return NextResponse.redirect(login);
  }

  try {
    const session = await verifyAccessToken(token);
    if (pathname.startsWith('/admin') && session.role !== 'admin') {
      return NextResponse.redirect(new URL(roleHome[session.role], request.url));
    }
    if (pathname.startsWith('/client') && session.role !== 'client') {
      return NextResponse.redirect(new URL(roleHome[session.role], request.url));
    }
    if (pathname.startsWith('/vendor') && session.role !== 'vendor') {
      return NextResponse.redirect(new URL(roleHome[session.role], request.url));
    }
    return NextResponse.next();
  } catch {
    const login = new URL('/login', request.url);
    login.searchParams.set('next', pathname);
    return NextResponse.redirect(login);
  }
}

export const config = {
  matcher: ['/login', '/account/:path*', '/client/:path*', '/vendor/:path*', '/admin/:path*'],
};
