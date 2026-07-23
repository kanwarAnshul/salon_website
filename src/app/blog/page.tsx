import type { Metadata } from 'next';
import ClientProviders from '@/components/providers/ClientProviders';
import BlogSection from '@/components/sections/BlogSection';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Stay updated with the latest beauty tips, trends, hair care advice, and salon news from Glamour Studio.',
};

export default function BlogPage() {
  return (
    <ClientProviders>
      <section className="py-20 pt-36">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="font-heading text-4xl font-bold text-secondary md:text-5xl">
              Our Blog
            </h1>
            <p className="mt-4 text-lg text-text-light">
              Tips, trends, and insights from the world of beauty
            </p>
          </div>
          <BlogSection />
        </div>
      </section>
    </ClientProviders>
  );
}
