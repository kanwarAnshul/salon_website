'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] lg:hidden"
        >
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute right-0 top-0 h-full w-full max-w-sm bg-background-alt/95 backdrop-blur-xl border-l border-white/5"
          >
            <div className="flex flex-col h-full">
              {/* Close Button */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <span className="font-heading text-xl font-bold text-primary">Menu</span>
                <button
                  onClick={onClose}
                  className="flex items-center justify-center w-10 h-10 rounded-full glass/10 text-white transition-colors hover:glass/20"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-6 px-6">
                <div className="flex flex-col gap-1">
                  {NAV_LINKS.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="flex items-center py-3 px-4 text-lg font-medium text-white/70 transition-all duration-300 hover:text-white hover:glass/5 rounded-lg"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* CTA Button */}
              <div className="p-6 border-t border-white/5">
                <Link
                  href="/booking"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-primary px-6 py-3 text-base font-semibold text-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
