'use client';

import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export default function FloatingBookButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link
        href="/booking"
        className="group relative flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
      >
        {/* Pulse Glow */}
        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />

        <Calendar className="h-4 w-4 relative z-10" />
        <span className="relative z-10">Book Now</span>
      </Link>
    </motion.div>
  );
}
