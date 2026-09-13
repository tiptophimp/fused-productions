import { NextRequest, NextResponse } from 'next/server';
import { requireApiSession } from '@/lib/auth/session';
import { getPrisma } from '@/lib/db';

function daysUntil(date: Date) {
  return Math.max(0, Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
}

function serializeEvent(
  event: Awaited<ReturnType<typeof loadEvent>>
) {
  if (!event) return null;
  const paid = event.milestones
    .filter((m) => m.status === 'paid')
    .reduce((sum, m) => sum + Number(m.amount), 0);
  return {
    id: event.id,
    name: event.eventName,
    date: event.eventDate.toISOString(),
    daysUntil: daysUntil(event.eventDate),
    status: event.status,
    phase: event.phase,
    venue: event.venue,
    runSheet: event.runSheet,
    totalContractPrice: Number(event.totalContractPrice),
    paidTotal: paid,
    balance: Number(event.totalContractPrice) - paid,
    milestones: event.milestones.map((m) => ({
      id: m.id,
      name: m.milestoneName,
      percentage: Number(m.percentage),
      amount: Number(m.amount),
      status: m.status,
      dueDate: m.dueDate.toISOString(),
    })),
    documents: event.documents.map((d) => ({
      id: d.id,
      title: d.title,
      body: d.body,
      status: d.status,
      signedName: d.signedName,
      signedAt: d.signedAt?.toISOString() ?? null,
    })),
    surveyOpen: event.status === 'completed' && event.surveys.length === 0,
    surveyDueAt: event.surveyDueAt?.toISOString() ?? null,
  };
}

function loadEvent(id: string, clientId: string) {
  return getPrisma().event.findFirst({
    where: { id, clientId, status: { not: 'cancelled' } },
    include: {
      milestones: { orderBy: { dueDate: 'asc' } },
      documents: true,
      surveys: true,
    },
  });
}

export async function GET(request: NextRequest) {
  const { session, error } = await requireApiSession(['client']);
  if (error) return error;

  const prisma = getPrisma();
  const summaries = await prisma.event.findMany({
    where: { clientId: session.sub, status: { not: 'cancelled' } },
    select: { id: true, eventName: true, eventDate: true, status: true },
    orderBy: { eventDate: 'desc' },
  });

  const requested = request.nextUrl.searchParams.get('eventId');
  const chosenId = summaries.some((row) => row.id === requested) ? requested : summaries[0]?.id;

  const event = chosenId ? await loadEvent(chosenId, session.sub) : null;

  return NextResponse.json({
    client: { name: session.name, email: session.email },
    events: summaries.map((row) => ({
      id: row.id,
      name: row.eventName,
      date: row.eventDate.toISOString(),
      status: row.status,
    })),
    event: serializeEvent(event),
  });
}
