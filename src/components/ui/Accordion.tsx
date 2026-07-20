'use client';

import { type ReactNode, useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface AccordionContextValue {
  expandedIndex: number | null;
  setExpandedIndex: (index: number | null) => void;
}

const AccordionContext = createContext<AccordionContextValue>({
  expandedIndex: null,
  setExpandedIndex: () => {},
});

interface AccordionProps {
  children: ReactNode;
  className?: string;
  defaultExpanded?: number | null;
}

function Accordion({
  children,
  className,
  defaultExpanded = null,
}: AccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(defaultExpanded);

  return (
    <AccordionContext.Provider value={{ expandedIndex, setExpandedIndex }}>
      <div className={cn('divide-y divide-white/10', className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  index: number;
  children: ReactNode;
  className?: string;
}

function AccordionItem({ index, children, className }: AccordionItemProps) {
  const { expandedIndex, setExpandedIndex } = useContext(AccordionContext);
  const isOpen = expandedIndex === index;

  const toggle = () => setExpandedIndex(isOpen ? null : index);

  return (
    <div className={cn('py-0', className)}>
      <AccordionContext.Provider value={{ expandedIndex, setExpandedIndex }}>
        {typeof children === 'function'
          ? (children as (props: { isOpen: boolean; toggle: () => void }) => ReactNode)({ isOpen, toggle })
          : children}
      </AccordionContext.Provider>
    </div>
  );
}

function AccordionTrigger({
  children,
  isOpen,
  toggle,
  className,
}: {
  children: ReactNode;
  isOpen: boolean;
  toggle: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={toggle}
      className={cn(
        'flex w-full items-center justify-between py-4 text-left text-white/90 font-medium transition-colors hover:text-primary cursor-pointer',
        className,
      )}
      aria-expanded={isOpen}
    >
      {children}
      <motion.svg
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="shrink-0 text-primary"
      >
        <path d="M6 9l6 6 6-6" />
      </motion.svg>
    </button>
  );
}

function AccordionContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <AnimatePresence initial={false}>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className={cn('pb-4 text-white/60', className)}>
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, type AccordionProps };
