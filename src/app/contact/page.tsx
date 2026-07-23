import type { Metadata } from 'next';
import ClientProviders from '@/components/providers/ClientProviders';
import ContactSection from '@/components/sections/ContactSection';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Glamour Studio. Visit us, call, or message us on WhatsApp for bookings, inquiries, and more.',
};

export default function ContactPage() {
  return (
    <ClientProviders>
      <section className="py-20 pt-36">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="font-heading text-4xl font-bold text-secondary md:text-5xl">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-text-light">
              We&apos;d love to hear from you
            </p>
          </div>
          <ContactSection />
        </div>
      </section>
    </ClientProviders>
  );
}
