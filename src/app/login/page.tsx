import type { Metadata } from 'next';
import Link from 'next/link';
import LoginForm from '@/components/portal/LoginForm';

export const metadata: Metadata = {
  title: 'Portal login',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-gray-900/70 p-8">
        <p className="text-xs uppercase tracking-widest text-primary-300">Fused Productions</p>
        <h1 className="mt-2 font-display text-3xl font-bold">Crew & client login</h1>
        <p className="mt-2 mb-8 text-sm text-gray-300">
          Client portal, vendor dispatch, and admin only. Not a public quote form. Local: port 3010.
        </p>
        <LoginForm />
        <p className="mt-6 text-center text-sm">
          <Link href="/" className="text-primary-300 hover:text-white">
            Back to fusedproductions.com
          </Link>
        </p>
      </div>
    </div>
  );
}
