import type { Metadata } from 'next';
import Team from '@/components/sections/Team';

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Meet the talented stylists, colorists, and beauty experts at Glamour Studio who bring creativity and skill to every appointment.',
};

export default function TeamPage() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="font-heading text-4xl font-bold text-secondary md:text-5xl">
            Meet Our Team
          </h1>
          <p className="mt-4 text-lg text-text-light">
            The talented professionals behind every transformation
          </p>
        </div>
        <Team />
      </div>
    </section>
  );
}
