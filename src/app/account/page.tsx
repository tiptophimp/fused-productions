'use client';

import { FormEvent, useState } from 'react';
import { PortalShell } from '@/components/portal/PortalShell';

export default function AccountPage() {
  const [message, setMessage] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const res = await fetch('/api/auth/password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        current: String(form.get('current') ?? ''),
        next: String(form.get('next') ?? ''),
      }),
    });
    const json = (await res.json()) as { error?: string };
    setMessage(json.error ?? 'Password updated. Log in again if other devices were signed in.');
  }

  return (
    <PortalShell title="Account" role="Portal">
      <form className="max-w-md space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="mb-2 block text-sm" htmlFor="current">
            Current password
          </label>
          <input
            id="current"
            name="current"
            type="password"
            required
            minLength={8}
            className="w-full rounded-lg border border-white/10 bg-gray-800 px-3 py-2"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm" htmlFor="next">
            New password
          </label>
          <input
            id="next"
            name="next"
            type="password"
            required
            minLength={8}
            className="w-full rounded-lg border border-white/10 bg-gray-800 px-3 py-2"
          />
        </div>
        <button type="submit" className="rounded-lg bg-primary-600 px-4 py-2 font-semibold">
          Update password
        </button>
        {message ? <p className="text-sm text-primary-200">{message}</p> : null}
      </form>
    </PortalShell>
  );
}
