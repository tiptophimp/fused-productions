import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { jsonLd, SITE } from '@/lib/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Fused Productions | Entertainment, Catering & Event Planning',
  description:
    'Turnkey events in Northeast Ohio. DJ entertainment, laser light shows, catering, and full event planning for weddings, corporate events, birthdays, and private parties — one team, one timeline, one invoice.',
  keywords: [
    'event planning',
    'event services',
    'DJ services',
    'laser light show',
    'catering',
    'wedding DJ',
    'wedding planner',
    'corporate events',
    'birthday party',
    'party planning',
    'event entertainment',
    'Northeast Ohio events',
    'Cleveland DJ',
  ],
  openGraph: {
    title: 'Fused Productions | Entertainment, Catering & Event Planning',
    description:
      'Turnkey events in Northeast Ohio. DJ, laser shows, catering, and full planning — one trusted team.',
    url: SITE.url,
    siteName: SITE.name,
    type: 'website',
  },
  alternates: {
    canonical: SITE.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-gray-950 text-white antialiased">{children}</body>
    </html>
  );
}
