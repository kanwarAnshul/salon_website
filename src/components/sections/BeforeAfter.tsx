'use client';

import { useState, useRef, MouseEvent, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Badge } from '@/components/ui/Badge';

const CompareSlider = ({ before, after }: { before: string; after: string }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (containerRef.current && isDragging.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setSliderPosition((x / rect.width) * 100);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/3] sm:aspect-[16/9] select-none touch-pan-y cursor-ew-resize"
      onMouseDown={() => (isDragging.current = true)}
      onMouseUp={() => (isDragging.current = false)}
      onMouseLeave={() => (isDragging.current = false)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchStart={() => (isDragging.current = true)}
      onTouchEnd={() => (isDragging.current = false)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover pointer-events-none" draggable={false} />
      <img 
        src={before} 
        alt="Before" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }} 
        draggable={false} 
      />
      <div 
        className="absolute top-0 bottom-0 w-1 bg-primary pointer-events-none flex items-center justify-center z-10"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="w-8 h-8 bg-primary rounded-full shadow-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-background transform -rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded">Before</div>
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded">After</div>
    </div>
  );
};

const beforeAfterData = [
  {
    id: 'hair-color-1',
    before: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1595476108010-b4d1f10d5e42?w=800&q=80',
    title: 'Color Transformation',
    category: 'Hair Coloring',
    description: 'Complete color makeover with balayage highlights',
  },
  {
    id: 'hair-cut-1',
    before: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1560015534-cee980ba7e13?w=800&q=80',
    title: 'Modern Shag Cut',
    category: 'Hair Styling',
    description: 'From long and heavy to a trendy layered shag',
  },
  {
    id: 'facial-1',
    before: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&q=80',
    title: 'Skin Revival',
    category: 'Skin Care',
    description: 'Deep cleansing facial with instant glow results',
  },
  {
    id: 'beard-1',
    before: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80',
    title: 'Beard Sculpting',
    category: "Men's Grooming",
    description: 'Precision beard shaping and conditioning treatment',
  },
  {
    id: 'bridal-1',
    before: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?w=800&q=80',
    title: 'Bridal Glam',
    category: 'Bridal Makeup',
    description: 'Complete bridal makeover with HD makeup',
  },
  {
    id: 'nail-1',
    before: 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
    title: 'Nail Art Design',
    category: 'Nail Services',
    description: 'Custom gel extensions with intricate nail art',
  },
];

const categories = ['All', 'Hair Coloring', 'Hair Styling', 'Skin Care', "Men's Grooming", 'Bridal Makeup', 'Nail Services'];

export default function BeforeAfter() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(beforeAfterData[0]);

  const filteredItems = activeCategory === 'All'
    ? beforeAfterData
    : beforeAfterData.filter((item) => item.category === activeCategory);

  return (
    <section className="py-20 glass">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="primary" className="mb-4">Transformations</Badge>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Before & <span className="text-gradient">After</span>
            </h2>
            <p className="text-text-light max-w-2xl mx-auto">
              See the incredible transformations our expert stylists deliver every day.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex gap-2 mb-10 overflow-x-auto pb-2 justify-start sm:justify-center scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  const newFiltered = category === 'All' ? beforeAfterData : beforeAfterData.filter((item) => item.category === category);
                  if (newFiltered.length > 0) {
                    setSelectedItem(newFiltered[0]);
                  }
                }}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeCategory === category
                    ? 'bg-primary text-foreground'
                    : 'bg-background text-text-light hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8">
          <ScrollReveal delay={0.2} className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-background-alt">
              <CompareSlider 
                key={selectedItem.id}
                before={selectedItem.before}
                after={selectedItem.after}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="font-heading text-2xl font-bold text-white mb-2">{selectedItem.title}</h3>
                <p className="text-white/70 text-sm">{selectedItem.description}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="space-y-3">
              <AnimatePresence mode="wait">
                {filteredItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedItem(item)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                      selectedItem.id === item.id
                        ? 'bg-primary/10 border-2 border-primary'
                        : 'bg-background border-2 border-transparent hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-primary/10 flex-shrink-0">
                        <img
                          src={item.after}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                        <p className="text-xs text-text-light">{item.category}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
