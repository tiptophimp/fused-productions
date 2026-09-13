'use client';

import { FormEvent, useEffect, useState } from 'react';
import { PortalShell } from '@/components/portal/PortalShell';

type Dashboard = {
  client: { name: string; email: string };
  events: { id: string; name: string; date: string; status: string }[];
  event: null | {
    id: string;
    name: string;
    date: string;
    daysUntil: number;
    status: string;
    phase: string;
    venue: string | null;
    runSheet: string | null;
    totalContractPrice: number;
    paidTotal: number;
    balance: number;
    milestones: {
      id: string;
      name: string;
      percentage: number;
      amount: number;
      status: string;
      dueDate: string;
    }[];
    documents: {
      id: string;
      title: string;
      body: string;
      status: string;
      signedName: string | null;
      signedAt: string | null;
    }[];
    surveyOpen: boolean;
  };
};

export default function ClientPortalPage() {
  const [data, setData] = useState<Dashboard | null>(null);
  const [eventId, setEventId] = useState<string>('');
  const [message, setMessage] = useState('');

  async function load(id?: string) {
    const query = id ? `?eventId=${encodeURIComponent(id)}` : '';
    const res = await fetch(`/api/client/dashboard${query}`);
    const json = (await res.json()) as Dashboard;
    setData(json);
    if (json.event?.id) setEventId(json.event.id);
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    const paid = params.get('paid');
    if (paid === '0') setMessage('Checkout canceled. No charge was made.');
    if (sessionId) {
      void fetch('/api/client/payments/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
        .then(async (res) => {
          const json = (await res.json()) as { paid?: boolean; error?: string };
          setMessage(json.error ?? (json.paid ? 'Payment received. Thank you.' : 'Payment is still processing.'));
        })
        .finally(() => {
          void load();
        });
      return;
    }
    if (paid === '1') setMessage('Payment received. Thank you.');
    void load();
  }, []);

  async function pay(milestoneId: string) {
    setMessage('');
    const res = await fetch('/api/client/payments/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ milestoneId }),
    });
    const json = (await res.json()) as { message?: string; ok?: boolean; url?: string };
    if (json.url) {
      window.location.href = json.url;
      return;
    }
    setMessage(json.message ?? (json.ok ? 'Payment recorded.' : 'Payment not completed.'));
    await load(eventId || undefined);
  }

  async function sign(event: FormEvent<HTMLFormElement>, documentId: string) {
    event.preventDefault();
    const signedName = String(new FormData(event.currentTarget).get('signedName') ?? '');
    const res = await fetch('/api/client/documents/sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentId, signedName }),
    });
    const json = (await res.json()) as { error?: string };
    setMessage(json.error ?? 'Signature recorded.');
    await load(eventId || undefined);
  }

  if (!data) {
    return (
      <PortalShell title="Client portal" role="Client">
        <p className="text-gray-300">Loading…</p>
      </PortalShell>
    );
  }

  const event = data.event;

  return (
    <PortalShell title="Client portal" role="Client">
      <p className="mb-4 text-gray-300">Signed in as {data.client.name}</p>
      {data.events.length > 1 ? (
        <label className="mb-6 block max-w-md text-sm">
          Event
          <select
            className="mt-1 w-full rounded-lg border border-white/10 bg-gray-800 px-3 py-2"
            value={eventId}
            onChange={(e) => void load(e.target.value)}
          >
            {data.events.map((row) => (
              <option key={row.id} value={row.id}>
                {row.name} ({row.status})
              </option>
            ))}
          </select>
        </label>
      ) : null}
      {message ? <p className="mb-6 text-sm text-primary-200">{message}</p> : null}
      {!event ? (
        <p className="rounded-xl border border-white/10 p-6 text-gray-200">
          No active event yet. When your MSA is issued, countdown, draws, and documents will show
          here.
        </p>
      ) : (
        <div className="space-y-8">
          <section className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 p-5">
              <p className="text-sm text-gray-400">Countdown</p>
              <p className="font-display text-3xl font-bold">{event.daysUntil} days</p>
              <p className="text-sm text-gray-300">{event.name}</p>
            </div>
            <div className="rounded-xl border border-white/10 p-5">
              <p className="text-sm text-gray-400">Phase</p>
              <p className="font-display text-2xl font-bold">{event.phase}</p>
              <p className="text-sm text-gray-300">{event.status}</p>
            </div>
            <div className="rounded-xl border border-white/10 p-5">
              <p className="text-sm text-gray-400">Balance</p>
              <p className="font-display text-3xl font-bold">${event.balance.toLocaleString()}</p>
              <p className="text-sm text-gray-300">
                ${event.paidTotal.toLocaleString()} paid of ${event.totalContractPrice.toLocaleString()}
              </p>
            </div>
          </section>

          <section className="rounded-xl border border-white/10 p-6">
            <h2 className="mb-4 font-display text-2xl font-bold">Milestone ledger</h2>
            <div className="space-y-3">
              {event.milestones.map((m) => (
                <div
                  key={m.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-gray-900 px-4 py-3"
                >
                  <div>
                    <p className="font-medium">
                      {m.name} ({m.percentage}%)
                    </p>
                    <p className="text-sm text-gray-400">
                      ${m.amount.toLocaleString()} · {m.status} · due {m.dueDate.slice(0, 10)}
                    </p>
                  </div>
                  {m.status !== 'paid' ? (
                    <button
                      type="button"
                      onClick={() => pay(m.id)}
                      className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold"
                    >
                      Pay draw
                    </button>
                  ) : (
                    <span className="text-sm text-emerald-300">Paid</span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {event.runSheet ? (
            <section className="rounded-xl border border-white/10 p-6">
              <h2 className="mb-3 font-display text-2xl font-bold">Master run-sheet</h2>
              <pre className="whitespace-pre-wrap text-sm text-gray-200">{event.runSheet}</pre>
            </section>
          ) : null}

          <section className="rounded-xl border border-white/10 p-6">
            <h2 className="mb-4 font-display text-2xl font-bold">Document vault</h2>
            {event.documents.map((doc) => (
              <article key={doc.id} className="mb-6 border-b border-white/10 pb-6 last:mb-0 last:border-0">
                <h3 className="font-semibold">{doc.title}</h3>
                <p className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap text-sm text-gray-300">
                  {doc.body}
                </p>
                {doc.status === 'signed' ? (
                  <p className="mt-3 text-sm text-emerald-300">
                    Signed by {doc.signedName} {doc.signedAt ? `on ${doc.signedAt.slice(0, 10)}` : ''}
                  </p>
                ) : (
                  <form className="mt-4 flex gap-3" onSubmit={(e) => sign(e, doc.id)}>
                    <input
                      name="signedName"
                      required
                      placeholder="Type your full legal name"
                      className="flex-1 rounded-lg border border-white/10 bg-gray-800 px-3 py-2"
                    />
                    <button type="submit" className="rounded-lg bg-accent-600 px-4 py-2 font-semibold">
                      Sign
                    </button>
                  </form>
                )}
              </article>
            ))}
          </section>

          {event.surveyOpen ? (
            <section className="rounded-xl border border-white/10 p-6">
              <h2 className="mb-4 font-display text-2xl font-bold">How did we do?</h2>
              <form
                className="space-y-3"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = new FormData(e.currentTarget);
                  const res = await fetch('/api/client/survey', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      eventId: event.id,
                      rating: Number(form.get('rating')),
                      comments: String(form.get('comments') ?? ''),
                    }),
                  });
                  const json = (await res.json()) as { error?: string };
                  setMessage(json.error ?? 'Thank you. Survey recorded.');
                  await load(eventId || undefined);
                }}
              >
                <select name="rating" className="rounded-lg border border-white/10 bg-gray-800 px-3 py-2" defaultValue="5">
                  <option value="5">5 — excellent</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                </select>
                <textarea
                  name="comments"
                  rows={3}
                  placeholder="What should we keep or fix next time?"
                  className="w-full rounded-lg border border-white/10 bg-gray-800 px-3 py-2"
                />
                <button type="submit" className="rounded-lg bg-primary-600 px-4 py-2 font-semibold">
                  Send survey
                </button>
              </form>
            </section>
          ) : null}
        </div>
      )}
    </PortalShell>
  );
}
