# Fused ops portal

Marketing site stays public. Client, vendor, and admin portals live at `/login`. Do not put portal CTAs on the public hero until production Postgres and keys are live.

## Drop in keys (production)

On the GMKtec host, edit `/home/ernest/projects/active/fused-productions/.env` using `deploy/env.example`. Deploys keep those values and only update `FUSED_IMAGE`.

If this host should run Postgres too:

```bash
docker compose -f docker-compose.yml -f docker-compose.db.yml up -d
```

Set `POSTGRES_PASSWORD` and a matching `DATABASE_URL` first. If Postgres already lives elsewhere, skip the db overlay and only set `DATABASE_URL`.

Required for portals:

- `DATABASE_URL`
- `JWT_SECRET` (32+ characters)
- `SITE_URL=https://fusedproductions.com`

Optional:

- Stripe: `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET`
  - Webhook URL: `https://fusedproductions.com/api/stripe/webhook`
  - Events: `checkout.session.completed`, `checkout.session.async_payment_succeeded`
- Mail: `RESEND_API_KEY` **or** `SMTP_HOST` / `SMTP_USER` / `SMTP_PASS` (or `SMTP_URL`)
- Keep `FUSED_DEMO_PAYMENTS=0` in production

Container boot runs `prisma migrate deploy` when `DATABASE_URL` is set (`RUN_MIGRATIONS=1`). Admin → **Drop-in keys** shows ready/not ready without printing secrets. `GET /api/health` returns the same flags.

## Local Postgres

```bash
docker compose up -d db
copy .env.example .env
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

Local app: [http://localhost:3010](http://localhost:3010). Docker production also publishes the site on host **3010**.

Logins use `SEED_PASSWORD` from `.env`:

- `admin@fusedproductions.com` → `/admin`
- `client@fusedproductions.com` → `/client`
- `vendor@fusedproductions.com` → `/vendor`

Set `FUSED_DEMO_PAYMENTS=1` so client “Pay draw” marks the ledger paid in development. With Stripe keys, Pay draw opens Checkout; the webhook (and the return URL) mark the milestone paid.

Admin can create clients/events/vendors, assign gigs, convert inquiries, complete events (survey opens after status=completed; due timestamp is +48h), and mark vendor invoices paid.

The public site still starts without a database; portals return 503 until `DATABASE_URL` is set and migrations have been applied.
