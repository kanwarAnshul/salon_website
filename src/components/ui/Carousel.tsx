'use client';

import {
  forwardRef,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
  useImperativeHandle,
} from 'react';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';

type CarouselApi = UseEmblaCarouselType[1];

interface CarouselProps {
  children: ReactNode;
  className?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
}

const Carousel = forwardRef<CarouselApi, CarouselProps>(
  (
    {
      children,
      className,
      autoplay = false,
      autoplayDelay = 4000,
      loop = true,
      showArrows = true,
      showDots = true,
    },
    ref,
  ) => {
    const plugins = autoplay
      ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: true })]
      : [];

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop }, plugins);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollTo = useCallback(
      (index: number) => emblaApi?.scrollTo(index),
      [emblaApi],
    );

    const onInit = useCallback((api: CarouselApi) => {
      if (!api) return;
      setScrollSnaps(api.scrollSnapList());
    }, []);

    const onSelect = useCallback((api: CarouselApi) => {
      if (!api) return;
      setSelectedIndex(api.selectedScrollSnap());
    }, []);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    useEffect(() => {
      if (!emblaApi) return;
      
      const timeoutId = setTimeout(() => {
        onInit(emblaApi);
        onSelect(emblaApi);
      }, 0);
      
      emblaApi.on('reInit', onInit);
      emblaApi.on('select', onSelect);
      return () => {
        clearTimeout(timeoutId);
        emblaApi.off('reInit', onInit);
        emblaApi.off('select', onSelect);
      };
    }, [emblaApi, onInit, onSelect]);

    useImperativeHandle(ref, () => emblaApi as CarouselApi, [emblaApi]);

    return (
      <div className={cn('relative', className)}>
        <div ref={emblaRef} className="overflow-hidden rounded-xl">
          <div className="flex">
            {children}
          </div>
        </div>

        {showArrows && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background-alt/80 border border-white/10 flex items-center justify-center text-primary hover:bg-background-alt transition-colors cursor-pointer backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background-alt/80 border border-white/10 flex items-center justify-center text-primary hover:bg-background-alt transition-colors cursor-pointer backdrop-blur-sm"
              aria-label="Next slide"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        {showDots && scrollSnaps.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-200 cursor-pointer',
                  index === selectedIndex
                    ? 'bg-primary w-6'
                    : 'glass/30 hover:glass/50',
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);

function CarouselItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn('flex-[0_0_100%] min-w-0', className)}
    >
      {children}
    </div>
  );
}

Carousel.displayName = 'Carousel';

export { Carousel, CarouselItem, type CarouselProps, type CarouselApi };
