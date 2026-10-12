import { NextResponse } from 'next/server';
import { isDatabaseConfigured, getPrisma } from '@/lib/db';

export async function GET() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: true, database: false });
  }
  try {
    await getPrisma().$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, database: true });
  } catch {
    return NextResponse.json({ ok: false, database: false }, { status: 503 });
  }
}
