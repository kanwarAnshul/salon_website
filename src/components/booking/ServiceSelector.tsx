'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { cn, formatPrice, formatDuration } from '@/lib/utils';
import { services } from '@/data/services';
import type { Service, ServiceCategory } from '@/types';

interface ServiceSelectorProps {
  selected: string;
  onSelect: (serviceId: string) => void;
}

const categories: { label: string; value: ServiceCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Hair', value: 'hair' },
  { label: 'Skin', value: 'skin' },
  { label: 'Nails', value: 'nails' },
  { label: 'Makeup', value: 'makeup' },
  { label: 'Spa', value: 'spa' },
  { label: 'Bridal', value: 'bridal' },
  { label: 'Men\'s', value: 'mens' },
];

const categoryColors: Record<ServiceCategory, string> = {
  hair: 'from-amber-500/20 to-orange-600/20',
  skin: 'from-rose-400/20 to-pink-500/20',
  nails: 'from-purple-400/20 to-violet-500/20',
  makeup: 'from-fuchsia-400/20 to-pink-400/20',
  spa: 'from-teal-400/20 to-cyan-500/20',
  bridal: 'from-yellow-300/20 to-amber-400/20',
  mens: 'from-blue-400/20 to-indigo-500/20',
};

export function ServiceSelector({ selected, onSelect }: ServiceSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');

  const filteredServices =
    activeCategory === 'all'
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Select a Service</h2>
        <p className="text-white/50">Choose the service you&apos;d like to book</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer',
              activeCategory === cat.value
                ? 'bg-primary text-foreground'
                : 'glass/5 text-white/60 hover:glass/10 hover:text-white',
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isSelected={selected === service.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

function ServiceCard({
  service,
  isSelected,
  onSelect,
}: {
  service: Service;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(service.id)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative flex items-start gap-4 p-4 rounded-xl text-left transition-all duration-200 cursor-pointer w-full',
        'border',
        isSelected
          ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(201,169,98,0.15)]'
          : 'glass/5 border-white/10 hover:border-white/20 hover:glass/[0.07]',
      )}
    >
      <div
        className={cn(
          'flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br flex items-center justify-center text-xl',
          categoryColors[service.category],
        )}
      >
        {service.category === 'hair' && '💇'}
        {service.category === 'skin' && '✨'}
        {service.category === 'nails' && '💅'}
        {service.category === 'makeup' && '💄'}
        {service.category === 'spa' && '🧖'}
        {service.category === 'bridal' && '👰'}
        {service.category === 'mens' && '🧔'}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-white truncate">{service.name}</h3>
          {service.popular && (
            <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary px-1.5 py-0.5 rounded">
              Popular
            </span>
          )}
        </div>
        <p className="text-sm text-white/40 mt-0.5 line-clamp-1">{service.description}</p>
        <div className="flex items-center gap-3 mt-2 text-sm">
          <span className="text-primary font-semibold">{formatPrice(service.price)}</span>
          <span className="text-white/30">|</span>
          <span className="text-white/50">{formatDuration(service.duration)}</span>
        </div>
      </div>

      {isSelected && (
        <motion.div
          layoutId="service-check"
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="3">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
}
