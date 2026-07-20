'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { X } from 'lucide-react';

const galleryImages = [
  { id: '1', src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800', alt: 'Hair styling transformation', category: 'Hair' },
  { id: '2', src: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800', alt: 'Facial treatment results', category: 'Skin' },
  { id: '3', src: 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?auto=format&fit=crop&q=80&w=800', alt: 'Creative nail art design', category: 'Nails' },
  { id: '4', src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800', alt: 'Bridal makeup look', category: 'Bridal' },
  { id: '5', src: 'https://images.unsplash.com/photo-1595476108010-b4d1f10d5e42?auto=format&fit=crop&q=80&w=800', alt: 'Color transformation', category: 'Hair' },
  { id: '6', src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800', alt: 'Men\'s grooming style', category: "Men's" },
  { id: '7', src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800', alt: 'Spa treatment session', category: 'Spa' },
  { id: '8', src: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800', alt: 'Gel nail extensions', category: 'Nails' },
  { id: '9', src: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800', alt: 'Bridal hairstyling', category: 'Hair' },
];

const categories = ['All', 'Hair', 'Skin', 'Nails', 'Bridal', "Men's", 'Spa'];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <section className="py-24 bg-background-alt relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-6 bg-primary/10 text-primary border-primary/20 backdrop-blur-md">Gallery</Badge>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Our <span className="text-gradient italic pr-2">Portfolio</span>
            </h2>
            <p className="text-text-light max-w-2xl mx-auto text-lg font-light">
              Browse through our collection of stunning transformations and artistic creations.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeCategory === category
                    ? 'bg-primary text-background shadow-lg shadow-primary/25 scale-105'
                    : 'glass text-text-light hover:text-primary hover:border-primary/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            {filteredImages.map((image, index) => (
              <ScrollReveal key={image.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group shadow-lg shadow-black/20"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative aspect-[3/4] bg-background">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${image.src})` }}
                    />
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"
                    >
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <Badge variant="primary" className="mb-3 bg-primary/20 backdrop-blur-md">{image.category}</Badge>
                        <p className="text-foreground text-lg font-heading font-medium">{image.alt}</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <Modal open={!!selectedImage} onClose={() => setSelectedImage(null)} className="max-w-5xl bg-background border border-primary/20 p-1">
        {selectedImage && (
          <div className="bg-background rounded-2xl overflow-hidden relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full glass hover:bg-white/10 transition-colors cursor-pointer text-white"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative aspect-[4/3] w-full bg-background-alt">
              <div 
                className="absolute inset-0 bg-contain bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${selectedImage.src})` }}
              />
            </div>
            <div className="p-8 text-center glass border-t border-primary/10">
              <Badge variant="primary" className="mb-3">{selectedImage.category}</Badge>
              <h3 className="font-heading text-2xl font-bold text-foreground">{selectedImage.alt}</h3>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
