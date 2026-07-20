'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { teamMembers } from '@/data/team';
import { Star, ExternalLink } from 'lucide-react';

export default function Team() {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  return (
    <section className="py-20 bg-background-alt">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="primary" className="mb-4">Our Team</Badge>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
              Meet Our <span className="text-gradient">Experts</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Our team of skilled professionals brings years of experience and passion to every service.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <ScrollReveal key={member.id} delay={index * 0.1}>
              <motion.div
                onHoverStart={() => setHoveredMember(member.id)}
                onHoverEnd={() => setHoveredMember(null)}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative bg-[#2D2D2D] rounded-2xl overflow-hidden border border-white/10 group"
              >
                <div className="relative h-72 bg-gradient-to-br from-primary/20 to-accent-pink/10 overflow-hidden">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-4xl font-heading font-bold text-primary">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                  )}

                  <AnimatePresence>
                    {hoveredMember === member.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute inset-0 bg-background-alt/95 p-6 flex flex-col justify-center"
                      >
                        <p className="text-white/80 text-sm leading-relaxed mb-4">{member.bio}</p>
                        <div className="flex flex-wrap gap-2">
                          {member.specialties.map((specialty) => (
                            <span
                              key={specialty}
                              className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-xl font-bold text-white">{member.name}</h3>
                    {member.social?.instagram && (
                      <a
                        href={`https://instagram.com/${member.social.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-primary transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                      </a>
                    )}
                  </div>
                  <p className="text-primary text-sm font-medium mb-3">{member.role}</p>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(member.rating)
                              ? 'fill-[#C9A962] text-primary'
                              : 'text-white/20'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-white/60 text-sm">
                      {member.rating} ({member.reviewCount} reviews)
                    </span>
                  </div>

                  <Button variant="primary" size="sm" className="w-full">
                    Book with {member.name.split(' ')[0]}
                  </Button>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
