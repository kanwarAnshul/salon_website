'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUp, Mail, Phone, MapPin, Clock } from 'lucide-react';

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
import { cn } from '@/lib/utils';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Team', href: '/team' },
    { label: 'Pricing', href: '/pricing' },
  ];

  const serviceLinks = [
    'Hair Styling',
    'Skin Care',
    'Nail Art',
    'Makeup',
    'Spa & Massage',
    'Bridal Package',
  ];

  return (
    <footer className="relative bg-background-alt border-t border-white/5">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Column */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl font-bold text-primary">
                {SITE_CONFIG.name.split(' ')[0]}
              </span>
              <span className="font-heading text-2xl font-light text-white ml-1">
                {SITE_CONFIG.name.split(' ')[1]}
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full glass/5 text-white/60 transition-all duration-300 hover:bg-primary hover:text-foreground"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full glass/5 text-white/60 transition-all duration-300 hover:bg-primary hover:text-foreground"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={SITE_CONFIG.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full glass/5 text-white/60 transition-all duration-300 hover:bg-primary hover:text-foreground"
                aria-label="Twitter"
              >
                <TwitterIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-6">
            <h3 className="font-heading text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors duration-300 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="space-y-6">
            <h3 className="font-heading text-lg font-semibold text-white">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-sm text-white/60 transition-colors duration-300 hover:text-primary"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h3 className="font-heading text-lg font-semibold text-white">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 text-primary shrink-0" />
                <span className="text-sm text-white/60">
                  {SITE_CONFIG.address.street}, {SITE_CONFIG.address.city},{' '}
                  {SITE_CONFIG.address.state} {SITE_CONFIG.address.zip}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-sm text-white/60 transition-colors hover:text-primary"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-sm text-white/60 transition-colors hover:text-primary"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-1 text-primary shrink-0" />
                <div className="text-sm text-white/60">
                  <p>Mon-Fri: {SITE_CONFIG.hours.weekday.open} - {SITE_CONFIG.hours.weekday.close}</p>
                  <p>Sat-Sun: {SITE_CONFIG.hours.weekend.open} - {SITE_CONFIG.hours.weekend.close}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-heading text-lg font-semibold text-white mb-2">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-sm text-white/60 mb-6">
              Get updates on exclusive offers, beauty tips, and more.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 rounded-full glass/5 border border-white/10 px-5 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button
                type="submit"
                className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 whitespace-nowrap"
              >
                {isSubscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">
              &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <p className="text-sm text-white/30">
              Portfolio Demo &middot; Built with care
            </p>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-24 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary/90 hover:scale-110"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}
