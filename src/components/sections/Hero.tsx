'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/constants';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const springConfig = { stiffness: 100, damping: 30, bounce: 0 };
  const parallaxX = useSpring(mouseX, springConfig);
  const parallaxY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 40;
      const y = (e.clientY / innerHeight - 0.5) * 40;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      {/* Background Image with Parallax & Overlay */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=2000")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </motion.div>

      {/* Floating Accent Orbs */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute top-1/4 left-[15%] w-72 h-72 rounded-full bg-primary/10 blur-[100px] pointer-events-none z-0"
      />
      <motion.div
        style={{
          x: useSpring(mouseX, { stiffness: 80, damping: 25 }),
          y: useSpring(mouseY, { stiffness: 80, damping: 25 }),
        }}
        className="absolute bottom-1/4 right-[10%] w-96 h-96 rounded-full bg-primary-dark/10 blur-[120px] pointer-events-none z-0"
      />

      <motion.div style={{ y: textY, opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass border-primary/20 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-primary tracking-wide uppercase">{SITE_CONFIG.tagline}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] mb-6 text-foreground"
            >
              Master the Art of <br />
              <span className="text-gradient italic pr-4">Refinement</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-text-light mb-10 max-w-lg mx-auto lg:mx-0 font-light"
            >
              Experience the pinnacle of luxury grooming. Where visionary artistry meets exceptional service in a haven of tranquility.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
            >
              <Button variant="primary" size="lg" className="px-8 hover:shadow-glow transition-all duration-300">
                Book Appointment
              </Button>
              <Button variant="outline" size="lg" className="px-8 border-primary/30 hover:border-primary text-foreground transition-all duration-300 bg-background/50 backdrop-blur-sm">
                Explore Services
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-16 flex items-center gap-10 justify-center lg:justify-start border-t border-white/5 pt-8"
            >
              {[
                { value: '5000+', label: 'Happy Clients' },
                { value: '15+', label: 'Years Exp.' },
                { value: '4.9/5', label: 'Client Rating' },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-foreground font-heading">{stat.value}</div>
                  <div className="text-xs text-text-light uppercase tracking-widest mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block lg:col-span-5 relative"
          >
            <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden glass p-2 border-white/10">
              <div className="absolute inset-0 rounded-[1.75rem] overflow-hidden m-2">
                <img 
                  src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=1000" 
                  alt="Premium Salon Experience"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              </div>
              
              {/* Badge Overlay */}
              <div className="absolute bottom-8 left-8 right-8 glass rounded-2xl p-6 border-white/10 backdrop-blur-md flex items-center gap-4 hover:border-primary/30 transition-colors duration-300">
                 <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                 </div>
                 <div>
                   <p className="text-foreground font-heading text-lg font-semibold">Premium Salon</p>
                   <p className="text-text-light text-sm">Award-winning stylists</p>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <span className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-primary/40 flex justify-center pt-1.5"
        >
          <motion.div className="w-1 h-1.5 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
