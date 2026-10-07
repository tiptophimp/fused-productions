import type { NextRequest } from 'next/server';

/** Prefer Cloudflare's client IP; do not trust a spoofed X-Forwarded-For alone. */
export function clientIp(request: NextRequest) {
  const cf = request.headers.get('cf-connecting-ip')?.trim();
  if (cf) return cf;
  const real = request.headers.get('x-real-ip')?.trim();
  if (real) return real;
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const parts = forwarded.split(',').map((part) => part.trim()).filter(Boolean);
    return parts[parts.length - 1] || 'unknown';
  }
  return 'unknown';
}
