import { Sparkles } from 'lucide-react';
import ContactEmail from '@/components/ContactEmail';
import { footerGroups, navLinks } from '@/lib/nav';
import { SITE } from '@/lib/site';

export default function SiteFooter() {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl">
                Fused<span className="text-primary-300">Productions</span>
              </span>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed">
              Turnkey DJ, laser shows, catering, and event planning for Northeast Ohio.
            </p>
          </div>
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="font-semibold mb-3">{group.title}</h2>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-gray-200 hover:text-white text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-gray-200 hover:text-white text-sm">
              {link.label}
            </a>
          ))}
          <a href="/#contact" className="text-gray-200 hover:text-white text-sm">
            Contact
          </a>
          <a href="/login" className="text-gray-200 hover:text-white text-sm">
            Portal login
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-200 border-t border-white/5 pt-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={`tel:${SITE.phoneTel}`} className="hover:text-white">
              {SITE.phoneDisplay}
            </a>
            <ContactEmail className="hover:text-white" />
            <a href={SITE.url} className="hover:text-white">
              fusedproductions.com
            </a>
          </div>
          <div>&copy; {new Date().getFullYear()} Fused Productions. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
