import type { MetadataRoute } from 'next';
import { seoPages } from '@/lib/seo-pages';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...seoPages.map((page) => ({
      url: `${SITE.url}/${page.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
