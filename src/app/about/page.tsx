import type { Metadata } from 'next';
import ClientProviders from '@/components/providers/ClientProviders';
import { BUSINESS_DATA, SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Glamour Studio — our story, mission, values, and the passionate team behind New York\'s premier unisex salon.',
};

const values = [
  {
    title: 'Excellence',
    description: 'We strive for perfection in every service, ensuring you leave feeling your absolute best.',
  },
  {
    title: 'Innovation',
    description: 'Staying ahead of trends with continuous education and the latest techniques in beauty.',
  },
  {
    title: 'Integrity',
    description: 'Honest consultations, transparent pricing, and products we truly believe in.',
  },
  {
    title: 'Inclusivity',
    description: 'Beauty has no boundaries — our salon welcomes everyone with open arms.',
  },
];

export default function AboutPage() {
  return (
    <ClientProviders>
    <section className="py-20 pt-36">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h1 className="font-heading text-4xl font-bold text-secondary md:text-5xl">
            About Glamour Studio
          </h1>
          <p className="mt-4 text-lg text-text-light">
            Where passion meets precision
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-12">
          <div>
            <h2 className="font-heading text-3xl font-bold text-secondary">Our Story</h2>
            <p className="mt-4 leading-relaxed text-text-light">
              Founded over {BUSINESS_DATA.stats[1].value} years ago, {SITE_CONFIG.name} began with a
              simple vision — to create a sanctuary where beauty and self-care are celebrated. What
              started as a small studio has grown into one of New York&apos;s most trusted names in
              beauty, serving over {BUSINESS_DATA.stats[0].value.toLocaleString()} happy clients
              and counting.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-3xl font-bold text-secondary">Our Mission</h2>
            <p className="mt-4 leading-relaxed text-text-light">
              To empower every individual who walks through our doors with confidence, using
              expert artistry, premium products, and an unwavering commitment to quality. We believe
              that everyone deserves to feel beautiful, and our mission is to make that happen — one
              appointment at a time.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-3xl font-bold text-secondary">Our Values</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-xl border border-primary/20 bg-background-alt p-6"
                >
                  <h3 className="font-heading text-xl font-semibold text-primary">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-light">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-heading text-3xl font-bold text-secondary">
              {BUSINESS_DATA.stats[2].value}+ Expert Stylists
            </h2>
            <p className="mt-4 leading-relaxed text-text-light">
              Our team of over {BUSINESS_DATA.stats[2].value} skilled professionals brings
              {BUSINESS_DATA.stats[1].value}+ years of combined experience. Each stylist is
              {BUSINESS_DATA.certifications[0].toLowerCase()} and receives ongoing training to stay
              at the forefront of the beauty industry.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {BUSINESS_DATA.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-4xl font-bold text-primary">
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="mt-2 text-sm text-text-light">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </ClientProviders>
  );
}
