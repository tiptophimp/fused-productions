'use client';

import Link from 'next/link';

export function PortalShell({
  title,
  role,
  children,
}: {
  title: string;
  role: string;
  children: React.ReactNode;
}) {
  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary-300">{role}</p>
            <h1 className="font-display text-xl font-bold">{title}</h1>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/account" className="text-gray-300 hover:text-white">
              Password
            </Link>
            <Link href="/" className="text-gray-300 hover:text-white">
              Marketing site
            </Link>
            <button type="button" onClick={() => void logout()} className="text-gray-300 hover:text-white">
              Log out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
