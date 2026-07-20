'use client';

import { motion } from 'motion/react';
import { Gem } from 'lucide-react';

export default function DemoBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 3, duration: 0.5 }}
      className="fixed top-24 right-0 z-50"
    >
      <div className="flex items-center gap-2 rounded-l-full bg-gradient-to-r from-primary to-primary/80 px-4 py-2 shadow-lg shadow-primary/20">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Gem className="h-3.5 w-3.5 text-foreground" />
        </motion.div>
        <span className="text-xs font-bold tracking-wide text-foreground">
          Portfolio Demo
        </span>
      </div>
    </motion.div>
  );
}
