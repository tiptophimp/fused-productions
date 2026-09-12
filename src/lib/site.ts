export const SITE = {
  name: 'Fused Productions',
  url: 'https://fusedproductions.com',
  email: 'support@fusedproductions.com',
  phoneDisplay: '(833) 837-6339',
  phoneTel: '+18338376339',
  serviceArea: 'Northeast Ohio',
  serviceAreaDetail:
    'Cleveland, Mentor, Painesville, and surrounding communities. Destination events by arrangement.',
} as const;

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phoneTel,
  serviceType: [
    'Event planning',
    'DJ services',
    'Laser light shows',
    'Catering',
  ],
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Northeast Ohio' },
    { '@type': 'City', name: 'Cleveland' },
    { '@type': 'City', name: 'Mentor' },
    { '@type': 'City', name: 'Painesville' },
    { '@type': 'City', name: 'Willoughby' },
    { '@type': 'AdministrativeArea', name: 'Lake County' },
    { '@type': 'State', name: 'Ohio' },
  ],
  description:
    'Turnkey event production for weddings, corporate events, birthdays, and private parties: DJ entertainment, laser light shows, catering, and full event planning.',
  priceRange: '$$',
  sameAs: [SITE.url],
};
