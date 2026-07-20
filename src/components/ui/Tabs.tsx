'use client';

import {
  type ReactNode,
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface TabsContextValue {
  activeTab: number;
  setActiveTab: (index: number) => void;
  tabCount: number;
  setTabCount: (count: number | ((prev: number) => number)) => void;
}

const TabsContext = createContext<TabsContextValue>({
  activeTab: 0,
  setActiveTab: () => {},
  tabCount: 0,
  setTabCount: () => 0,
});

interface TabsProps {
  children: ReactNode;
  defaultTab?: number;
  className?: string;
}

function Tabs({ children, defaultTab = 0, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [tabCount, setTabCount] = useState(0);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, tabCount, setTabCount }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={listRef}
      role="tablist"
      className={cn(
        'flex gap-1 border-b border-white/10 mb-4',
        className,
      )}
    >
      {children}
    </div>
  );
}

function Tab({
  index,
  children,
  className,
}: {
  index: number;
  children: ReactNode;
  className?: string;
}) {
  const { activeTab, setActiveTab, setTabCount } = useContext(TabsContext);
  const tabRef = useRef<HTMLButtonElement>(null);
  const isActive = activeTab === index;

  useEffect(() => {
    setTabCount((prev) => prev + 1);
    return () => setTabCount((prev) => prev - 1);
  }, [setTabCount]);

  return (
    <button
      ref={tabRef}
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(index)}
      className={cn(
        'relative px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer',
        isActive ? 'text-primary' : 'text-white/50 hover:text-white/80',
        className,
      )}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="tab-indicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </button>
  );
}

function TabPanel({
  index,
  children,
  className,
}: {
  index: number;
  children: ReactNode;
  className?: string;
}) {
  const { activeTab } = useContext(TabsContext);
  const isActive = activeTab === index;

  if (!isActive) return null;

  return (
    <motion.div
      role="tabpanel"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn('outline-none', className)}
    >
      {children}
    </motion.div>
  );
}

export { Tabs, TabList, Tab, TabPanel, type TabsProps };
