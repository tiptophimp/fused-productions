import { ChevronRight } from 'lucide-react';
import { SITE } from '@/lib/site';
import type { SeoPage } from '@/lib/seo-pages';
import FaqList from '@/components/FaqList';
import SiteFooter from '@/components/SiteFooter';
import SiteNav from '@/components/SiteNav';

export default function SeoArticle({ page }: { page: SeoPage }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: page.title,
        description: page.description,
        url: `${SITE.url}/${page.slug}`,
        isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
          {
            '@type': 'ListItem',
            position: 2,
            name: page.h1,
            item: `${SITE.url}/${page.slug}`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replaceAll('@', '\\u0040'),
        }}
      />
      <SiteNav />
      <article className="pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-primary-300 mb-4">{page.kicker}</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6 tracking-tight">{page.h1}</h1>
          <div className="space-y-5 text-lg text-gray-200 leading-relaxed">
            {page.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-10 space-y-3">
            {page.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-gray-200">
                <ChevronRight className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                {bullet}
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <a
              href="/#contact"
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl font-semibold text-center hover:opacity-90"
            >
              Get a quote
            </a>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-center hover:bg-white/10"
            >
              Call {SITE.phoneDisplay}
            </a>
          </div>
          {page.faqs.length > 0 && (
            <div className="mt-20">
              <h2 className="font-display text-3xl font-bold mb-8">
                Questions about {page.kicker.split('·')[0].trim().toLowerCase()}
              </h2>
              <FaqList faqs={page.faqs} hideContactCta />
            </div>
          )}
          <nav className="mt-16 pt-8 border-t border-white/10" aria-label="Related pages">
            <h2 className="font-semibold mb-4">Keep exploring</h2>
            <div className="flex flex-wrap gap-3">
              {page.related.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-200 hover:text-white hover:border-primary-500/50"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </article>
      <SiteFooter />
    </div>
  );
}
