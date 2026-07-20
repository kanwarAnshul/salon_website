'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { teamMembers } from '@/data/team';
import { getInitials } from '@/lib/utils';
import type { TeamMember } from '@/types';

interface StylistSelectorProps {
  selected: string;
  onSelect: (stylistId: string) => void;
}

export function StylistSelector({ selected, onSelect }: StylistSelectorProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Choose Your Stylist</h2>
        <p className="text-white/50">Select a preferred stylist or let us match you</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnyStylistCard
          isSelected={selected === 'any'}
          onSelect={() => onSelect('any')}
        />
        {teamMembers.map((member) => (
          <StylistCard
            key={member.id}
            member={member}
            isSelected={selected === member.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

function AnyStylistCard({
  isSelected,
  onSelect,
}: {
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative flex flex-col items-center justify-center p-6 rounded-xl text-center transition-all duration-200 cursor-pointer min-h-[220px]',
        'border',
        isSelected
          ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(201,169,98,0.15)]'
          : 'glass/5 border-white/10 hover:border-white/20 hover:glass/[0.07]',
      )}
    >
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center mb-3">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A962" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </div>
      <h3 className="font-semibold text-white">Any Available</h3>
      <p className="text-sm text-white/40 mt-1">
        We&apos;ll match you with the next available stylist
      </p>

      {isSelected && (
        <motion.div
          layoutId="stylist-check"
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="3">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
}

function StylistCard({
  member,
  isSelected,
  onSelect,
}: {
  member: TeamMember;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(member.id)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative flex flex-col items-center p-6 rounded-xl text-center transition-all duration-200 cursor-pointer',
        'border',
        isSelected
          ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(201,169,98,0.15)]'
          : 'glass/5 border-white/10 hover:border-white/20 hover:glass/[0.07]',
      )}
    >
      <div className="w-16 h-16 rounded-full glass/10 flex items-center justify-center text-lg font-bold text-primary mb-3 overflow-hidden">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        ) : (
          getInitials(member.name)
        )}
      </div>

      <h3 className="font-semibold text-white">{member.name}</h3>
      <p className="text-sm text-primary/80 mt-0.5">{member.role}</p>

      <div className="flex items-center gap-1 mt-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#C9A962" stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <span className="text-sm font-medium text-white">{member.rating}</span>
        <span className="text-xs text-white/30">({member.reviewCount})</span>
      </div>

      <div className="flex flex-wrap justify-center gap-1.5 mt-3">
        {member.specialties.slice(0, 3).map((spec) => (
          <span
            key={spec}
            className="text-[10px] font-medium uppercase tracking-wider glass/5 text-white/50 px-2 py-0.5 rounded-full"
          >
            {spec}
          </span>
        ))}
      </div>

      {isSelected && (
        <motion.div
          layoutId="stylist-check"
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="3">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
}
