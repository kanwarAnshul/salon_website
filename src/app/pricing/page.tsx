import type { Metadata } from 'next';
import Pricing from '@/components/sections/Pricing';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'View our transparent pricing for all salon services. Affordable luxury with premium quality at Glamour Studio.',
};

export default function PricingPage() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="font-heading text-4xl font-bold text-secondary md:text-5xl">
            Pricing Plans
          </h1>
          <p className="mt-4 text-lg text-text-light">
            Choose the perfect plan for your beauty needs
          </p>
        </div>
        <Pricing />
      </div>
    </section>
  );
}
