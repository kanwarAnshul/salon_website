'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { pricingPlans, membershipPlans } from '@/data/pricing';
import type { PricingPlan } from '@/types';
import { Check, Sparkles } from 'lucide-react';

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<'individual' | 'packages'>('individual');

  const plans = (activeTab === 'individual' ? pricingPlans : membershipPlans) as (PricingPlan & { description?: string; originalPrice?: number; badge?: string })[];

  return (
    <section className="py-20 glass">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="primary" className="mb-4">Pricing</Badge>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Our <span className="text-gradient">Pricing</span> Plans
            </h2>
            <p className="text-text-light max-w-2xl mx-auto">
              Choose from our individual services or value-packed packages designed to give you the best experience.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex justify-center mb-12">
            <div className="inline-flex flex-col sm:flex-row bg-background rounded-2xl sm:rounded-full p-1.5 w-full max-w-xs sm:max-w-none sm:w-auto">
              <button
                onClick={() => setActiveTab('individual')}
                className={`px-5 sm:px-8 py-3 rounded-xl sm:rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === 'individual'
                    ? 'bg-primary text-foreground shadow-lg shadow-primary/25'
                    : 'text-text-light hover:text-primary'
                }`}
              >
                Individual Services
              </button>
              <button
                onClick={() => setActiveTab('packages')}
                className={`px-5 sm:px-8 py-3 rounded-xl sm:rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === 'packages'
                    ? 'bg-primary text-foreground shadow-lg shadow-primary/25'
                    : 'text-text-light hover:text-primary'
                }`}
              >
                Packages &amp; Membership
              </button>
            </div>
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {plans.map((plan, index) => (
              <ScrollReveal key={plan.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`relative glass rounded-2xl overflow-hidden shadow-xl border-2 transition-all duration-300 ${
                    plan.popular
                      ? 'border-primary shadow-primary/20'
                      : 'border-[#F8F8F8] hover:border-primary/30'
                  }`}
                >
                  {plan.popular && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, type: 'spring' }}
                      className="absolute -top-1 left-1/2 -translate-x-1/2"
                    >
                      <div className="flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-primary to-accent-pink rounded-b-xl text-sm font-bold text-foreground">
                        <Sparkles className="w-4 h-4" />
                        {plan.badge || 'Most Popular'}
                      </div>
                    </motion.div>
                  )}

                  {plan.badge && !plan.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="warning">{plan.badge}</Badge>
                    </div>
                  )}

                  <div className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                    <p className="text-sm text-text-light mb-6">{plan.description}</p>

                    <div className="flex items-baseline gap-2 mb-8">
                      <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                      {plan.originalPrice && (
                        <span className="text-lg text-text-muted line-through">${plan.originalPrice}</span>
                      )}
                      <span className="text-sm text-text-light">/{plan.period}</span>
                    </div>

                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature: string) => (
                        <div key={feature} className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            plan.popular ? 'bg-primary/20' : 'bg-background'
                          }`}>
                            <Check className={`w-3 h-3 ${plan.popular ? 'text-primary' : 'text-text-light'}`} />
                          </div>
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant={plan.popular ? 'primary' : 'outline'}
                      size="lg"
                      className="w-full"
                    >
                      Get Started
                    </Button>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
