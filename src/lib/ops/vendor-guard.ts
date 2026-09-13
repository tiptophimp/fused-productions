import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/db';
import type { AccessClaims } from '@/lib/auth/tokens';

export async function requireSignedSla(session: AccessClaims) {
  const vendor = await getPrisma().vendor.findUnique({ where: { userId: session.sub } });
  if (!vendor) {
    return { vendor: null, error: NextResponse.json({ error: 'Vendor profile missing' }, { status: 404 }) };
  }
  if (!vendor.slaSignedAt) {
    return { vendor: null, error: NextResponse.json({ error: 'Sign the SLA first' }, { status: 403 }) };
  }
  return { vendor, error: null };
}
