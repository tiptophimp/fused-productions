'use client';

import { useEffect, useState } from 'react';
import { SITE } from '@/lib/site';

export default function ContactEmail({ className }: { className?: string }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <a href="#contact" className={className}>
        Email support
      </a>
    );
  }

  return (
    <a href={`mailto:${SITE.email}`} className={className}>
      {SITE.email}
    </a>
  );
}
