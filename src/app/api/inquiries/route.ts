import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { isDatabaseConfigured, getPrisma } from '@/lib/db';

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  eventType: z.string().optional(),
  eventDate: z.string().optional(),
  guestCount: z.string().optional(),
  budget: z.string().optional(),
  services: z.string().optional(),
  details: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Name and email required' }, { status: 400 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: true, stored: false });
  }

  await getPrisma().inquiry.create({
    data: {
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName ?? '',
      email: parsed.data.email,
      phone: parsed.data.phone,
      eventType: parsed.data.eventType,
      eventDate: parsed.data.eventDate,
      guestCount: parsed.data.guestCount,
      budget: parsed.data.budget,
      services: parsed.data.services,
      details: parsed.data.details,
    },
  });

  return NextResponse.json({ ok: true, stored: true });
}
