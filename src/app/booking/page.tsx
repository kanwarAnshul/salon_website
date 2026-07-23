import type { Metadata } from 'next';
import ClientProviders from '@/components/providers/ClientProviders';
import { BookingForm } from '@/components/booking';

export const metadata: Metadata = {
  title: 'Book Appointment',
  description:
    'Book your next appointment at Glamour Studio. Choose your service, stylist, and preferred time for a seamless booking experience.',
};

export default function BookingPage() {
  return (
    <ClientProviders>
      <section className="py-20 pt-36">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="font-heading text-4xl font-bold text-secondary md:text-5xl">
              Book Your Appointment
            </h1>
            <p className="mt-4 text-lg text-text-light">
              Schedule your visit and let us take care of the rest
            </p>
          </div>
          <div className="mx-auto max-w-2xl">
            <BookingForm />
          </div>
        </div>
      </section>
    </ClientProviders>
  );
}
