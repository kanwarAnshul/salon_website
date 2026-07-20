'use client';

import { motion } from 'motion/react';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-[#C9A962]/80 to-primary/60"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1, ease: 'linear' }}
      />
      <div
        className="absolute top-0 right-0 h-full w-8 blur-sm bg-primary/40"
        style={{ left: `calc(${progress}% - 2rem)` }}
      />
    </div>
  );
}
