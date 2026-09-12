'use client';

import { FormEvent, useState } from 'react';
import { SITE } from '@/lib/site';

const serviceOptions = [
  { id: 'dj', label: 'DJ / entertainment' },
  { id: 'lights', label: 'Laser & lighting' },
  { id: 'catering', label: 'Catering' },
  { id: 'planning', label: 'Event planning' },
] as const;

const fieldClass =
  'w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:border-primary-500 transition-colors';

export default function QuoteForm() {
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
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-200 mb-2">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            className={fieldClass}
            placeholder="Jordan"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-200 mb-2">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            className={fieldClass}
            placeholder="Lee"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-200 mb-2">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
            placeholder="(833) 837-6339"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="eventType" className="block text-sm font-medium text-gray-200 mb-2">
            Event type
          </label>
          <select id="eventType" name="eventType" className={fieldClass} defaultValue="">
            <option value="">Select event type</option>
            <option value="wedding">Wedding</option>
            <option value="corporate">Corporate event</option>
            <option value="birthday">Birthday / milestone</option>
            <option value="private">Private party</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="eventDate" className="block text-sm font-medium text-gray-200 mb-2">
            Event date
          </label>
          <input id="eventDate" name="eventDate" type="date" className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="guestCount" className="block text-sm font-medium text-gray-200 mb-2">
          Guest count
        </label>
        <input
          id="guestCount"
          name="guestCount"
          type="number"
          min={1}
          className={fieldClass}
          placeholder="120"
        />
      </div>

      <fieldset>
        <legend className="block text-sm font-medium text-gray-200 mb-3">Services needed</legend>
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
              <span className="text-gray-100">{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="details" className="block text-sm font-medium text-gray-200 mb-2">
          Tell us about your event
        </label>
        <textarea
          id="details"
          name="details"
          rows={4}
          className={`${fieldClass} resize-none`}
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
        <p className="text-sm text-primary-200 text-center">
          Your email app should open with the quote request. If it does not, write us at {SITE.email}.
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-300 text-center">Please add your first name and email so we can reply.</p>
      )}
    </form>
  );
}
