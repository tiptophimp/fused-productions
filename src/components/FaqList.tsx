'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

type Faq = {
  question: string;
  answer: string;
};

export default function FaqList({
  faqs,
  hideContactCta = false,
}: {
  faqs: Faq[];
  hideContactCta?: boolean;
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={faq.question} className="rounded-2xl bg-gray-900 border border-white/10 overflow-hidden">
            <button
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              aria-expanded={openFaq === index}
            >
              <span className="font-semibold text-lg pr-4 text-white">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-200 flex-shrink-0 transition-transform duration-300 ${
                  openFaq === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openFaq === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-6 pb-5 text-gray-200 leading-relaxed">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>

      {!hideContactCta && (
        <div className="mt-12 text-center">
          <p className="text-gray-200 mb-4">Still have questions?</p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Contact us
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      )}
    </>
  );
}
