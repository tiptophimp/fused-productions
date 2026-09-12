export const navLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/#process', label: 'How it works' },
  { href: '/#events', label: 'Events' },
  { href: '/#packages', label: 'Packages' },
  { href: '/#faq', label: 'FAQ' },
] as const;

export const footerGroups = [
  {
    title: 'Services',
    links: [
      { href: '/dj-services', label: 'DJ services' },
      { href: '/laser-light-shows', label: 'Laser light shows' },
      { href: '/catering', label: 'Catering' },
      { href: '/event-planning', label: 'Event planning' },
    ],
  },
  {
    title: 'Events',
    links: [
      { href: '/weddings', label: 'Weddings' },
      { href: '/corporate-events', label: 'Corporate events' },
      { href: '/birthdays', label: 'Birthdays' },
      { href: '/private-parties', label: 'Private parties' },
    ],
  },
  {
    title: 'Areas',
    links: [
      { href: '/cleveland', label: 'Cleveland' },
      { href: '/mentor', label: 'Mentor' },
      { href: '/painesville', label: 'Painesville' },
    ],
  },
] as const;
