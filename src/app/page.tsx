'use client';

import { FormEvent, useState } from 'react';
import {
  Music,
  Sparkles,
  UtensilsCrossed,
  ClipboardList,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Globe,
  Star,
  Users,
  Calendar,
  Check,
  Menu,
  X,
  Quote,
  Heart,
  Building2,
  PartyPopper,
  Cake,
  ChevronDown,
  Shield,
  Clock,
  Receipt,
} from 'lucide-react';
import { SITE } from '@/lib/site';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'How it works' },
  { href: '#events', label: 'Events' },
  { href: '#packages', label: 'Packages' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#faq', label: 'FAQ' },
];

const services = [
  {
    icon: Music,
    title: 'DJ Services',
    description:
      'Professional DJs with deep libraries across every genre, plus MC coverage so announcements, toasts, and transitions stay on time.',
    features: [
      'Custom playlists and live requests',
      'MC services and run-of-show cues',
      'Premium sound sized to the room',
      'Wireless microphones',
      'Setup, strike, and backup gear',
    ],
  },
  {
    icon: Sparkles,
    title: 'Laser Light Shows',
    description:
      'Full-color laser and lighting design that turns a hall, tent, or outdoor space into a staged experience timed to the music.',
    features: [
      'Full-color laser displays',
      'Fog and haze effects',
      'Music-synchronized looks',
      'Indoor and outdoor capable',
      'First-dance and reveal moments',
    ],
  },
  {
    icon: UtensilsCrossed,
    title: 'Catering',
    description:
      'Menus built for the event — plated dinners, buffets, or stations — with service staff and bar options that match the rest of the production.',
    features: [
      'Custom menu design',
      'Plated, buffet, and station service',
      'Dietary and allergy accommodations',
      'Professional service staff',
      'Bar packages available',
    ],
  },
  {
    icon: ClipboardList,
    title: 'Event Planning',
    description:
      'Full planning and day-of management so entertainment, catering, vendors, and guest flow run on one timeline with one point of contact.',
    features: [
      'Venue and vendor coordination',
      'Timeline and guest-flow design',
      'Day-of on-site management',
      'One invoice for bundled services',
      'Preferred-vendor liaison at your venue',
    ],
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Consult',
    description:
      'Tell us the date, venue, guest count, and the feel you want. We map entertainment, catering, and planning in one conversation.',
  },
  {
    step: '02',
    title: 'Custom proposal',
    description:
      'You get a clear package — hours, gear, menu direction, and planning scope — priced to the event, not a one-size list.',
  },
  {
    step: '03',
    title: 'Plan & tastings',
    description:
      'We lock the timeline, playlists, lighting looks, and catering details. Tastings are available on qualifying catering packages.',
  },
  {
    step: '04',
    title: 'Event day',
    description:
      'Our crew arrives on schedule, runs sound, lights, food service, and the minute-by-minute show so you can be a guest.',
  },
  {
    step: '05',
    title: 'Wrap-up',
    description:
      'Strike, load-out, and a single follow-up. Backup equipment is on site so technical issues never become the story.',
  },
];

const packages = [
  {
    name: 'Essential',
    price: 'From $1,500',
    description: 'Entertainment plus a planning consult for intimate gatherings',
    features: [
      'DJ services (4 hours)',
      'Basic sound system',
      'Planning consult and timeline sketch',
      'Custom playlist',
      'Setup and teardown',
    ],
    popular: false,
  },
  {
    name: 'Premium',
    price: 'From $3,500',
    description: 'Entertainment with on-site coordination — our most requested mix',
    features: [
      'DJ services (6 hours)',
      'Laser light show',
      'Premium sound and lighting',
      'MC services',
      'Fog effects',
      'Event coordination on the day',
    ],
    popular: true,
  },
  {
    name: 'Ultimate',
    price: 'From $7,500',
    description: 'Full turnkey: entertainment, catering, and planning',
    features: [
      'DJ services (8 hours)',
      'Full laser production',
      'Catering (up to 100 guests)',
      'Premium bar service',
      'Full event planning',
      'Day-of coordination',
      'Custom lighting design',
    ],
    popular: false,
  },
];

const stats = [
  { value: 'One team', label: 'Entertainment, catering, planning' },
  { value: 'NE Ohio', label: 'Cleveland · Mentor · Painesville' },
  { value: 'Insured', label: 'Professional production crew' },
  { value: 'Custom', label: 'Quotes built around your date' },
];

const testimonials = [
  {
    name: 'Sarah & Michael Thompson',
    event: 'Wedding Reception',
    rating: 5,
    text: 'Fused Productions made our wedding absolutely magical. The DJ kept everyone dancing all night, and the laser show during our first dance was breathtaking. Having everything coordinated by one team made planning so much easier.',
  },
  {
    name: 'Jennifer Martinez',
    event: 'Corporate Gala',
    company: 'TechVentures Inc.',
    rating: 5,
    text: "We've used Fused Productions for three annual galas now. Their professionalism is unmatched. The catering is always exceptional, and the entertainment keeps our guests talking for months.",
  },
  {
    name: 'David & Lisa Chen',
    event: '25th Anniversary Party',
    rating: 5,
    text: 'From the moment we contacted them, we felt taken care of. The team understood exactly what we wanted and delivered beyond our expectations. The food was incredible!',
  },
  {
    name: 'Robert Williams',
    event: 'Product Launch',
    company: 'Innovate Solutions',
    rating: 5,
    text: "The laser show they created for our product launch was absolutely stunning. It perfectly captured our brand's energy and left a lasting impression on all attendees.",
  },
];

const eventTypes = [
  {
    icon: Heart,
    title: 'Weddings',
    description:
      'Ceremony through last dance — DJ, lighting, catering, and a planner who keeps vendors and the timeline aligned.',
    features: [
      'Ceremony and reception DJ',
      'First-dance spotlight and grand entrance',
      'Custom lighting design',
      'Dinner service and cake cut cues',
    ],
  },
  {
    icon: Building2,
    title: 'Corporate Events',
    description:
      'Galas, launches, and holiday parties with production that looks like the brand and runs like a show.',
    features: [
      'Product launches and brand reveals',
      'Award ceremonies and MC scripts',
      'Holiday parties and hospitality',
      'Team events and client entertainment',
    ],
  },
  {
    icon: Cake,
    title: 'Birthdays & milestones',
    description:
      'Sweet sixteens, 21sts, 50ths, retirements, and quinceañeras with a party that actually feels produced.',
    features: [
      'Milestone and surprise parties',
      'Age-appropriate playlists and MC',
      'Themed lighting and special moments',
      'Food, cake, and guest-flow timing',
    ],
  },
  {
    icon: PartyPopper,
    title: 'Private Parties',
    description:
      'Anniversaries, graduations, holiday gatherings, and backyard celebrations with the same crew as a gala.',
    features: [
      'Anniversary and reunion parties',
      'Graduation celebrations',
      'Holiday gatherings',
      'Outdoor and tent setups',
    ],
  },
];

const faqs = [
  {
    question: 'How far in advance should I book?',
    answer:
      'Book 3–6 months ahead for weddings and large corporate events. Smaller private parties and birthdays are often fine at 4–6 weeks. Peak summer weekends can fill much earlier — call if the date is already close.',
  },
  {
    question: 'Can I customize a package?',
    answer:
      'Yes. Essential, Premium, and Ultimate are starting points. Mix DJ hours, laser looks, catering, and planning so the quote matches the venue and guest count.',
  },
  {
    question: 'What does event planning include?',
    answer:
      'We build the run of show, coordinate entertainment and catering with your venue, manage vendor arrival windows, and staff day-of so announcements, dinner, and dancing land on time. You get one contact instead of a chain of texts.',
  },
  {
    question: 'Do you provide tastings for catering?',
    answer:
      'Complimentary tastings are offered on catering packages over $3,000 so you can settle menu and dietary needs with the culinary team before the event.',
  },
  {
    question: 'What areas do you serve?',
    answer:
      'Northeast Ohio — Cleveland, Mentor, Painesville, and surrounding communities. We travel for destination events; ask about availability and travel fees.',
  },
  {
    question: 'How do deposits and payment work?',
    answer:
      'A deposit holds the date once you approve the proposal. Remaining balance is due before event day. We will spell out the schedule on the quote so there are no surprises.',
  },
  {
    question: 'What does the venue need to provide?',
    answer:
      'Power, load-in access, and a clear setup window. Outdoor and tent events may need weather cover and grounded power. We will confirm electrical, staging, and catering kitchen access during planning.',
  },
  {
    question: 'What if the weather turns on an outdoor event?',
    answer:
      'We plan a rain path with you and the venue — tent, indoor backup, or adjusted lighting and sound. Lasers and sound are weather-rated for covered outdoor use; open-sky setups get a written backup plan.',
  },
  {
    question: 'Do you work with our venue’s preferred vendors?',
    answer:
      'Yes. We coordinate with house A/V, catering restrictions, and preferred-vendor lists so we are not fighting the venue on event day.',
  },
  {
    question: 'What happens if there is an equipment issue?',
    answer:
      'We bring backup equipment to every event. The crew handles technical issues quickly and quietly so guests never see it.',
  },
  {
    question: 'Can you accommodate dietary restrictions?',
    answer:
      'Yes — vegetarian, vegan, gluten-free, kosher-style, and allergy-aware plates. Flag needs during planning so they are on the tasting and the event-day tickets.',
  },
];

const serviceOptions = [
  { id: 'dj', label: 'DJ / entertainment' },
  { id: 'lights', label: 'Laser & lighting' },
  { id: 'catering', label: 'Catering' },
  { id: 'planning', label: 'Event planning' },
] as const;

function QuoteForm() {
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle');
  const [servicesNeeded, setServicesNeeded] = useState<string[]>([]);

  function toggleService(id: string) {
    setServicesNeeded((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const firstName = String(data.get('firstName') ?? '').trim();
    const lastName = String(data.get('lastName') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const eventType = String(data.get('eventType') ?? '').trim();
    const eventDate = String(data.get('eventDate') ?? '').trim();
    const guestCount = String(data.get('guestCount') ?? '').trim();
    const details = String(data.get('details') ?? '').trim();

    if (!firstName || !email) {
      setStatus('error');
      return;
    }

    const lines = [
      `Name: ${firstName} ${lastName}`.trim(),
      `Email: ${email}`,
      `Phone: ${phone || 'Not provided'}`,
      `Event type: ${eventType || 'Not specified'}`,
      `Event date: ${eventDate || 'Not specified'}`,
      `Guest count: ${guestCount || 'Not specified'}`,
      `Services: ${servicesNeeded.length ? servicesNeeded.join(', ') : 'Not specified'}`,
      '',
      details || '(No additional details)',
    ];

    const subject = encodeURIComponent(
      `Event quote — ${firstName} ${lastName}`.trim() + (eventType ? ` (${eventType})` : '')
    );
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setStatus('sent');
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
            placeholder="Jordan"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
            placeholder="Lee"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
            placeholder="(833) 837-6339"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="eventType" className="block text-sm font-medium text-gray-300 mb-2">
            Event type
          </label>
          <select
            id="eventType"
            name="eventType"
            className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
            defaultValue=""
          >
            <option value="">Select event type</option>
            <option value="wedding">Wedding</option>
            <option value="corporate">Corporate event</option>
            <option value="birthday">Birthday / milestone</option>
            <option value="private">Private party</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="eventDate" className="block text-sm font-medium text-gray-300 mb-2">
            Event date
          </label>
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="guestCount" className="block text-sm font-medium text-gray-300 mb-2">
          Guest count
        </label>
        <input
          id="guestCount"
          name="guestCount"
          type="number"
          min={1}
          className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
          placeholder="120"
        />
      </div>

      <fieldset>
        <legend className="block text-sm font-medium text-gray-300 mb-3">Services needed</legend>
        <div className="grid sm:grid-cols-2 gap-3">
          {serviceOptions.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800 border border-white/10 cursor-pointer hover:border-primary-500/50"
            >
              <input
                type="checkbox"
                checked={servicesNeeded.includes(option.id)}
                onChange={() => toggleService(option.id)}
                className="rounded border-white/20 bg-gray-900 text-primary-500 focus:ring-primary-500"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="details" className="block text-sm font-medium text-gray-300 mb-2">
          Tell us about your event
        </label>
        <textarea
          id="details"
          name="details"
          rows={4}
          className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500 transition-colors resize-none"
          placeholder="Venue, vibe, must-play songs, dietary needs…"
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
      >
        Request quote
      </button>

      {status === 'sent' && (
        <p className="text-sm text-primary-300 text-center">
          Your email app should open with the quote request. If it does not, write us at {SITE.email}.
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-400 text-center">Please add your first name and email so we can reply.</p>
      )}
    </form>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#top" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl">
                Fused<span className="text-primary-400">Productions</span>
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`tel:${SITE.phoneTel}`}
                className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                {SITE.phoneDisplay}
              </a>
              <a
                href="#contact"
                className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Get quote
              </a>
            </div>

            <button
              className="lg:hidden p-2"
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
                  className="block text-gray-300 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`tel:${SITE.phoneTel}`}
                className="block text-gray-300 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Call {SITE.phoneDisplay}
              </a>
              <a
                href="#contact"
                className="block px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg font-medium text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get quote
              </a>
            </div>
          </div>
        )}
      </nav>

      <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/20 via-gray-950 to-gray-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-gray-300">
              Turnkey events · Northeast Ohio · One call
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Entertainment. Catering.{' '}
            <span className="gradient-text animate-gradient">Planning.</span>
            <br />
            One team for the whole night.
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 text-balance">
            Fused Productions is the turnkey crew for weddings, corporate events, birthdays, and
            private parties — DJ, laser shows, catering, and full event planning under one invoice.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="group px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl font-semibold text-lg hover:opacity-90 transition-all flex items-center gap-2"
            >
              Plan your event
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Explore services
            </a>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="px-8 py-4 text-lg font-semibold text-primary-300 hover:text-white flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              {SITE.phoneDisplay}
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-white/5">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-display font-bold gradient-text">{stat.value}</div>
                <div className="text-gray-500 mt-1 text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Everything you need,{' '}
              <span className="gradient-text">all in one place</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Stop juggling a DJ, a caterer, and a planner. We produce the night as one show.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="group relative p-8 rounded-2xl bg-gray-900/50 border border-white/5 hover:border-primary-500/50 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-primary-400" />
                </div>

                <h3 className="font-display text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>

                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-primary-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="py-24 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              How a <span className="gradient-text">turnkey event</span> works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              One conversation to a finished night — proposal, planning, show, and wrap-up.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {processSteps.map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-2xl bg-gray-900/50 border border-white/5"
              >
                <div className="text-primary-400 font-display font-bold text-sm mb-3">{item.step}</div>
                <h3 className="font-display text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="events" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Events we <span className="gradient-text">produce</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Weddings, corporate, birthdays, and private parties — same crew, same standard.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {eventTypes.map((event) => (
              <div
                key={event.title}
                className="group relative overflow-hidden rounded-2xl bg-gray-900/50 border border-white/5 hover:border-primary-500/30 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <event.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="font-display text-2xl font-bold mb-3">{event.title}</h3>
                  <p className="text-gray-400 mb-6">{event.description}</p>

                  <ul className="space-y-2">
                    {event.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-gray-300 text-sm">
                        <Check className="w-4 h-4 text-primary-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-2 text-primary-400 font-medium group-hover:text-primary-300 transition-colors"
                  >
                    Plan your {event.title.toLowerCase()}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="py-24 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Packages for <span className="gradient-text">every event</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Starting prices only. Every quote is built around your date, venue, and guest count.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative p-8 rounded-2xl ${
                  pkg.popular
                    ? 'bg-gradient-to-b from-primary-900/50 to-gray-900 border-2 border-primary-500/50 glow'
                    : 'bg-gray-900/50 border border-white/5'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full text-sm font-medium">
                    Most requested
                  </div>
                )}

                <h3 className="font-display text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold gradient-text mb-2">{pkg.price}</div>
                <p className="text-gray-400 mb-6">{pkg.description}</p>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-primary-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`block w-full py-3 rounded-xl font-semibold text-center transition-all ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 hover:opacity-90'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  Get a custom quote
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
                Why choose <span className="gradient-text">Fused Productions?</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Your event should feel like one production, not a pile of vendors. We run entertainment,
                catering, and planning as a single crew — one timeline, one invoice, one number to call.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Single point of contact</h3>
                    <p className="text-gray-400">
                      DJ, lights, food, and day-of management answer to the same production lead.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-accent-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">One timeline</h3>
                    <p className="text-gray-400">
                      Load-in, dinner, speeches, and last dance are designed to fit — not stacked at the last minute.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                    <Receipt className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">One invoice</h3>
                    <p className="text-gray-400">
                      Bundled services, local insured crew, and a quote written for your date — not a catalog SKU.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-6">
                    <Sparkles className="w-16 h-16 text-white" />
                  </div>
                  <p className="text-2xl font-display font-bold">
                    Local, insured, one-call production for Northeast Ohio
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-24 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              What our <span className="gradient-text">clients say</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Couples, companies, and families who wanted one team instead of five vendors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative p-8 rounded-2xl bg-gray-900/50 border border-white/5 hover:border-primary-500/30 transition-all duration-300"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-primary-500/20" />

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <span className="text-white font-bold">
                      {testimonial.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">
                      {testimonial.event}
                      {testimonial.company && ` — ${testimonial.company}`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-16 border-t border-white/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary-500/20 flex items-center justify-center mb-3">
                  <ClipboardList className="w-7 h-7 text-primary-400" />
                </div>
                <div className="font-semibold">Turnkey production</div>
                <div className="text-sm text-gray-400">Entertainment, catering, planning</div>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-accent-500/20 flex items-center justify-center mb-3">
                  <Shield className="w-7 h-7 text-accent-400" />
                </div>
                <div className="font-semibold">Insured crew</div>
                <div className="text-sm text-gray-400">Professional production coverage</div>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary-500/20 flex items-center justify-center mb-3">
                  <Clock className="w-7 h-7 text-primary-400" />
                </div>
                <div className="font-semibold">On the clock</div>
                <div className="text-sm text-gray-400">Load-in windows you can plan around</div>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-accent-500/20 flex items-center justify-center mb-3">
                  <Phone className="w-7 h-7 text-accent-400" />
                </div>
                <div className="font-semibold">One number</div>
                <div className="text-sm text-gray-400">{SITE.phoneDisplay}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Frequently asked <span className="gradient-text">questions</span>
            </h2>
            <p className="text-xl text-gray-400">Planning, venues, weather, deposits, and dietary needs.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl bg-gray-900/50 border border-white/5 overflow-hidden"
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-lg pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-5 text-gray-400 leading-relaxed">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Still have questions?</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              Contact us
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
                Let&apos;s create something{' '}
                <span className="gradient-text">unforgettable</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Ready to start planning? Call, email, or send the form — we will reply with a custom
                quote for entertainment, catering, and planning.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Call us</div>
                    <a href={`tel:${SITE.phoneTel}`} className="text-lg font-semibold hover:text-primary-400">
                      {SITE.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-accent-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Email us</div>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-lg font-semibold hover:text-accent-400"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Website</div>
                    <a
                      href={SITE.url}
                      className="text-lg font-semibold hover:text-primary-400"
                      target="_blank"
                      rel="noreferrer"
                    >
                      fusedproductions.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-accent-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Service area</div>
                    <div className="text-lg font-semibold">{SITE.serviceArea}</div>
                    <div className="text-sm text-gray-500">{SITE.serviceAreaDetail}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-8">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-display font-bold text-xl">
                  Fused<span className="text-primary-400">Productions</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                ))}
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a href={`tel:${SITE.phoneTel}`} className="hover:text-white">
                  {SITE.phoneDisplay}
                </a>
                <a href={`mailto:${SITE.email}`} className="hover:text-white">
                  {SITE.email}
                </a>
                <a href={SITE.url} className="hover:text-white" target="_blank" rel="noreferrer">
                  fusedproductions.com
                </a>
              </div>
              <div>
                &copy; {new Date().getFullYear()} Fused Productions. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
