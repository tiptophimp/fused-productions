import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SeoArticle from '@/components/SeoArticle';
import { getSeoPage, seoPages } from '@/lib/seo-pages';
import { SITE } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) return {};
  const url = `${SITE.url}/${page.slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: SITE.name,
      type: 'article',
    },
  };
}

export default async function SeoRoute({ params }: Props) {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) notFound();
  return <SeoArticle page={page} />;
}
