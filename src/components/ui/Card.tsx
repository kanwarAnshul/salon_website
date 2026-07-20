'use client';

import { type ReactNode } from 'react';
import { motion, type HTMLMotionProps, type TargetAndTransition } from 'motion/react';
import { cn } from '@/lib/utils';

type HoverEffect = 'lift' | 'glow' | 'tilt' | 'none';

interface CardProps extends HTMLMotionProps<'div'> {
  hoverEffect?: HoverEffect;
  children: ReactNode;
}

const hoverVariants: Record<Exclude<HoverEffect, 'none'>, TargetAndTransition> = {
  lift: {
    y: -6,
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
  },
  glow: {
    boxShadow: '0 0 30px rgba(201,169,98,0.3)',
  },
  tilt: {
    rotateX: 4,
    rotateY: -4,
  },
};

function Card({
  hoverEffect = 'lift',
  children,
  className,
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={hoverEffect !== 'none' ? hoverVariants[hoverEffect] : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'rounded-2xl bg-background-alt border border-white/10 overflow-hidden',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

function CardImage({ src, alt, className, ...props }: CardImageProps) {
  return (
    <div className={cn('overflow-hidden', className)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        {...props}
      />
    </div>
  );
}

function CardHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('px-6 pt-6 pb-2', className)}>{children}</div>
  );
}

function CardContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('px-6 py-2', className)}>{children}</div>
  );
}

function CardFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'px-6 pb-6 pt-2 border-t border-white/10',
        className,
      )}
    >
      {children}
    </div>
  );
}

export {
  Card,
  CardImage,
  CardHeader,
  CardContent,
  CardFooter,
  type CardProps,
  type HoverEffect,
};
