'use client';

import { useState } from 'react';
import {
  Music,
  Sparkles,
  UtensilsCrossed,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
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
  ChevronDown,
  Play,
  Award,
  Clock,
  Shield,
} from 'lucide-react';

const services = [
  {
    icon: Music,
    title: 'DJ Services',
    description:
      'Professional DJs with extensive music libraries spanning all genres. State-of-the-art sound systems tailored to your venue size.',
    features: [
      'Custom playlists & requests',
      'MC services available',
      'Premium sound equipment',
      'Wireless microphones',
    ],
  },
  {
    icon: Sparkles,
    title: 'Laser Light Shows',
    description:
      'Stunning visual experiences with cutting-edge laser technology. Transform any venue into an immersive spectacle.',
    features: [
      'Full-color laser displays',
      'Fog & haze effects',
      'Synchronized to music',
      'Indoor & outdoor capable',
    ],
  },
  {
    icon: UtensilsCrossed,
    title: 'Catering',
    description:
      'Exceptional culinary experiences from elegant plated dinners to casual buffets. Customized menus for every taste.',
    features: [
      'Custom menu design',
      'Dietary accommodations',
      'Professional service staff',
      'Bar services available',
    ],
  },
];

const packages = [
  {
    name: 'Essential',
    price: 'From $1,500',
    description: 'Perfect for intimate gatherings',
    features: [
      'DJ services (4 hours)',
      'Basic sound system',
      'Event consultation',
      'Custom playlist',
    ],
    popular: false,
  },
  {
    name: 'Premium',
    price: 'From $3,500',
    description: 'Our most popular package',
    features: [
      'DJ services (6 hours)',
      'Laser light show',
      'Premium sound & lighting',
      'MC services',
      'Fog effects',
      'Event coordination',
    ],
    popular: true,
  },
  {
    name: 'Ultimate',
    price: 'From $7,500',
    description: 'The complete experience',
    features: [
      'DJ services (8 hours)',
      'Full laser production',
      'Catering (up to 100 guests)',
      'Premium bar service',
      'Event planning',
      'Day-of coordination',
      'Custom lighting design',
    ],
    popular: false,
  },
];

const stats = [
  { value: '500+', label: 'Events Completed' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '15+', label: 'Years Experience' },
  { value: '50+', label: 'Corporate Partners' },
];

const testimonials = [
  {
    name: 'Sarah & Michael Thompson',
    event: 'Wedding Reception',
    image: null,
    rating: 5,
    text: 'Fused Productions made our wedding absolutely magical. The DJ kept everyone dancing all night, and the laser show during our first dance was breathtaking. Having everything coordinated by one team made planning so much easier.',
  },
  {
    name: 'Jennifer Martinez',
    event: 'Corporate Gala',
    company: 'TechVentures Inc.',
    image: null,
    rating: 5,
    text: 'We\'ve used Fused Productions for three annual galas now. Their professionalism is unmatched. The catering is always exceptional, and the entertainment keeps our guests talking for months.',
  },
  {
    name: 'David & Lisa Chen',
    event: '25th Anniversary Party',
    image: null,
    rating: 5,
    text: 'From the moment we contacted them, we felt taken care of. The team understood exactly what we wanted and delivered beyond our expectations. The food was incredible!',
  },
  {
    name: 'Robert Williams',
    event: 'Product Launch',
    company: 'Innovate Solutions',
    image: null,
    rating: 5,
    text: 'The laser show they created for our product launch was absolutely stunning. It perfectly captured our brand\'s energy and left a lasting impression on all attendees.',
  },
];

const eventTypes = [
  {
    icon: Heart,
    title: 'Weddings',
    description: 'Make your special day unforgettable with our complete wedding entertainment and catering packages.',
    features: ['Ceremony & reception DJ', 'First dance spotlight', 'Custom lighting design', 'Full catering service'],
    image: '/images/wedding.jpg',
  },
  {
    icon: Building2,
    title: 'Corporate Events',
    description: 'Impress clients and motivate teams with professional entertainment and premium catering.',
    features: ['Product launches', 'Award ceremonies', 'Holiday parties', 'Team building events'],
    image: '/images/corporate.jpg',
  },
  {
    icon: PartyPopper,
    title: 'Private Parties',
    description: 'From milestone birthdays to anniversary celebrations, we make every party extraordinary.',
    features: ['Birthday celebrations', 'Anniversary parties', 'Graduation events', 'Holiday gatherings'],
    image: '/images/party.jpg',
  },
];

const faqs = [
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend booking at least 3-6 months in advance for weddings and large corporate events. For smaller private parties, 4-6 weeks is usually sufficient. However, popular dates (especially summer weekends) can book up to a year in advance.',
  },
  {
    question: 'Can I customize a package?',
    answer: 'Absolutely! All our packages are fully customizable. We\'ll work with you to create the perfect combination of services that fits your vision and budget. Mix and match DJ services, laser shows, and catering options to create your ideal event.',
  },
  {
    question: 'Do you provide tastings for catering?',
    answer: 'Yes! We offer complimentary tastings for events with catering packages over $3,000. This allows you to sample menu items and work with our culinary team to perfect your selections.',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We primarily serve the Greater Ohio region, including Columbus, Cleveland, Cincinnati, and surrounding areas. We also travel for destination events - contact us for availability and travel fees.',
  },
  {
    question: 'What happens if there\'s an equipment issue?',
    answer: 'We always bring backup equipment to every event. Our team is trained to handle any technical issues quickly and discreetly. In our 15+ years, we\'ve never had an event interrupted by equipment failure.',
  },
  {
    question: 'Can you accommodate dietary restrictions?',
    answer: 'Yes! Our catering team is experienced in preparing meals for various dietary needs including vegetarian, vegan, gluten-free, kosher, and allergy-friendly options. Just let us know your requirements during planning.',
  },
];

const galleryItems = [
  { title: 'Wedding Reception', category: 'wedding' },
  { title: 'Corporate Gala', category: 'corporate' },
  { title: 'Laser Light Show', category: 'entertainment' },
  { title: 'Elegant Catering', category: 'catering' },
  { title: 'Birthday Celebration', category: 'party' },
  { title: 'DJ Performance', category: 'entertainment' },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl">
                Fused<span className="text-primary-400">Productions</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#services" className="text-gray-300 hover:text-white transition-colors">
                Services
              </a>
              <a href="#events" className="text-gray-300 hover:text-white transition-colors">
                Events
              </a>
              <a href="#packages" className="text-gray-300 hover:text-white transition-colors">
                Packages
              </a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
                Reviews
              </a>
              <a href="#faq" className="text-gray-300 hover:text-white transition-colors">
                FAQ
              </a>
              <a
                href="#contact"
                className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Get Quote
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-white/5">
            <div className="px-4 py-4 space-y-3">
              <a href="#services" className="block text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                Services
              </a>
              <a href="#events" className="block text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                Events
              </a>
              <a href="#packages" className="block text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                Packages
              </a>
              <a href="#testimonials" className="block text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                Reviews
              </a>
              <a href="#faq" className="block text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                FAQ
              </a>
              <a
                href="#contact"
                className="block px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg font-medium text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Quote
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/20 via-gray-950 to-gray-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-gray-300">Trusted by 500+ clients</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            One Team.{' '}
            <span className="gradient-text animate-gradient">Every Service.</span>
            <br />
            Unforgettable Events.
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 text-balance">
            Professional DJ services, stunning laser light shows, and exceptional catering.
            Everything you need for your perfect event, all from one trusted team.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="group px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl font-semibold text-lg hover:opacity-90 transition-all flex items-center gap-2"
            >
              Plan Your Event
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Explore Services
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-white/5">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl sm:text-4xl font-display font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Everything You Need,{' '}
              <span className="gradient-text">All in One Place</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Stop coordinating with multiple vendors. We handle it all, ensuring a seamless
              experience from start to finish.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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

      {/* Event Types Section */}
      <section id="events" className="py-24 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Events We <span className="gradient-text">Specialize In</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From intimate celebrations to grand corporate galas, we bring expertise and passion to every event type.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {eventTypes.map((event) => (
              <div
                key={event.title}
                className="group relative overflow-hidden rounded-2xl bg-gray-900/50 border border-white/5 hover:border-primary-500/30 transition-all duration-500"
              >
                {/* Gradient overlay background */}
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

      {/* Packages Section */}
      <section id="packages" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Packages for <span className="gradient-text">Every Event</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From intimate gatherings to grand celebrations, we have the perfect package for you.
              All packages are fully customizable.
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
                    Most Popular
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
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
                Why Choose <span className="gradient-text">Fused Productions?</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                We believe your event should be stress-free and spectacular. That&apos;s why we
                offer all the essential services under one roof, with one point of contact, and
                one unified vision for your celebration.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Single Point of Contact</h3>
                    <p className="text-gray-400">
                      No more juggling multiple vendors. One team handles everything.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-accent-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Seamless Coordination</h3>
                    <p className="text-gray-400">
                      Our services are designed to work together perfectly.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Proven Excellence</h3>
                    <p className="text-gray-400">
                      15+ years of creating unforgettable experiences.
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
                    &ldquo;Making every event extraordinary since 2009&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what our clients have to say about their experiences.
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
                      {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">
                      {testimonial.event}
                      {testimonial.company && ` - ${testimonial.company}`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-16 pt-16 border-t border-white/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary-500/20 flex items-center justify-center mb-3">
                  <Award className="w-7 h-7 text-primary-400" />
                </div>
                <div className="font-semibold">Award Winning</div>
                <div className="text-sm text-gray-400">Best Event Services 2024</div>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-accent-500/20 flex items-center justify-center mb-3">
                  <Shield className="w-7 h-7 text-accent-400" />
                </div>
                <div className="font-semibold">Fully Insured</div>
                <div className="text-sm text-gray-400">$2M liability coverage</div>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary-500/20 flex items-center justify-center mb-3">
                  <Clock className="w-7 h-7 text-primary-400" />
                </div>
                <div className="font-semibold">Always On Time</div>
                <div className="text-sm text-gray-400">100% punctuality record</div>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-xl bg-accent-500/20 flex items-center justify-center mb-3">
                  <Users className="w-7 h-7 text-accent-400" />
                </div>
                <div className="font-semibold">Expert Team</div>
                <div className="text-sm text-gray-400">Certified professionals</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to know about our services.
            </p>
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
                  <div className="px-6 pb-5 text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
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
              Contact Us
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
                Let&apos;s Create Something{' '}
                <span className="gradient-text">Unforgettable</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Ready to start planning? Get in touch and let&apos;s discuss how we can make your
                event extraordinary.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Call us</div>
                    <a href="tel:+15551234567" className="text-lg font-semibold hover:text-primary-400">
                      (555) 123-4567
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
                      href="mailto:info@fusedproductions.com"
                      className="text-lg font-semibold hover:text-accent-400"
                    >
                      info@fusedproductions.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Service Area</div>
                    <div className="text-lg font-semibold">Greater Ohio Region</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-8">
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Event Type
                  </label>
                  <select className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500 transition-colors">
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="private">Private Party</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tell us about your event
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500 transition-colors resize-none"
                    placeholder="Date, guest count, services needed..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
                >
                  Request Quote
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <a href="#services" className="hover:text-white transition-colors">
                Services
              </a>
              <a href="#events" className="hover:text-white transition-colors">
                Events
              </a>
              <a href="#packages" className="hover:text-white transition-colors">
                Packages
              </a>
              <a href="#testimonials" className="hover:text-white transition-colors">
                Reviews
              </a>
              <a href="#faq" className="hover:text-white transition-colors">
                FAQ
              </a>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>

            <div className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Fused Productions. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
