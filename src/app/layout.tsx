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
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Wedding DJ, Catering & Event Planning | Cleveland, Mentor, Painesville',
    template: '%s | Fused Productions',
  },
  description:
    'Fused Productions produces weddings, corporate events, birthdays, and private parties in Northeast Ohio — DJ entertainment, laser light shows, catering, and full event planning. One team, one timeline, one invoice.',
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
    title: 'Wedding DJ, Catering & Event Planning | Cleveland, Mentor, Painesville',
    description:
      'Turnkey events in Northeast Ohio. DJ, laser shows, catering, and full planning — one trusted team.',
    url: SITE.url,
    siteName: SITE.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fused Productions | Northeast Ohio Event Production',
    description: 'DJ, laser shows, catering, and event planning in Cleveland, Mentor, and Painesville.',
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replaceAll('@', '\\u0040'),
          }}
        />
      </head>
      <body className="bg-gray-950 text-white antialiased">{children}</body>
    </html>
  );
}
