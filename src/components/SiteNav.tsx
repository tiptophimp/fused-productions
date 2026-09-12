'use client';

import { useState } from 'react';
import { Menu, Phone, Sparkles, X } from 'lucide-react';
import { SITE } from '@/lib/site';
import { navLinks } from '@/lib/nav';

export default function SiteNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl">
              Fused<span className="text-primary-300">Productions</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-200 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${SITE.phoneTel}`}
              className="text-gray-200 hover:text-white transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              {SITE.phoneDisplay}
            </a>
            <a
              href="/#contact"
              className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Get quote
            </a>
          </div>

          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-900 border-t border-white/5">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-gray-200 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${SITE.phoneTel}`}
              className="block text-gray-200 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Call {SITE.phoneDisplay}
            </a>
            <a
              href="/#contact"
              className="block px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg font-medium text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get quote
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
