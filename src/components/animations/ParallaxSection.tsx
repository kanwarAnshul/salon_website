'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

type ParallaxDirection = 'up' | 'down' | 'left' | 'right';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  direction?: ParallaxDirection;
  className?: string;
  as?: 'section' | 'div';
}

const directionMap: Record<ParallaxDirection, string> = {
  up: 'y',
  down: 'y',
  left: 'x',
  right: 'x',
};

const signMap: Record<ParallaxDirection, number> = {
  up: -1,
  down: 1,
  left: -1,
  right: 1,
};

export function ParallaxSection({
  children,
  speed = 0.3,
  direction = 'up',
  className = '',
  as: Tag = 'section',
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const axis = directionMap[direction];
  const sign = signMap[direction];
  const offset = speed * 100;

  const value = useTransform(
    scrollYProgress,
    [0, 1],
    [sign * offset, sign * -offset]
  );

  return (
    <Tag ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        style={axis === 'y' ? { y: value } : { x: value }}
      >
        {children}
      </motion.div>
    </Tag>
  );
}
