'use client';

import { FormEvent, useEffect, useState } from 'react';
import { PortalShell } from '@/components/portal/PortalShell';

type Dispatch = {
  vendor: {
    companyName: string;
    serviceType: string;
    coiVerified: boolean;
    w9OnFile: boolean;
    slaSignedAt: string | null;
  };
  assignments: {
    id: string;
    eventId: string;
    eventName: string;
    eventDate: string;
    venue: string | null;
    loadInWindow: string | null;
    dispatchStatus: string;
    zoneNotes: string | null;
    cueNotes: string | null;
    runSheet: string | null;
  }[];
  invoices: { id: string; amount: number; status: string; notes: string | null }[];
  compliance: { id: string; kind: string; fileName: string }[];
};

export default function VendorPortalPage() {
  const [data, setData] = useState<Dispatch | null>(null);
  const [sla, setSla] = useState<{ slaBody: string; slaSignedAt: string | null } | null>(null);
  const [message, setMessage] = useState('');

  async function load() {
    const [dispatchRes, slaRes] = await Promise.all([fetch('/api/vendor/dispatch'), fetch('/api/vendor/sla')]);
    setData((await dispatchRes.json()) as Dispatch);
    setSla((await slaRes.json()) as { slaBody: string; slaSignedAt: string | null });
  }

  useEffect(() => {
    void load();
  }, []);

  async function confirm(assignmentId: string) {
    await fetch('/api/vendor/assignments/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assignmentId }),
    });
    await load();
  }

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const body = new FormData(form);
    const res = await fetch('/api/vendor/compliance/upload', { method: 'POST', body });
    const json = (await res.json()) as { error?: string };
    setMessage(json.error ?? 'File uploaded.');
    form.reset();
    await load();
  }

  async function invoice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const res = await fetch('/api/vendor/invoices/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventId: String(form.get('eventId')),
        amount: Number(form.get('amount')),
        notes: String(form.get('notes') ?? ''),
      }),
    });
    const json = (await res.json()) as { error?: string; ok?: boolean };
    setMessage(json.error ?? (json.ok ? 'Invoice submitted.' : 'Submit failed'));
    await load();
  }

  if (!data?.vendor) {
    return (
      <PortalShell title="Vendor dispatch" role="Vendor">
        <p className="text-gray-300">Loading…</p>
      </PortalShell>
    );
  }

  return (
    <PortalShell title="Vendor dispatch" role="Vendor">
      <p className="mb-2 text-gray-300">
        {data.vendor.companyName} · {data.vendor.serviceType}
      </p>
      <p className="mb-6 text-sm text-gray-400">
        W-9 on file: {data.vendor.w9OnFile ? 'yes' : 'no'} · COI verified:{' '}
        {data.vendor.coiVerified ? 'yes' : 'no (admin must verify)'}
      </p>
      {message ? <p className="mb-6 text-sm text-primary-200">{message}</p> : null}

      <section className="mb-10 rounded-xl border border-white/10 p-6">
        <h2 className="mb-3 font-display text-2xl font-bold">Subcontractor SLA</h2>
        {data.vendor.slaSignedAt || sla?.slaSignedAt ? (
          <p className="text-sm text-emerald-300">SLA on file.</p>
        ) : (
          <>
            <pre className="mb-4 max-h-48 overflow-auto whitespace-pre-wrap text-sm text-gray-300">
              {sla?.slaBody}
            </pre>
            <form
              className="flex gap-3"
              onSubmit={async (e) => {
                e.preventDefault();
                const signedName = String(new FormData(e.currentTarget).get('signedName') ?? '');
                const res = await fetch('/api/vendor/sla', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ signedName }),
                });
                const json = (await res.json()) as { error?: string };
                setMessage(json.error ?? 'SLA signed. Dispatch unlocked.');
                await load();
              }}
            >
              <input
                name="signedName"
                required
                placeholder="Legal name"
                className="flex-1 rounded-lg border border-white/10 bg-gray-800 px-3 py-2"
              />
              <button type="submit" className="rounded-lg bg-accent-600 px-4 py-2 font-semibold">
                Sign SLA
              </button>
            </form>
          </>
        )}
      </section>

      <section className="mb-10 rounded-xl border border-white/10 p-6">
        <h2 className="mb-4 font-display text-2xl font-bold">Compliance</h2>
        <form className="flex flex-wrap gap-3" onSubmit={upload}>
          <select name="kind" className="rounded-lg border border-white/10 bg-gray-800 px-3 py-2">
            <option value="w9">W-9</option>
            <option value="coi">Certificate of Insurance</option>
          </select>
          <input type="file" name="file" required className="text-sm" />
          <button type="submit" className="rounded-lg bg-primary-600 px-4 py-2 font-semibold">
            Upload
          </button>
        </form>
        <ul className="mt-4 text-sm text-gray-300">
          {data.compliance.map((file) => (
            <li key={file.id}>
              {file.kind}: {file.fileName}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10 space-y-4">
        <h2 className="font-display text-2xl font-bold">Gig board</h2>
        {!(data.vendor.slaSignedAt || sla?.slaSignedAt) ? (
          <p className="text-gray-300">Sign the SLA to open the gig board.</p>
        ) : data.assignments.length === 0 ? (
          <p className="text-gray-300">No assignments yet.</p>
        ) : (
          data.assignments.map((gig) => (
            <article key={gig.id} className="rounded-xl border border-white/10 p-5">
              <h3 className="font-semibold">{gig.eventName}</h3>
              <p className="text-sm text-gray-300">
                {gig.eventDate.slice(0, 10)} · {gig.venue ?? 'Venue TBD'} · load-in{' '}
                {gig.loadInWindow ? new Date(gig.loadInWindow).toLocaleString() : 'TBD'}
              </p>
              <p className="mt-2 text-sm text-gray-400">Status: {gig.dispatchStatus}</p>
              {gig.zoneNotes ? <p className="mt-2 text-sm">{gig.zoneNotes}</p> : null}
              {gig.cueNotes ? <p className="mt-2 text-sm">{gig.cueNotes}</p> : null}
              {gig.runSheet ? (
                <pre className="mt-3 whitespace-pre-wrap text-sm text-gray-300">{gig.runSheet}</pre>
              ) : null}
              {gig.dispatchStatus === 'assigned' ? (
                <button
                  type="button"
                  onClick={() => confirm(gig.id)}
                  className="mt-4 rounded-lg bg-accent-600 px-4 py-2 text-sm font-semibold"
                >
                  Confirm window
                </button>
              ) : null}
            </article>
          ))
        )}
      </section>

      <section className="rounded-xl border border-white/10 p-6">
        <h2 className="mb-4 font-display text-2xl font-bold">Invoice after wrap</h2>
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={invoice}>
          <select
            name="eventId"
            required
            className="rounded-lg border border-white/10 bg-gray-800 px-3 py-2 sm:col-span-2"
            defaultValue=""
          >
            <option value="" disabled>
              Select wrapped event
            </option>
            {data.assignments.map((gig) => (
              <option key={gig.id} value={gig.eventId}>
                {gig.eventName}
              </option>
            ))}
          </select>
          <input
            name="amount"
            type="number"
            min={1}
            step="0.01"
            required
            placeholder="Amount"
            className="rounded-lg border border-white/10 bg-gray-800 px-3 py-2"
          />
          <input
            name="notes"
            placeholder="Notes"
            className="rounded-lg border border-white/10 bg-gray-800 px-3 py-2"
          />
          <button type="submit" className="rounded-lg bg-primary-600 px-4 py-2 font-semibold sm:col-span-2">
            Submit invoice
          </button>
        </form>
        <ul className="mt-4 text-sm text-gray-300">
          {data.invoices.map((inv) => (
            <li key={inv.id}>
              ${inv.amount.toLocaleString()} · {inv.status}
            </li>
          ))}
        </ul>
      </section>
    </PortalShell>
  );
}
