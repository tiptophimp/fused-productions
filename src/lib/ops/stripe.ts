import Stripe from 'stripe';
import { getPrisma } from '@/lib/db';
import { SITE } from '@/lib/site';

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export function publicSiteUrl() {
  return (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || SITE.url).replace(/\/$/, '');
}

export async function markMilestonePaidFromCheckout(session: Stripe.Checkout.Session) {
  const milestoneId = session.metadata?.milestoneId;
  if (!milestoneId) return { updated: false };
  if (session.payment_status !== 'paid' && session.status !== 'complete') {
    return { updated: false };
  }

  const result = await getPrisma().milestone.updateMany({
    where: { id: milestoneId, status: { not: 'paid' } },
    data: {
      status: 'paid',
      stripeCheckoutSessionId: session.id,
    },
  });

  return { updated: result.count > 0 };
}
