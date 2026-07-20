'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { bookingSchema, type BookingInput } from '@/lib/validation-schemas';
import { useBooking } from '@/hooks/useBooking';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ServiceSelector } from './ServiceSelector';
import { StylistSelector } from './StylistSelector';
import { DateTimePicker } from './DateTimePicker';
import { ConfirmationModal } from './ConfirmationModal';
import type { BookingFormData } from '@/types';

const steps = [
  { id: 1, label: 'Service', icon: '💇' },
  { id: 2, label: 'Stylist', icon: '👤' },
  { id: 3, label: 'Date & Time', icon: '📅' },
  { id: 4, label: 'Details', icon: '✍️' },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
  }),
};

export function BookingForm() {
  const {
    currentStep,
    formData,
    isSubmitting,
    isComplete,
    nextStep,
    prevStep,
    updateFormData,
    submitBooking,
    resetBooking,
  } = useBooking();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: '',
      stylist: '',
      date: '',
      time: '',
      name: '',
      email: '',
      phone: '',
      notes: '',
    },
  });

  const watchedService = watch('service');
  const watchedStylist = watch('stylist');
  const watchedDate = watch('date');
  const watchedTime = watch('time');

  useEffect(() => {
    if (formData.service) setValue('service', formData.service);
    if (formData.stylist) setValue('stylist', formData.stylist);
    if (formData.date) setValue('date', formData.date);
    if (formData.time) setValue('time', formData.time);
  }, [formData, setValue]);

  const handleNext = async () => {
    let fieldsToValidate: (keyof BookingInput)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ['service'];
        break;
      case 2:
        fieldsToValidate = ['stylist'];
        break;
      case 3:
        fieldsToValidate = ['date', 'time'];
        break;
      case 4:
        fieldsToValidate = ['name', 'email', 'phone'];
        break;
    }

    const valid = await trigger(fieldsToValidate);
    if (!valid) return;

    const currentValues = {
      service: watch('service'),
      stylist: watch('stylist'),
      date: watch('date'),
      time: watch('time'),
      name: watch('name'),
      email: watch('email'),
      phone: watch('phone'),
      notes: watch('notes'),
    };
    updateFormData(currentValues);
    nextStep();
  };

  const handlePrev = () => {
    const currentValues = {
      service: watch('service'),
      stylist: watch('stylist'),
      date: watch('date'),
      time: watch('time'),
      name: watch('name'),
      email: watch('email'),
      phone: watch('phone'),
      notes: watch('notes'),
    };
    updateFormData(currentValues);
    prevStep();
  };

  const onSubmit = async (data: BookingInput) => {
    updateFormData(data);
    await submitBooking();
  };

  const direction = 1;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative mb-10">
        <div className="absolute top-5 left-0 right-0 h-0.5 glass/10">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative flex justify-between">
          {steps.map((step) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;

            return (
              <div key={step.id} className="flex flex-col items-center">
                <motion.div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 z-10',
                    isCompleted && 'bg-primary text-foreground',
                    isActive && 'bg-primary text-foreground shadow-[0_0_20px_rgba(201,169,98,0.4)]',
                    !isActive && !isCompleted && 'glass/10 text-white/40',
                  )}
                  animate={
                    isActive
                      ? { scale: [1, 1.1, 1] }
                      : {}
                  }
                  transition={{ duration: 0.3 }}
                >
                  {isCompleted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-base">{step.icon}</span>
                  )}
                </motion.div>
                <span
                  className={cn(
                    'mt-2 text-xs font-medium transition-colors duration-300',
                    isActive ? 'text-primary' : isCompleted ? 'text-white/70' : 'text-white/30',
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait" custom={direction}>
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <input type="hidden" {...register('service')} />
                <ServiceSelector
                  selected={watchedService}
                  onSelect={(id) => {
                    setValue('service', id, { shouldValidate: true });
                  }}
                />
                {errors.service && (
                  <p className="mt-2 text-sm text-red-400">{errors.service.message}</p>
                )}
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step-2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <input type="hidden" {...register('stylist')} />
                <StylistSelector
                  selected={watchedStylist || ''}
                  onSelect={(id) => {
                    setValue('stylist', id, { shouldValidate: true });
                  }}
                />
                {errors.stylist && (
                  <p className="mt-2 text-sm text-red-400">{errors.stylist.message}</p>
                )}
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step-3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <input type="hidden" {...register('date')} />
                <input type="hidden" {...register('time')} />
                <DateTimePicker
                  selectedDate={watchedDate}
                  selectedTime={watchedTime}
                  onDateSelect={(date) => {
                    setValue('date', date, { shouldValidate: true });
                  }}
                  onTimeSelect={(time) => {
                    setValue('time', time, { shouldValidate: true });
                  }}
                />
                {(errors.date || errors.time) && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.date?.message || errors.time?.message}
                  </p>
                )}
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step-4"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Your Details</h2>
                    <p className="text-white/50">Please provide your contact information</p>
                  </div>

                  <div className="space-y-4">
                    <Input
                      label="Full Name"
                      placeholder="Enter your full name"
                      {...register('name')}
                      error={errors.name?.message}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="you@example.com"
                      {...register('email')}
                      error={errors.email?.message}
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      {...register('phone')}
                      error={errors.phone?.message}
                    />
                    <div className="w-full">
                      <label className="block text-sm font-medium text-white/80 mb-1.5">
                        Notes (Optional)
                      </label>
                      <textarea
                        {...register('notes')}
                        placeholder="Any special requests or notes..."
                        rows={3}
                        className={cn(
                          'w-full rounded-lg glass/5 border border-white/10 px-4 py-2.5 text-white placeholder-white/30',
                          'transition-all duration-200 resize-none',
                          'focus:outline-none focus:ring-2 focus:ring-[#C9A962]/50 focus:border-primary',
                        )}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
          {currentStep > 1 ? (
            <Button type="button" onClick={handlePrev} variant="ghost">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Previous
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <Button type="button" onClick={handleNext} variant="primary">
              Next
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
            </Button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {isComplete && (
          <ConfirmationModal
            isOpen={isComplete}
            onClose={resetBooking}
            formData={formData as BookingFormData}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
