'use client';

import { ReactLenis } from 'lenis/react';
import { useEffect, useRef, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/common/Preloader';
import ScrollProgress from '@/components/common/ScrollProgress';
import FloatingBookButton from '@/components/common/FloatingBookButton';
import DemoBadge from '@/components/common/DemoBadge';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let cancelled = false;
    let rafId: number;

    async function init() {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      function raf(time: number) {
        lenisRef.current?.lenis?.raf(time);
        ScrollTrigger.update();
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    }

    init();

    const currentLenis = lenisRef.current?.lenis;

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      currentLenis?.destroy();
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <>
        <Preloader />
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-light border-t-primary" />
        </div>
      </>
    );
  }

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: false,
        smoothWheel: true,
        duration: 1.2,
      }}
    >
      <Preloader />
      <ScrollProgress />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingBookButton />
      <DemoBadge />
    </ReactLenis>
  );
}
