'use client';

import { ReactLenis } from 'lenis/react';
import { useEffect, useRef, useState } from 'react';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
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

    async function initGSAP() {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      let rafId: number;
      function raf(time: number) {
        lenisRef.current?.lenis?.raf(time);
        ScrollTrigger.update();
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
      };
    }

    const cleanupPromise = initGSAP();
    const currentLenis = lenisRef.current?.lenis;

    return () => {
      cancelled = true;
      cleanupPromise.then((cleanup) => cleanup?.());
      currentLenis?.destroy();
    };
  }, [mounted]);

  if (!mounted) {
    return <>{children}</>;
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
      {children}
    </ReactLenis>
  );
}
