import { NextRequest, NextResponse } from 'next/server';
import { requireApiSession } from '@/lib/auth/session';
import { getPrisma } from '@/lib/db';
import { getStripe, publicSiteUrl } from '@/lib/ops/stripe';
import { z } from 'zod';

const bodySchema = z.object({
  milestoneId: z.string().uuid(),
});

export async function POST(request: NextRequest) {
  const { session, error } = await requireApiSession(['client']);
  if (error) return error;

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'milestoneId required' }, { status: 400 });
  }

  const prisma = getPrisma();
  const milestone = await prisma.milestone.findFirst({
    where: { id: parsed.data.milestoneId, event: { clientId: session.sub } },
    include: { event: true },
  });

  if (!milestone) {
    return NextResponse.json({ error: 'Milestone not found' }, { status: 404 });
  }
  if (milestone.status === 'paid') {
    return NextResponse.json({ error: 'Already paid' }, { status: 409 });
  }

  const stripe = getStripe();
  if (stripe) {
    const cents = Math.round(Number(milestone.amount) * 100);
    const origin = publicSiteUrl();
    const checkout = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: session.email,
      success_url: `${origin}/client?paid=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/client?paid=0`,
      metadata: {
        milestoneId: milestone.id,
        eventId: milestone.eventId,
        clientId: session.sub,
      },
      payment_intent_data: {
        metadata: {
          milestoneId: milestone.id,
          eventId: milestone.eventId,
          clientId: session.sub,
        },
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: cents,
            product_data: {
              name: `${milestone.milestoneName} — ${milestone.event.eventName}`,
            },
          },
        },
      ],
    });

    await prisma.milestone.update({
      where: { id: milestone.id },
      data: { stripeCheckoutSessionId: checkout.id },
    });

    return NextResponse.json({
      ok: true,
      processor: 'stripe',
      url: checkout.url,
    });
  }

  if (process.env.FUSED_DEMO_PAYMENTS === '1') {
    await prisma.milestone.update({
      where: { id: milestone.id },
      data: { status: 'paid' },
    });
    return NextResponse.json({
      ok: true,
      processor: 'demo-ledger',
      milestoneId: milestone.id,
      amount: Number(milestone.amount),
    });
  }

  return NextResponse.json({
    ok: false,
    processor: 'offline',
    message:
      'Card processing is not live. Send the milestone amount to Fused Productions and an admin will mark the draw paid.',
    amount: Number(milestone.amount),
    milestone: milestone.milestoneName,
  });
}
