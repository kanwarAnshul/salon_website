'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { services } from '@/data/services';
import { GENDER_FILTERS } from '@/lib/constants';
import { Clock, DollarSign } from 'lucide-react';

export default function Services() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredServices = activeFilter === 'all'
    ? services
    : services.filter(
        (s) => s.gender === activeFilter || (activeFilter !== 'women' && activeFilter !== 'men' && s.gender === 'unisex'),
      );

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-6 bg-primary/10 text-primary border-primary/20 backdrop-blur-md">Our Expertise</Badge>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              <span className="text-gradient italic pr-2">Signature</span> Services
            </h2>
            <p className="text-text-light max-w-2xl mx-auto text-lg font-light">
              Elevate your style with our curated selection of premium grooming and beauty treatments, tailored to perfection.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {GENDER_FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeFilter === filter.id
                    ? 'bg-primary text-background shadow-lg shadow-primary/25 scale-105'
                    : 'glass text-text-light hover:text-primary hover:border-primary/30 hover:bg-primary/5'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredServices.map((service, index) => (
              <ScrollReveal key={service.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="relative glass rounded-[2rem] overflow-hidden group hover:border-primary/40 transition-colors duration-500"
                >
                  {service.popular && (
                    <div className="absolute top-5 right-5 z-20">
                      <Badge variant="warning" className="bg-background/80 backdrop-blur-md text-primary border-primary/30">Most Popular</Badge>
                    </div>
                  )}

                  <div className="relative h-64 bg-background-alt overflow-hidden">
                    {/* Placeholder image for services, ideally driven by service data */}
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-70"
                         style={{ backgroundImage: `url("${service.image}")` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-20 h-20 rounded-full glass border-primary/30 flex items-center justify-center">
                        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 relative">
                    <div className="absolute -top-10 left-8 w-16 h-16 rounded-2xl glass border-primary/20 flex items-center justify-center bg-background/50 backdrop-blur-xl">
                       <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                    </div>

                    <h3 className="font-heading text-2xl font-bold text-foreground mb-3 mt-4 group-hover:text-primary transition-colors duration-300">{service.name}</h3>
                    <p className="text-text-light mb-6 line-clamp-2 font-light leading-relaxed">{service.description}</p>

                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/5">
                      <div className="flex items-center gap-2 text-primary">
                        <DollarSign className="w-5 h-5 opacity-80" />
                        <span className="font-semibold text-lg">{service.price}</span>
                      </div>
                      <div className="flex items-center gap-2 text-text-muted">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">{service.duration} min</span>
                      </div>
                    </div>

                    {service.features && (
                      <div className="mb-8">
                        <div className="flex flex-wrap gap-2">
                          {service.features.slice(0, 3).map((feature) => (
                            <span
                              key={feature}
                              className="text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/5 text-text-light font-medium"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button variant="primary" size="lg" className="w-full group-hover:shadow-glow transition-all duration-300">
                      Reserve Appointment
                    </Button>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </motion.div>
        </AnimatePresence>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-16">
            <Button variant="outline" size="lg" className="px-10 border-primary/30 glass">
              Discover All Services
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
