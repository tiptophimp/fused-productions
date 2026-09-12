import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Fused Productions | DJ, Laser Shows & Catering',
  description:
    'Your turnkey event solution. Professional DJ services, stunning laser light shows, and exceptional catering - all from one trusted team. Weddings, corporate events, and private parties.',
  keywords: [
    'event services',
    'DJ services',
    'laser light show',
    'catering',
    'wedding DJ',
    'corporate events',
    'party planning',
    'event entertainment',
  ],
  openGraph: {
    title: 'Fused Productions | DJ, Laser Shows & Catering',
    description:
      'Your turnkey event solution. Professional DJ services, stunning laser light shows, and exceptional catering.',
    url: 'https://fusedproductions.com',
    siteName: 'Fused Productions',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-gray-950 text-white antialiased">{children}</body>
    </html>
  );
}
