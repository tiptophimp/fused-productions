import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireApiSession } from '@/lib/auth/session';
import { getPrisma } from '@/lib/db';

const bodySchema = z.object({
  eventId: z.string().uuid(),
  amount: z.number().positive(),
  notes: z.string().max(2000).optional(),
});

export async function POST(request: NextRequest) {
  const { session, error } = await requireApiSession(['vendor']);
  if (error) return error;

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'eventId and amount required' }, { status: 400 });
  }

  const prisma = getPrisma();
  const vendor = await prisma.vendor.findUnique({ where: { userId: session.sub } });
  if (!vendor) {
    return NextResponse.json({ error: 'Vendor profile missing' }, { status: 404 });
  }
  if (!vendor.slaSignedAt) {
    return NextResponse.json({ error: 'Sign the SLA first' }, { status: 403 });
  }

  const assignment = await prisma.eventAssignment.findFirst({
    where: { vendorId: vendor.id, eventId: parsed.data.eventId },
  });
  if (!assignment) {
    return NextResponse.json({ error: 'Not assigned to that event' }, { status: 403 });
  }

  const invoice = await prisma.invoice.create({
    data: {
      vendorId: vendor.id,
      eventId: parsed.data.eventId,
      amount: parsed.data.amount,
      notes: parsed.data.notes,
    },
  });

  await prisma.eventAssignment.update({
    where: { id: assignment.id },
    data: { dispatchStatus: 'completed' },
  });

  return NextResponse.json({
    ok: true,
    invoiceId: invoice.id,
    status: invoice.status,
  });
}
