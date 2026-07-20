'use client';

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { cn, generateTimeSlots } from '@/lib/utils';

interface DateTimePickerProps {
  selectedDate: string;
  selectedTime: string;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function formatDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

const timeSlots = generateTimeSlots(9, 20, 30);

const unavailableSlots: Record<string, string[]> = {
  '2026-07-20': ['10:00', '10:30', '14:00', '14:30'],
  '2026-07-21': ['09:00', '09:30', '11:00', '16:00', '16:30'],
  '2026-07-22': ['13:00', '13:30', '15:00', '15:30', '17:00'],
  '2026-07-25': ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30'],
};

function formatTimeDisplay(time: string) {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

export function DateTimePicker({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}: DateTimePickerProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }, [firstDay, daysInMonth]);

  const isPastDay = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayStart;
  };

  const isSunday = (day: number) => {
    return new Date(currentYear, currentMonth, day).getDay() === 0;
  };

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const dateKey = selectedDate;
  const unavailable = dateKey ? unavailableSlots[dateKey] || [] : [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Pick Date & Time</h2>
        <p className="text-white/50">Select your preferred appointment date and time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass/5 rounded-xl border border-white/10 p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={goToPrevMonth}
              className="p-2 rounded-lg hover:glass/10 text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <h3 className="font-semibold text-white">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </h3>
            <button
              type="button"
              onClick={goToNextMonth}
              className="p-2 rounded-lg hover:glass/10 text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAY_NAMES.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-white/30 py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} />;

              const dateKey = formatDateKey(currentYear, currentMonth, day);
              const disabled = isPastDay(day) || isSunday(day);
              const isSelected = selectedDate === dateKey;
              const isToday =
                day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear();

              return (
                <button
                  key={dateKey}
                  type="button"
                  disabled={disabled}
                  onClick={() => onDateSelect(dateKey)}
                  className={cn(
                    'relative aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer',
                    disabled && 'opacity-25 cursor-not-allowed',
                    !disabled && !isSelected && 'hover:glass/10 text-white/70',
                    isSelected && 'bg-primary text-foreground shadow-[0_0_12px_rgba(201,169,98,0.4)]',
                    isToday && !isSelected && 'ring-1 ring-[#C9A962]/50',
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        <div className="glass/5 rounded-xl border border-white/10 p-4">
          <h3 className="text-sm font-medium text-white/60 mb-3">
            {selectedDate
              ? `Available times for ${new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}`
              : 'Select a date first'}
          </h3>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {timeSlots.map((time) => {
              const isUnavailable = unavailable.includes(time);
              const isSelected = selectedTime === time;

              return (
                <button
                  key={time}
                  type="button"
                  disabled={isUnavailable || !selectedDate}
                  onClick={() => onTimeSelect(time)}
                  className={cn(
                    'px-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer',
                    isUnavailable && 'glass/5 text-white/15 cursor-not-allowed line-through',
                    !isUnavailable && !isSelected && 'glass/5 text-white/70 hover:glass/10 hover:text-white',
                    isSelected && 'bg-primary text-foreground shadow-[0_0_12px_rgba(201,169,98,0.4)]',
                    !selectedDate && 'opacity-40 cursor-not-allowed',
                  )}
                >
                  {formatTimeDisplay(time)}
                </button>
              );
            })}
          </div>

          {selectedDate && selectedTime && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20"
            >
              <p className="text-sm text-white/60">Selected appointment:</p>
              <p className="text-primary font-semibold">
                {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}{' '}
                at {formatTimeDisplay(selectedTime)}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
