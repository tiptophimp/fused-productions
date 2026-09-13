import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requestIp, requireApiSession } from '@/lib/auth/session';
import { getPrisma } from '@/lib/db';
import { slaBody } from '@/lib/ops/provision';

export async function GET() {
  const { session, error } = await requireApiSession(['vendor']);
  if (error) return error;
  const vendor = await getPrisma().vendor.findUnique({ where: { userId: session.sub } });
  if (!vendor) return NextResponse.json({ error: 'Vendor profile missing' }, { status: 404 });
  return NextResponse.json({
    slaBody: slaBody(),
    slaSignedAt: vendor.slaSignedAt?.toISOString() ?? null,
    slaSignedName: vendor.slaSignedName,
  });
}

const schema = z.object({ signedName: z.string().min(2).max(120) });

export async function POST(request: NextRequest) {
  const { session, error } = await requireApiSession(['vendor']);
  if (error) return error;

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'signedName required' }, { status: 400 });
  }

  const prisma = getPrisma();
  const vendor = await prisma.vendor.findUnique({ where: { userId: session.sub } });
  if (!vendor) return NextResponse.json({ error: 'Vendor profile missing' }, { status: 404 });

  await prisma.vendor.update({
    where: { id: vendor.id },
    data: {
      slaSignedName: parsed.data.signedName.trim(),
      slaSignedAt: new Date(),
    },
  });
  void requestIp(request);
  return NextResponse.json({ ok: true });
}
