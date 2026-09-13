'use client';

import { FormEvent, useState } from 'react';

export default function LoginForm() {
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setPending(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: String(form.get('email') ?? ''),
        password: String(form.get('password') ?? ''),
      }),
    });
    const data = (await response.json()) as { error?: string; role?: string };
    setPending(false);
    if (!response.ok) {
      setError(data.error ?? 'Login failed');
      return;
    }
    const next =
      data.role === 'admin' ? '/admin' : data.role === 'vendor' ? '/vendor' : '/client';
    window.location.href = next;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm text-gray-200">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="w-full rounded-xl border border-white/10 bg-gray-800 px-4 py-3"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-sm text-gray-200">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          minLength={8}
          className="w-full rounded-xl border border-white/10 bg-gray-800 px-4 py-3"
        />
      </div>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 py-3 font-semibold disabled:opacity-60"
      >
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
