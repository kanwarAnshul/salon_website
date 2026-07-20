'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

type SplitMode = 'chars' | 'words' | 'lines';

interface TextAnimationProps {
  text: string;
  splitBy?: SplitMode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  once?: boolean;
  amount?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

function splitText(text: string, mode: SplitMode): string[] {
  if (mode === 'words') return text.split(' ');
  if (mode === 'lines') return text.split('\n');
  return text.split('');
}

const childVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

export function TextAnimation({
  text,
  splitBy = 'chars',
  className = '',
  delay = 0,
  staggerChildren = 0.03,
  once = true,
  amount = 0.2,
  as: Tag = 'span',
}: TextAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });
  const items = splitText(text, splitBy);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerChildren, delayChildren: delay } },
      }}
      className={className}
      aria-label={text}
    >
      <Tag aria-hidden="true">
        {items.map((item, index) => (
          <motion.span
            key={`${item}-${index}`}
            variants={childVariants}
            className="inline-block"
            style={splitBy === 'chars' && item === ' ' ? { width: '0.25em' } : undefined}
          >
            {splitBy === 'chars' && item === ' ' ? '\u00A0' : item}
            {splitBy === 'words' && index < items.length - 1 && '\u00A0'}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}
