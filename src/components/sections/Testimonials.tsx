'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Badge } from '@/components/ui/Badge';
import { testimonials } from '@/data/testimonials';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default function Testimonials() {
  const swiperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const swiperInstanceRef = useRef<{ destroy: () => void; slidePrev: () => void; slideNext: () => void } | null>(null);

  useEffect(() => {
    let SwiperClass: new (el: HTMLElement, config: Record<string, unknown>) => { destroy: () => void; slidePrev: () => void; slideNext: () => void };

    const initSwiper = async () => {
      const swiperModule = await import('swiper');
      const { Autoplay, Pagination, EffectCoverflow } = await import('swiper/modules');
      SwiperClass = swiperModule.default as unknown as new (el: HTMLElement, config: Record<string, unknown>) => { destroy: () => void; slidePrev: () => void; slideNext: () => void };

      swiperModule.default.use([Autoplay, Pagination, EffectCoverflow]);

      if (swiperRef.current && !swiperInstanceRef.current) {
        swiperInstanceRef.current = new SwiperClass(swiperRef.current, {
          modules: [Autoplay, Pagination, EffectCoverflow],
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          effect: 'coverflow',
          coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
          },
          breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          },
        });
      }
    };

    initSwiper();

    return () => {
      swiperInstanceRef.current?.destroy();
      swiperInstanceRef.current = null;
    };
  }, []);

  const handlePrev = () => {
    swiperInstanceRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperInstanceRef.current?.slideNext();
  };

  const getSourceBadge = (source?: string) => {
    const badges = {
      google: { label: 'Google', color: 'bg-[#4285F4]/15 text-[#4285F4]' },
      facebook: { label: 'Facebook', color: 'bg-[#1877F2]/15 text-[#1877F2]' },
      yelp: { label: 'Yelp', color: 'bg-[#FF1A1A]/15 text-[#FF1A1A]' },
    };
    return source ? badges[source as keyof typeof badges] : null;
  };

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="primary" className="mb-4">Testimonials</Badge>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
              What Our <span className="text-gradient">Clients</span> Say
            </h2>
            <p className="text-text-light max-w-2xl mx-auto">
              Don&apos;t just take our word for it — hear from our satisfied clients about their experience.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="relative">
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full glass shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer hidden md:flex"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full glass shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer hidden md:flex"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div ref={swiperRef} className="swiper">
              <div className="swiper-wrapper">
                {testimonials.map((testimonial) => {
                  const sourceBadge = getSourceBadge(testimonial.source);

                  return (
                    <div key={testimonial.id} className="swiper-slide">
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="glass rounded-2xl p-8 shadow-lg shadow-black/5 border border-primary/10 h-full"
                      >
                        <div className="flex items-center gap-0.5 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  i < testimonial.rating
                                    ? 'fill-[#C9A962] text-primary'
                                    : 'text-gray-200'
                                }`}
                              />
                            </motion.div>
                          ))}
                        </div>

                        <p className="text-foreground text-lg leading-relaxed mb-6 italic">
                          &ldquo;{testimonial.text}&rdquo;
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent-pink flex items-center justify-center overflow-hidden">
                              <img
                                src={testimonial.avatar}
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.parentElement!.innerHTML = `<span class="text-foreground font-bold text-lg">${testimonial.name.split(' ').map(n => n[0]).join('')}</span>`;
                                }}
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                              <p className="text-sm text-text-light">{testimonial.service}</p>
                            </div>
                          </div>

                          {sourceBadge && (
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${sourceBadge.color}`}>
                              {sourceBadge.label}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
              <div className="swiper-pagination mt-8" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
