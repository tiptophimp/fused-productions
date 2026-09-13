import { NextResponse } from 'next/server';
import { isDatabaseConfigured, getPrisma } from '@/lib/db';
import { integrationStatus } from '@/lib/ops/integrations';

export async function GET() {
  const integrations = integrationStatus();
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: true, database: false, integrations });
  }
  try {
    await getPrisma().$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, database: true, integrations });
  } catch {
    return NextResponse.json({ ok: false, database: false, integrations }, { status: 503 });
  }
}
