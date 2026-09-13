/** Concept photography until real event shots exist. Do not caption these as past gigs. */

export const images = {
  hero: {
    src: '/images/fused-hero-lasers.png',
    alt: 'Concept image: cyan and magenta laser beams over a night-time outdoor venue',
  },
  dj: {
    src: '/images/fused-dj.png',
    alt: 'Concept image: a DJ booth facing a dance floor with colored production lighting',
  },
  lasers: {
    src: '/images/fused-lasers.png',
    alt: 'Concept image: laser beams and haze in a ballroom',
  },
  catering: {
    src: '/images/fused-catering.png',
    alt: 'Concept image: plated dinner service at a reception table',
  },
  planning: {
    src: '/images/fused-planning.png',
    alt: 'Concept image: an on-site coordinator with a headset in a banquet hall',
  },
  wedding: {
    src: '/images/fused-wedding.png',
    alt: 'Concept image: a first dance under a spotlight with laser haze',
  },
  corporate: {
    src: '/images/fused-corporate.png',
    alt: 'Concept image: a corporate gala ballroom with stage lighting',
  },
  birthday: {
    src: '/images/fused-birthday.png',
    alt: 'Concept image: a milestone birthday party with cake and colored lighting',
  },
  privateParty: {
    src: '/images/fused-private.png',
    alt: 'Concept image: an evening tent party with string lights and sky beams',
  },
} as const;

export const seoPageImages: Record<string, { src: string; alt: string }> = {
  weddings: images.wedding,
  'corporate-events': images.corporate,
  birthdays: images.birthday,
  'private-parties': images.privateParty,
  'dj-services': images.dj,
  catering: images.catering,
  'laser-light-shows': images.lasers,
  'event-planning': images.planning,
  cleveland: images.hero,
  mentor: images.privateParty,
  painesville: images.wedding,
};
