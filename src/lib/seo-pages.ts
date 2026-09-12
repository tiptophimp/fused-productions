export type SeoFaq = { question: string; answer: string };

export type SeoPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  paragraphs: string[];
  bullets: string[];
  faqs: SeoFaq[];
  related: { href: string; label: string }[];
};

export const seoPages: SeoPage[] = [
  {
    slug: 'weddings',
    title: 'Wedding DJ, Lighting & Planning in Northeast Ohio',
    description:
      'Wedding DJ, laser lighting, catering, and day-of planning for Cleveland, Mentor, and Painesville. One team from ceremony through last dance.',
    h1: 'Wedding entertainment, catering, and planning — one crew',
    kicker: 'Weddings · Northeast Ohio',
    paragraphs: [
      'A wedding has more moving parts than most guests ever see: ceremony walk-in, cocktail hour, dinner cues, speeches, first dance, and a dance floor that has to actually fill. Fused Productions runs DJ, lighting, catering, and planning as one production so you are not texting three vendors while your photographer waits.',
      'We work ballrooms, barns, country clubs, churches, and backyard tents across Cleveland, Mentor, Painesville, and the rest of Northeast Ohio. If the venue has a preferred-vendor list or house A/V rules, we plan around them instead of fighting them on the day.',
      'Typical coverage includes ceremony and reception sound, MC announcements, a first-dance look, dinner service timing, and a dance-floor lighting plot that still photographs well. Catering and full planning are available on the same invoice when you want the night turnkey.',
    ],
    bullets: [
      'Ceremony and reception DJ with wireless mics',
      'First dance, grand entrance, and cake-cut cues',
      'Custom lighting and optional laser moments',
      'Plated, buffet, or station dinner service',
      'Day-of timeline and vendor windows',
    ],
    faqs: [
      {
        question: 'Do you DJ the ceremony and the reception?',
        answer:
          'Yes. We can cover processional, recessional, cocktail hour, and reception from one system, or split kits if the ceremony is in a different room.',
      },
      {
        question: 'How far ahead should we book a wedding DJ in Cleveland?',
        answer:
          'Peak Saturdays from May through October often book 6–12 months out. If your date is sooner, call — weekday and Sunday weddings still open up.',
      },
    ],
    related: [
      { href: '/dj-services', label: 'DJ services' },
      { href: '/catering', label: 'Wedding catering' },
      { href: '/event-planning', label: 'Event planning' },
      { href: '/cleveland', label: 'Cleveland events' },
    ],
  },
  {
    slug: 'corporate-events',
    title: 'Corporate Event Production in Cleveland & Northeast Ohio',
    description:
      'Corporate DJs, lighting, catering, and event planning for galas, product launches, holiday parties, and award nights in Northeast Ohio.',
    h1: 'Corporate events that look like the brand and run like a show',
    kicker: 'Corporate · Cleveland · Mentor · Painesville',
    paragraphs: [
      'A holiday party, product reveal, or awards gala lives or dies on timing. Fused Productions builds the run of show with your marketing team: walk-in playlist, logo looks, award scripts, reveal cues, and a dinner service that does not collide with the program.',
      'We produce events for offices, hotels, warehouses, and outdoor hospitality across Greater Cleveland and Lake County. Sound is sized to the room so speeches stay clear without shaking the next banquet hall.',
      'Ask for a single production lead who can talk to facilities, catering restrictions, and your AV rider before load-in.',
    ],
    bullets: [
      'Galas, holiday parties, and client hospitality',
      'Product launches and brand reveals',
      'Award ceremonies with MC scripts',
      'Laser and lighting looks matched to brand colors',
      'One invoice for entertainment, food, and planning',
    ],
    faqs: [
      {
        question: 'Can you work from our brand guidelines?',
        answer:
          'Yes. Send logos, colors, and must-play / do-not-play lists. Lighting and walk-in music can follow the same brief as your slide deck.',
      },
      {
        question: 'Do you carry liability coverage for hotel and corporate venues?',
        answer:
          'We work as an insured production crew. Certificates of insurance for a named venue can be issued during planning.',
      },
    ],
    related: [
      { href: '/laser-light-shows', label: 'Laser shows' },
      { href: '/dj-services', label: 'Corporate DJ' },
      { href: '/catering', label: 'Event catering' },
      { href: '/mentor', label: 'Mentor events' },
    ],
  },
  {
    slug: 'birthdays',
    title: 'Birthday Party DJ & Planning in Northeast Ohio',
    description:
      'Birthday and milestone party DJs, lighting, catering, and planning in Cleveland, Mentor, and Painesville — sweet sixteens, 21sts, 50ths, and surprise parties.',
    h1: 'Birthday and milestone parties that feel produced',
    kicker: 'Birthdays · Northeast Ohio',
    paragraphs: [
      'A milestone birthday should not feel like a wedding leftover or a bar playlist on shuffle. We build age-appropriate sets, MC the cake and toasts, and time food so the surprise actually lands.',
      'Sweet sixteens, quinceañeras, 21sts, 40ths, 50ths, and retirement parties across Cleveland and Lake County get the same load-in standard as a gala — backup gear, wireless mics, and a lighting look that matches the theme without blowing the budget.',
      'Backyard, banquet hall, or rented loft: tell us the guest count and we will size sound and catering to the space.',
    ],
    bullets: [
      'Milestone, surprise, and themed birthday parties',
      'Playlists that fit the age of the room',
      'Cake, toast, and special-dance cues',
      'Catering and dessert stations',
      'Indoor, tent, and backyard setups',
    ],
    faqs: [
      {
        question: 'How many hours do most birthday DJs run?',
        answer:
          'Four hours covers most private parties. Longer rooms and late-night dance floors can add hours on the quote.',
      },
      {
        question: 'Can you keep the playlist clean for mixed-age guests?',
        answer:
          'Yes. We run explicit-filter sets when kids or grandparents are in the room, and loosen the filter after a cutoff you choose.',
      },
    ],
    related: [
      { href: '/private-parties', label: 'Private parties' },
      { href: '/dj-services', label: 'DJ services' },
      { href: '/painesville', label: 'Painesville events' },
    ],
  },
  {
    slug: 'private-parties',
    title: 'Private Party Entertainment & Catering | Northeast Ohio',
    description:
      'Anniversary, graduation, holiday, and reunion parties with DJ, lighting, catering, and planning in Cleveland, Mentor, and Painesville.',
    h1: 'Private parties with a gala crew, not a Bluetooth speaker',
    kicker: 'Private events · Northeast Ohio',
    paragraphs: [
      'Anniversaries, graduations, holiday open houses, and family reunions still need a timeline. We handle walk-in music, dinner pacing, toasts, and a dance floor that does not die at 9 p.m.',
      'If the party is in a home, park shelter, or tent, we plan power, weather cover, and neighbor-friendly volume. Banquet halls get a full production plot.',
    ],
    bullets: [
      'Anniversaries, reunions, and graduations',
      'Holiday gatherings and open houses',
      'Outdoor and tent production',
      'Bar and catering packages',
      'Day-of coordination when family is busy hosting',
    ],
    faqs: [
      {
        question: 'Do you play outdoors?',
        answer:
          'Yes, with a weather plan. Covered tents and patios are straightforward. Open-sky setups get a written backup with the venue or a tent add-on.',
      },
    ],
    related: [
      { href: '/birthdays', label: 'Birthdays' },
      { href: '/catering', label: 'Catering' },
      { href: '/event-planning', label: 'Planning' },
    ],
  },
  {
    slug: 'dj-services',
    title: 'DJ Services in Cleveland, Mentor & Painesville',
    description:
      'Professional wedding, corporate, and party DJs in Northeast Ohio. Custom playlists, MC coverage, premium sound, and backup equipment on every gig.',
    h1: 'Northeast Ohio DJ services with MC coverage and backup gear',
    kicker: 'DJ · Cleveland · Mentor · Painesville',
    paragraphs: [
      'Fused Productions DJs read the room: wedding classics, 90s hip-hop, current radio, and the requests that actually get people on the floor. MC work is part of the job — not an afterthought — so announcements, raffles, and toasts hit on time.',
      'Systems are sized to the venue, from a 50-person loft in Ohio City to a ballroom in Mentor. Wireless mics, playback redundancy, and a spare mixer travel with the kit.',
      'Book DJ-only, or bundle lighting, catering, and planning so the night is one production.',
    ],
    bullets: [
      'Weddings, corporate, birthdays, and private parties',
      'Custom playlists and live requests',
      'MC scripts and run-of-show cues',
      'Sound scaled to the room',
      'Setup, strike, and backup equipment',
    ],
    faqs: [
      {
        question: 'Do you take requests?',
        answer:
          'Yes, inside the do-not-play list you set during planning. The DJ still sequences the floor so one shout-out does not empty the room.',
      },
    ],
    related: [
      { href: '/weddings', label: 'Wedding DJ' },
      { href: '/laser-light-shows', label: 'Lighting & lasers' },
      { href: '/cleveland', label: 'Cleveland' },
    ],
  },
  {
    slug: 'catering',
    title: 'Event Catering in Northeast Ohio',
    description:
      'Plated dinners, buffets, stations, and bar service for weddings, corporate events, and private parties in Cleveland, Mentor, and Painesville.',
    h1: 'Event catering that lands on the same timeline as the show',
    kicker: 'Catering · Northeast Ohio',
    paragraphs: [
      'Food service is part of the run of show. We time plated drops, buffet opens, and cake cuts so the DJ is not talking over a half-cleared room.',
      'Menus are built for the event: plated dinners, heavy apps, stations, or a buffet. Dietary needs — vegetarian, vegan, gluten-free, kosher-style, allergy plates — go on the tasting and the event-day tickets.',
      'Bar packages and service staff are available with entertainment and planning on one invoice.',
    ],
    bullets: [
      'Custom menus for weddings and corporate events',
      'Plated, buffet, and station service',
      'Dietary and allergy accommodations',
      'Professional service staff',
      'Tastings on qualifying packages',
    ],
    faqs: [
      {
        question: 'When are tastings included?',
        answer:
          'Complimentary tastings are offered on catering packages over $3,000. Smaller events can add a tasting to the quote.',
      },
    ],
    related: [
      { href: '/weddings', label: 'Weddings' },
      { href: '/corporate-events', label: 'Corporate' },
      { href: '/event-planning', label: 'Planning' },
    ],
  },
  {
    slug: 'laser-light-shows',
    title: 'Laser Light Shows & Event Lighting | Northeast Ohio',
    description:
      'Full-color laser shows, fog, and custom event lighting for weddings, product launches, and parties in Cleveland, Mentor, and Painesville.',
    h1: 'Laser light shows timed to the music, not a random fog blast',
    kicker: 'Lasers & lighting · Northeast Ohio',
    paragraphs: [
      'Lasers, haze, and conventional lighting are designed as one look: first dance, grand entrance, product reveal, or a late-night drop. We plot beams for the ceiling height and camera angles so the show photographs instead of washing out the couple.',
      'Indoor ballrooms and outdoor covered venues across Northeast Ohio are both in range. Open-sky and wind get a written plan — haze and lasers need still air and a safe beam path.',
    ],
    bullets: [
      'Full-color laser displays',
      'Fog and haze when the venue allows',
      'Music-synchronized looks',
      'Brand-color lighting for corporate reveals',
      'Indoor and covered outdoor capable',
    ],
    faqs: [
      {
        question: 'Will lasers work in a low banquet hall?',
        answer:
          'Often yes, with a tighter plot. We need ceiling height, mirror-ball locations, and whether haze is allowed. Some hotels ban haze — we design a no-haze look in those rooms.',
      },
    ],
    related: [
      { href: '/weddings', label: 'Weddings' },
      { href: '/corporate-events', label: 'Corporate launches' },
      { href: '/dj-services', label: 'DJ + lighting' },
    ],
  },
  {
    slug: 'event-planning',
    title: 'Event Planning in Cleveland, Mentor & Painesville',
    description:
      'Day-of and full event planning in Northeast Ohio. One timeline for DJ, catering, vendors, and guest flow — one invoice, one point of contact.',
    h1: 'Event planning that owns the timeline, not just a checklist',
    kicker: 'Planning · Northeast Ohio',
    paragraphs: [
      'Planning here means a production lead: vendor arrival windows, dinner pacing, toast order, and a day-of contact who is not also in the wedding party. Entertainment and catering sit on the same timeline so the night does not stall.',
      'We work with your venue’s preferred vendors and house rules. You still get one number — (833) 837-6339 — instead of a group chat that goes quiet at 4 p.m. on Saturday.',
    ],
    bullets: [
      'Venue and vendor coordination',
      'Run of show and guest-flow design',
      'Day-of on-site management',
      'Bundled entertainment and catering',
      'Preferred-vendor liaison',
    ],
    faqs: [
      {
        question: 'Is this full planning or day-of only?',
        answer:
          'Either. Day-of coordination is in the Premium-style packages. Full planning — vendors, timeline, tastings, and show calling — is the Ultimate path, and both are customizable.',
      },
    ],
    related: [
      { href: '/weddings', label: 'Wedding planning' },
      { href: '/corporate-events', label: 'Corporate planning' },
      { href: '/catering', label: 'Catering' },
    ],
  },
  {
    slug: 'cleveland',
    title: 'Cleveland Event DJ, Catering & Planning',
    description:
      'Fused Productions produces weddings, corporate events, and parties in Cleveland, Ohio — DJ, laser shows, catering, and full planning.',
    h1: 'Cleveland event production: DJ, lasers, catering, planning',
    kicker: 'Cleveland · Ohio',
    paragraphs: [
      'Downtown hotels, Ohio City lofts, Tremont restaurants, and east-side country clubs all have different load-in realities. We produce weddings, corporate nights, and private parties in Cleveland with sound, lighting, food, and a planner who has walked the dock before event day.',
      'Parking, freight elevators, and union or hotel rules get confirmed in the proposal — not discovered at 2 p.m. when the cake arrives.',
    ],
    bullets: [
      'Wedding DJ and reception production',
      'Corporate galas and holiday parties',
      'Birthday and private events',
      'Catering that matches hotel banquet rules',
      'Travel throughout Cuyahoga County',
    ],
    faqs: [
      {
        question: 'Do you work downtown Cleveland hotels?',
        answer:
          'Yes. Send the venue name and we will confirm load-in, COI, and whether house AV must stay in the room.',
      },
    ],
    related: [
      { href: '/weddings', label: 'Cleveland weddings' },
      { href: '/corporate-events', label: 'Cleveland corporate' },
      { href: '/mentor', label: 'Mentor' },
      { href: '/painesville', label: 'Painesville' },
    ],
  },
  {
    slug: 'mentor',
    title: 'Mentor Ohio Event DJ, Lighting & Catering',
    description:
      'Wedding and party DJs, laser lighting, catering, and event planning in Mentor, Ohio and Lake County.',
    h1: 'Mentor and Lake County event production',
    kicker: 'Mentor · Ohio',
    paragraphs: [
      'Mentor, Willoughby, and the lakeshore banquet circuit are a core service area. Fused Productions brings DJ, lasers, catering, and planning to halls, golf clubs, and waterfront tents without treating Lake County as a “travel upcharge afterthought.”',
      'If your guests are driving in from Cleveland or Ashtabula, we still hold a single timeline so cocktail hour does not drift.',
    ],
    bullets: [
      'Lake County weddings and receptions',
      'Corporate and civic events',
      'Milestone birthdays',
      'Outdoor and lakeside weather plans',
    ],
    faqs: [
      {
        question: 'Is Mentor in your standard service area?',
        answer:
          'Yes. Mentor, Painesville, and Cleveland are the home radius. No surprise travel fee for a Mentor hall.',
      },
    ],
    related: [
      { href: '/painesville', label: 'Painesville' },
      { href: '/cleveland', label: 'Cleveland' },
      { href: '/dj-services', label: 'DJ services' },
    ],
  },
  {
    slug: 'painesville',
    title: 'Painesville Event Entertainment & Planning',
    description:
      'DJ services, catering, laser lighting, and event planning in Painesville, Ohio and surrounding Lake County communities.',
    h1: 'Painesville parties, weddings, and corporate nights',
    kicker: 'Painesville · Ohio',
    paragraphs: [
      'Painesville, Fairport, and the rest of eastern Lake County get the same turnkey offer: entertainment, food, and planning on one call. Historic halls, fairgrounds, and backyard tents are all in play with a power and weather check during the consult.',
    ],
    bullets: [
      'Weddings and receptions',
      'Community and corporate events',
      'Birthday and reunion parties',
      'Catering and bar service',
    ],
    faqs: [
      {
        question: 'Do you travel east of Painesville?',
        answer:
          'Yes, including Ashtabula County by arrangement. Ask about travel on the quote if the venue is past our usual Lake County loop.',
      },
    ],
    related: [
      { href: '/mentor', label: 'Mentor' },
      { href: '/weddings', label: 'Weddings' },
      { href: '/birthdays', label: 'Birthdays' },
    ],
  },
];

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug);
}
