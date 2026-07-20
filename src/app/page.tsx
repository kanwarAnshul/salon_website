import ClientProviders from '@/components/providers/ClientProviders';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import BeforeAfter from '@/components/sections/BeforeAfter';
import Team from '@/components/sections/Team';
import Testimonials from '@/components/sections/Testimonials';
import Pricing from '@/components/sections/Pricing';
import Gallery from '@/components/sections/Gallery';
import BlogSection from '@/components/sections/BlogSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <ClientProviders>
      <Hero />
      <Services />
      <BeforeAfter />
      <Team />
      <Testimonials />
      <Pricing />
      <Gallery />
      <BlogSection />
      <ContactSection />
    </ClientProviders>
  );
}
