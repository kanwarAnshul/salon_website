'use client';

import { useState, useCallback } from 'react';
import { BookingFormData } from '@/types';

interface UseBookingReturn {
  currentStep: number;
  formData: Partial<BookingFormData>;
  isSubmitting: boolean;
  isComplete: boolean;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  updateFormData: (data: Partial<BookingFormData>) => void;
  submitBooking: () => Promise<void>;
  resetBooking: () => void;
}

export function useBooking(): UseBookingReturn {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<BookingFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const totalSteps = 4;

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(1, Math.min(step, totalSteps)));
  }, []);

  const updateFormData = useCallback((data: Partial<BookingFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const submitBooking = useCallback(async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsComplete(true);
    } catch {
      throw new Error('Booking failed');
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const resetBooking = useCallback(() => {
    setCurrentStep(1);
    setFormData({});
    setIsSubmitting(false);
    setIsComplete(false);
  }, []);

  return {
    currentStep,
    formData,
    isSubmitting,
    isComplete,
    nextStep,
    prevStep,
    goToStep,
    updateFormData,
    submitBooking,
    resetBooking,
  };
}
