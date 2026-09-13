'use client';

import { FormEvent, useEffect, useState } from 'react';
import { PortalShell } from '@/components/portal/PortalShell';

type Overview = {
  events: {
    id: string;
    name: string;
    date: string;
    status: string;
    phase: string;
    client: { name: string; email: string };
    total: number;
    milestones: { id: string; name: string; amount: number; status: string }[];
    vendors: { id: string; company: string; status: string }[];
    surveyCount: number;
  }[];
  vendors: {
    id: string;
    companyName: string;
    serviceType: string;
    email: string;
    coiVerified: boolean;
    w9OnFile: boolean;
    slaSigned: boolean;
    files: number;
  }[];
  inquiries: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    eventType: string | null;
    createdAt: string;
  }[];
  invoices: {
    id: string;
    amount: number;
    status: string;
    company: string;
    eventName: string;
  }[];
  outbox: {
    id: string;
    toEmail: string;
    subject: string;
    body: string;
    sentAt: string | null;
    sentVia: string | null;
    error: string | null;
    createdAt: string;
  }[];
  integrations: {
    database: boolean;
    jwt: boolean;
    stripe: boolean;
    stripeWebhook: boolean;
    mail: boolean;
    mailProvider: string;
    demoPayments: boolean;
    siteUrl: string;
  };
};

const field = 'rounded-lg border border-white/10 bg-gray-800 px-3 py-2 text-sm';

export default function AdminPage() {
  const [data, setData] = useState<Overview | null>(null);
  const [message, setMessage] = useState('');

  async function load() {
    const res = await fetch('/api/admin/overview');
    setData((await res.json()) as Overview);
  }

  useEffect(() => {
    void load();
  }, []);

  async function ops(payload: Record<string, unknown>) {
    const res = await fetch('/api/admin/ops', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = (await res.json()) as {
      error?: string;
      temporaryPassword?: string;
      clientTemporaryPassword?: string;
    };
    const extra = json.temporaryPassword || json.clientTemporaryPassword;
    setMessage(
      json.error ?? (extra ? `Saved. Temporary password: ${extra}` : 'Saved.')
    );
    await load();
  }

  async function markPaid(milestoneId: string) {
    await fetch('/api/admin/milestones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ milestoneId, status: 'paid' }),
    });
    setMessage('Milestone marked paid.');
    await load();
  }

  async function verifyCoi(vendorId: string, coiVerified: boolean) {
    await fetch('/api/admin/overview', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vendorId, coiVerified }),
    });
    await load();
  }

  function onForm(action: string, extra?: (form: FormData) => Record<string, unknown>) {
    return async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const payload: Record<string, unknown> = { action };
      for (const [key, value] of form.entries()) {
        payload[key] = String(value);
      }
      Object.assign(payload, extra?.(form) ?? {});
      await ops(payload);
      event.currentTarget.reset();
    };
  }

  if (!data) {
    return (
      <PortalShell title="Operations admin" role="Admin">
        <p>Loading…</p>
      </PortalShell>
    );
  }

  return (
    <PortalShell title="Operations admin" role="Admin">
      {message ? <p className="mb-4 whitespace-pre-wrap text-sm text-primary-200">{message}</p> : null}

      <section className="mb-8 rounded-xl border border-white/10 p-4 text-sm text-gray-300">
        <h2 className="mb-2 font-display text-xl font-bold text-white">Drop-in keys</h2>
        <p className="mb-3 text-gray-400">
          Paste values in the host `.env` (see `deploy/env.example`). This page never shows the secrets.
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          <li>Database: {data.integrations.database ? 'ready' : 'set DATABASE_URL'}</li>
          <li>JWT: {data.integrations.jwt ? 'ready' : 'set JWT_SECRET (32+ chars)'}</li>
          <li>
            Stripe:{' '}
            {data.integrations.stripe && data.integrations.stripeWebhook
              ? 'Checkout + webhook ready'
              : data.integrations.stripe
                ? 'secret set — still need STRIPE_WEBHOOK_SECRET'
                : 'set STRIPE_SECRET_KEY + STRIPE_WEBHOOK_SECRET'}
          </li>
          <li>
            Mail: {data.integrations.mail ? data.integrations.mailProvider : 'outbox / mailto until SMTP or RESEND_API_KEY'}
          </li>
          <li>Demo ledger: {data.integrations.demoPayments ? 'on (local only)' : 'off'}</li>
          <li>Public URL: {data.integrations.siteUrl || 'set NEXT_PUBLIC_SITE_URL'}</li>
        </ul>
      </section>

      <section className="mb-10 grid gap-6 lg:grid-cols-2">
        <form className="space-y-2 rounded-xl border border-white/10 p-4" onSubmit={onForm('createEvent', (form) => ({
          total: Number(form.get('total')),
        }))}>
          <h2 className="font-display text-xl font-bold">New event + client portal</h2>
          <input name="clientName" required placeholder="Client name" className={field} />
          <input name="clientEmail" type="email" required placeholder="Client email" className={field} />
          <input name="eventName" required placeholder="Event name" className={field} />
          <input name="eventDate" type="date" required className={field} />
          <input name="total" type="number" min={1} step="0.01" required placeholder="Contract total" className={field} />
          <input name="venue" placeholder="Venue" className={field} />
          <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold">Create (30/40/30 + MSA)</button>
        </form>

        <form className="space-y-2 rounded-xl border border-white/10 p-4" onSubmit={onForm('createVendor')}>
          <h2 className="font-display text-xl font-bold">New vendor</h2>
          <input name="name" required placeholder="Contact name" className={field} />
          <input name="email" type="email" required placeholder="Login email" className={field} />
          <input name="companyName" required placeholder="Company" className={field} />
          <input name="serviceType" required placeholder="Service type" className={field} />
          <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold">Create vendor login</button>
        </form>

        <form className="space-y-2 rounded-xl border border-white/10 p-4" onSubmit={onForm('assignVendor')}>
          <h2 className="font-display text-xl font-bold">Assign vendor</h2>
          <select name="eventId" required className={field} defaultValue="">
            <option value="" disabled>Event</option>
            {data.events.map((event) => (
              <option key={event.id} value={event.id}>{event.name}</option>
            ))}
          </select>
          <select name="vendorId" required className={field} defaultValue="">
            <option value="" disabled>Vendor</option>
            {data.vendors.map((vendor) => (
              <option key={vendor.id} value={vendor.id}>{vendor.companyName}</option>
            ))}
          </select>
          <input name="loadInWindow" type="datetime-local" className={field} />
          <input name="zoneNotes" placeholder="Load-in / zone notes" className={field} />
          <input name="cueNotes" placeholder="Cue notes" className={field} />
          <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold">Assign</button>
        </form>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-display text-2xl font-bold">Events</h2>
        <div className="space-y-4">
          {data.events.map((event) => (
            <article key={event.id} className="rounded-xl border border-white/10 p-5">
              <h3 className="font-semibold">{event.name}</h3>
              <p className="text-sm text-gray-300">
                {event.date.slice(0, 10)} · {event.client.name} ({event.client.email}) · {event.status} ·{' '}
                {event.phase}
                {event.surveyCount ? ` · survey in` : ''}
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {event.milestones.map((m) => (
                  <li key={m.id} className="flex items-center justify-between gap-3">
                    <span>
                      {m.name}: ${m.amount.toLocaleString()} ({m.status})
                    </span>
                    {m.status !== 'paid' ? (
                      <button type="button" className="rounded bg-primary-700 px-3 py-1" onClick={() => markPaid(m.id)}>
                        Mark paid
                      </button>
                    ) : null}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-gray-400">
                Vendors: {event.vendors.map((v) => `${v.company} (${v.status})`).join(', ') || 'none'}
              </p>
              {event.status !== 'completed' ? (
                <button
                  type="button"
                  className="mt-3 rounded-lg bg-gray-800 px-3 py-2 text-sm"
                  onClick={() => ops({ action: 'completeEvent', eventId: event.id })}
                >
                  Mark complete (survey in 48h)
                </button>
              ) : null}
              <form
                className="mt-4 space-y-2"
                onSubmit={onForm('updateEvent', (form) => ({ eventId: event.id, runSheet: String(form.get('runSheet') ?? '') }))}
              >
                <textarea
                  name="runSheet"
                  rows={4}
                  defaultValue=""
                  placeholder="Cue-to-cue / run-sheet"
                  className={`${field} w-full`}
                />
                <input name="phase" placeholder="Phase (e.g. Production)" className={`${field} w-full`} />
                <button className="rounded-lg bg-gray-800 px-3 py-2 text-sm">Save run-sheet / phase</button>
              </form>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-display text-2xl font-bold">Vendors</h2>
        <div className="space-y-3">
          {data.vendors.map((vendor) => (
            <div key={vendor.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 p-4">
              <div>
                <p className="font-medium">{vendor.companyName}</p>
                <p className="text-sm text-gray-400">
                  {vendor.serviceType} · {vendor.email} · W-9 {vendor.w9OnFile ? 'yes' : 'no'} · SLA{' '}
                  {vendor.slaSigned ? 'signed' : 'unsigned'} · files {vendor.files}
                </p>
              </div>
              <button
                type="button"
                className="rounded-lg bg-gray-800 px-3 py-2 text-sm"
                onClick={() => verifyCoi(vendor.id, !vendor.coiVerified)}
              >
                COI {vendor.coiVerified ? 'verified' : 'not verified'} (toggle)
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-display text-2xl font-bold">Vendor invoices</h2>
        <ul className="space-y-2 text-sm">
          {data.invoices.length === 0 ? <li className="text-gray-400">None yet.</li> : null}
          {data.invoices.map((inv) => (
            <li key={inv.id} className="flex items-center justify-between rounded-lg border border-white/10 px-4 py-2">
              <span>
                {inv.company} · {inv.eventName} · ${inv.amount.toLocaleString()} · {inv.status}
              </span>
              {inv.status !== 'paid' ? (
                <button type="button" className="text-primary-300" onClick={() => ops({ action: 'payInvoice', invoiceId: inv.id })}>
                  Mark paid
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-display text-2xl font-bold">Invite outbox</h2>
        <p className="mb-3 text-sm text-gray-400">
          Invites are stored here. If SMTP or Resend is configured, they send automatically and show a sent stamp.
        </p>
        <ul className="space-y-3 text-sm">
          {data.outbox.length === 0 ? <li className="text-gray-400">Empty.</li> : null}
          {data.outbox.map((row) => (
            <li key={row.id} className="rounded-xl border border-white/10 p-4">
              <p className="text-gray-400">
                {row.createdAt.slice(0, 16)} · {row.toEmail}
                {row.sentAt ? ` · sent via ${row.sentVia ?? 'mail'}` : ' · queued'}
                {row.error ? ` · ${row.error}` : ''}
              </p>
              <p className="font-medium">{row.subject}</p>
              <pre className="mt-2 whitespace-pre-wrap text-gray-300">{row.body}</pre>
              <a
                className="mt-2 inline-block text-primary-300"
                href={`mailto:${encodeURIComponent(row.toEmail)}?subject=${encodeURIComponent(row.subject)}&body=${encodeURIComponent(row.body)}`}
              >
                Open in email
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 font-display text-2xl font-bold">Marketing inquiries</h2>
        <ul className="space-y-4 text-sm text-gray-300">
          {data.inquiries.length === 0 ? <li>None yet.</li> : null}
          {data.inquiries.map((row) => (
            <li key={row.id} className="rounded-xl border border-white/10 p-4">
              <p>
                {row.firstName} {row.lastName} · {row.email} · {row.eventType ?? 'n/a'} · {row.createdAt.slice(0, 10)}
              </p>
              <form
                className="mt-3 flex flex-wrap gap-2"
                onSubmit={onForm('convertInquiry', (form) => ({
                  inquiryId: row.id,
                  total: Number(form.get('total')),
                }))}
              >
                <input name="eventName" required placeholder="Event name" className={field} />
                <input name="eventDate" type="date" required className={field} />
                <input name="total" type="number" min={1} required placeholder="Total" className={field} />
                <button className="rounded-lg bg-primary-600 px-3 py-2">Convert to contracted event</button>
              </form>
            </li>
          ))}
        </ul>
      </section>
    </PortalShell>
  );
}
