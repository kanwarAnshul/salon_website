'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, X } from 'lucide-react';

export default function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative z-[60] w-full bg-gradient-to-r from-amber-500/90 via-amber-400/90 to-yellow-500/90 backdrop-blur-sm border-b border-amber-300/30"
        >
          <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-black/10">
                  <Info className="h-4 w-4 text-black/80" />
                </div>
                <p className="text-sm font-medium text-black/90 leading-snug">
                  <span className="font-bold">⚠️ Demo Portfolio Website</span>
                  <span className="hidden sm:inline">
                    {' '}— This website is created for portfolio demonstration purposes only.{' '}
                    <span className="font-semibold">All information, services, prices, team members, and contact details shown are entirely fictional dummy data.</span>
                  </span>
                  <span className="sm:hidden">
                    {' '}— All information is fictional dummy data.
                  </span>
                </p>
              </div>
              <button
                onClick={() => setDismissed(true)}
                className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
                aria-label="Dismiss banner"
              >
                <X className="h-4 w-4 text-black/80" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
