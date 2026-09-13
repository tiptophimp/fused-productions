export function integrationStatus() {
  const smtpHost = Boolean(process.env.SMTP_HOST);
  const smtpUrl = Boolean(process.env.SMTP_URL);
  const resend = Boolean(process.env.RESEND_API_KEY);

  return {
    database: Boolean(process.env.DATABASE_URL),
    jwt: (process.env.JWT_SECRET?.length ?? 0) >= 32,
    stripe: Boolean(process.env.STRIPE_SECRET_KEY),
    stripeWebhook: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
    mail: smtpHost || smtpUrl || resend,
    mailProvider: resend ? 'resend' : smtpUrl || smtpHost ? 'smtp' : 'outbox-only',
    demoPayments: process.env.FUSED_DEMO_PAYMENTS === '1',
    siteUrl: (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, ''),
  };
}
