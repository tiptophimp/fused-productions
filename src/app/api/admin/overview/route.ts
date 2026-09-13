import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireApiSession } from '@/lib/auth/session';
import { getPrisma } from '@/lib/db';
import { integrationStatus } from '@/lib/ops/integrations';

export async function GET() {
  const { session, error } = await requireApiSession(['admin']);
  if (error) return error;

  const prisma = getPrisma();
  const [events, vendors, inquiries, invoices, outbox] = await Promise.all([
    prisma.event.findMany({
      include: { client: true, milestones: true, assignments: { include: { vendor: true } }, surveys: true },
      orderBy: { eventDate: 'asc' },
    }),
    prisma.vendor.findMany({ include: { user: true, compliance: true } }),
    prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 50 }),
    prisma.invoice.findMany({ include: { vendor: true, event: true }, orderBy: { submittedAt: 'desc' }, take: 40 }),
    prisma.outboxEmail.findMany({ orderBy: { createdAt: 'desc' }, take: 30 }),
  ]);

  return NextResponse.json({
    events: events.map((event) => ({
      id: event.id,
      name: event.eventName,
      date: event.eventDate.toISOString(),
      status: event.status,
      phase: event.phase,
      client: { name: event.client.name, email: event.client.email },
      total: Number(event.totalContractPrice),
      milestones: event.milestones.map((m) => ({
        id: m.id,
        name: m.milestoneName,
        amount: Number(m.amount),
        status: m.status,
      })),
      vendors: event.assignments.map((a) => ({
        id: a.vendor.id,
        company: a.vendor.companyName,
        status: a.dispatchStatus,
      })),
      surveyCount: event.surveys.length,
    })),
    vendors: vendors.map((v) => ({
      id: v.id,
      companyName: v.companyName,
      serviceType: v.serviceType,
      email: v.user.email,
      coiVerified: v.coiVerified,
      w9OnFile: v.w9OnFile,
      slaSigned: Boolean(v.slaSignedAt),
      files: v.compliance.length,
    })),
    inquiries,
    invoices: invoices.map((inv) => ({
      id: inv.id,
      amount: Number(inv.amount),
      status: inv.status,
      company: inv.vendor.companyName,
      eventName: inv.event.eventName,
    })),
    outbox: outbox.map((row) => ({
      id: row.id,
      toEmail: row.toEmail,
      subject: row.subject,
      body: row.body,
      sentAt: row.sentAt?.toISOString() ?? null,
      sentVia: row.sentVia,
      error: row.error,
      createdAt: row.createdAt.toISOString(),
    })),
    integrations: integrationStatus(),
  });
}

const verifySchema = z.object({
  vendorId: z.string().uuid(),
  coiVerified: z.boolean(),
});

export async function PATCH(request: NextRequest) {
  const { session, error } = await requireApiSession(['admin']);
  if (error) return error;

  const parsed = verifySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'vendorId and coiVerified required' }, { status: 400 });
  }

  await getPrisma().vendor.update({
    where: { id: parsed.data.vendorId },
    data: { coiVerified: parsed.data.coiVerified },
  });
  return NextResponse.json({ ok: true });
}
