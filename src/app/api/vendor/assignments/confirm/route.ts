import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireApiSession } from '@/lib/auth/session';
import { getPrisma } from '@/lib/db';

const schema = z.object({ assignmentId: z.string().uuid() });

export async function POST(request: NextRequest) {
  const { session, error } = await requireApiSession(['vendor']);
  if (error) return error;

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'assignmentId required' }, { status: 400 });
  }

  const prisma = getPrisma();
  const vendor = await prisma.vendor.findUnique({ where: { userId: session.sub } });
  if (!vendor) return NextResponse.json({ error: 'Vendor profile missing' }, { status: 404 });
  if (!vendor.slaSignedAt) {
    return NextResponse.json({ error: 'Sign the SLA first' }, { status: 403 });
  }

  const assignment = await prisma.eventAssignment.findFirst({
    where: { id: parsed.data.assignmentId, vendorId: vendor.id },
  });
  if (!assignment) return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });

  await prisma.eventAssignment.update({
    where: { id: assignment.id },
    data: { dispatchStatus: 'confirmed' },
  });
  return NextResponse.json({ ok: true });
}
