import { NextRequest, NextResponse } from 'next/server';
import { requireApiSession } from '@/lib/auth/session';
import { getPrisma } from '@/lib/db';
import { getStripe, markMilestonePaidFromCheckout } from '@/lib/ops/stripe';
import { z } from 'zod';

const bodySchema = z.object({
  sessionId: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const { session, error } = await requireApiSession(['client']);
  if (error) return error;

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'sessionId required' }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 503 });
  }

  const checkout = await stripe.checkout.sessions.retrieve(parsed.data.sessionId);
  if (checkout.metadata?.clientId !== session.sub) {
    return NextResponse.json({ error: 'Session does not match this account' }, { status: 403 });
  }

  const milestoneId = checkout.metadata?.milestoneId;
  if (milestoneId) {
    const owned = await getPrisma().milestone.findFirst({
      where: { id: milestoneId, event: { clientId: session.sub } },
      select: { id: true },
    });
    if (!owned) {
      return NextResponse.json({ error: 'Milestone not found' }, { status: 404 });
    }
  }

  const result = await markMilestonePaidFromCheckout(checkout);
  return NextResponse.json({
    ok: true,
    paid: checkout.payment_status === 'paid' || checkout.status === 'complete',
    updated: result.updated,
  });
}
