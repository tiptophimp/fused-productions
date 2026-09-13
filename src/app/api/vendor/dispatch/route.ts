import { NextResponse } from 'next/server';
import { requireApiSession } from '@/lib/auth/session';
import { getPrisma } from '@/lib/db';

export async function GET() {
  const { session, error } = await requireApiSession(['vendor']);
  if (error) return error;

  const prisma = getPrisma();
  const vendor = await prisma.vendor.findUnique({
    where: { userId: session.sub },
    include: {
      assignments: {
        include: { event: true },
        orderBy: { loadInWindow: 'asc' },
      },
      invoices: { orderBy: { submittedAt: 'desc' }, take: 20 },
      compliance: { orderBy: { uploadedAt: 'desc' } },
    },
  });

  if (!vendor) {
    return NextResponse.json({ error: 'Vendor profile missing' }, { status: 404 });
  }

  return NextResponse.json({
    vendor: {
      id: vendor.id,
      companyName: vendor.companyName,
      serviceType: vendor.serviceType,
      coiVerified: vendor.coiVerified,
      w9OnFile: vendor.w9OnFile,
      slaSignedAt: vendor.slaSignedAt?.toISOString() ?? null,
    },
    assignments: vendor.slaSignedAt
      ? vendor.assignments.map((row) => ({
      id: row.id,
      eventId: row.eventId,
      eventName: row.event.eventName,
      eventDate: row.event.eventDate.toISOString(),
      venue: row.event.venue,
      loadInWindow: row.loadInWindow?.toISOString() ?? null,
      dispatchStatus: row.dispatchStatus,
      zoneNotes: row.zoneNotes,
      cueNotes: row.cueNotes,
      runSheet: row.event.runSheet,
      phase: row.event.phase,
    }))
      : [],
    invoices: vendor.invoices.map((inv) => ({
      id: inv.id,
      eventId: inv.eventId,
      amount: Number(inv.amount),
      notes: inv.notes,
      status: inv.status,
      submittedAt: inv.submittedAt.toISOString(),
    })),
    compliance: vendor.compliance.map((file) => ({
      id: file.id,
      kind: file.kind,
      fileName: file.fileName,
      uploadedAt: file.uploadedAt.toISOString(),
    })),
  });
}
