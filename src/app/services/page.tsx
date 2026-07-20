import type { Metadata } from 'next';
import Services from '@/components/sections/Services';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore our full range of premium salon services including hair styling, skincare, nail art, makeup, spa treatments, and bridal packages at Glamour Studio.',
};

export default function ServicesPage() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="font-heading text-4xl font-bold text-secondary md:text-5xl">
            Our Services
          </h1>
          <p className="mt-4 text-lg text-text-light">
            Discover our comprehensive range of beauty and grooming services
          </p>
        </div>
        <Services />
      </div>
    </section>
  );
}
