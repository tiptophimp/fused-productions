import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireApiSession } from '@/lib/auth/session';
import { getPrisma } from '@/lib/db';

const schema = z.object({
  eventId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comments: z.string().max(4000).optional(),
});

export async function POST(request: NextRequest) {
  const { session, error } = await requireApiSession(['client']);
  if (error) return error;

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'eventId and rating 1-5 required' }, { status: 400 });
  }

  const prisma = getPrisma();
  const event = await prisma.event.findFirst({
    where: { id: parsed.data.eventId, clientId: session.sub, status: 'completed' },
    include: { surveys: true },
  });
  if (!event) {
    return NextResponse.json({ error: 'Event not ready for survey' }, { status: 404 });
  }
  if (event.surveys.length) {
    return NextResponse.json({ error: 'Survey already submitted' }, { status: 409 });
  }

  await prisma.surveyResponse.create({
    data: {
      eventId: event.id,
      rating: parsed.data.rating,
      comments: parsed.data.comments,
    },
  });
  return NextResponse.json({ ok: true });
}
