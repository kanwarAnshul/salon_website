import type { Metadata } from 'next';
import ClientProviders from '@/components/providers/ClientProviders';
import Gallery from '@/components/sections/Gallery';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Browse our portfolio of stunning hairstyles, makeup looks, spa transformations, and more at Glamour Studio.',
};

export default function GalleryPage() {
  return (
    <ClientProviders>
      <section className="py-20 pt-36">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="font-heading text-4xl font-bold text-secondary md:text-5xl">
              Our Gallery
            </h1>
            <p className="mt-4 text-lg text-text-light">
              A visual showcase of our artistry and craftsmanship
            </p>
          </div>
          <Gallery />
        </div>
      </section>
    </ClientProviders>
  );
}
