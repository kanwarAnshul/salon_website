'use client';

import { motion } from 'motion/react';
import { cn, formatPrice, formatDuration } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { getServiceById } from '@/data/services';
import { getTeamMemberById } from '@/data/team';
import type { BookingFormData } from '@/types';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: BookingFormData;
}

function formatTimeDisplay(time: string) {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  formData,
}: ConfirmationModalProps) {
  const service = formData.service ? getServiceById(formData.service) : null;
  const stylist = formData.stylist
    ? getTeamMemberById(formData.stylist)
    : null;

  const handleAddToCalendar = () => {
    if (!formData.date || !formData.time || !service) return;

    const [year, month, day] = formData.date.split('-').map(Number);
    const [hours, minutes] = formData.time.split(':').map(Number);

    const startDate = new Date(year, month - 1, day, hours, minutes);
    const endDate = new Date(startDate.getTime() + service.duration * 60000);

    const formatCalDate = (d: Date) =>
      d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const title = encodeURIComponent(`Appointment: ${service.name}`);
    const details = encodeURIComponent(
      `Service: ${service.name}\nStylist: ${stylist?.name || 'Any Available'}\nDuration: ${formatDuration(service.duration)}`,
    );
    const location = encodeURIComponent('Salon & Spa');

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatCalDate(startDate)}/${formatCalDate(endDate)}&details=${details}&location=${location}`;

    window.open(url, '_blank');
  };

  const handleWhatsApp = () => {
    const serviceLine = service
      ? `Service: ${service.name} (${formatPrice(service.price)})`
      : '';
    const stylistLine = stylist
      ? `Stylist: ${stylist.name}`
      : 'Stylist: Any Available';
    const dateLine = formData.date
      ? `Date: ${new Date(formData.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}`
      : '';
    const timeLine = formData.time
      ? `Time: ${formatTimeDisplay(formData.time)}`
      : '';

    const message = encodeURIComponent(
      `Hi! I'd like to confirm my booking:\n\n${serviceLine}\n${stylistLine}\n${dateLine}\n${timeLine}\n\nName: ${formData.name}\nPhone: ${formData.phone}`,
    );

    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative z-10 w-full max-w-md bg-background-alt rounded-2xl border border-white/10 p-6 shadow-2xl"
      >
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-4"
          >
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1C1C1C"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
            </motion.svg>
          </motion.div>

          <h2 className="text-2xl font-bold text-white">Booking Confirmed!</h2>
          <p className="text-white/50 mt-1">Your appointment has been scheduled</p>
        </div>

        <div className="space-y-3 mb-6">
          {service && (
            <div className="flex items-center justify-between p-3 rounded-lg glass/5">
              <span className="text-white/50 text-sm">Service</span>
              <span className="text-white font-medium text-sm">{service.name}</span>
            </div>
          )}

          <div className="flex items-center justify-between p-3 rounded-lg glass/5">
            <span className="text-white/50 text-sm">Stylist</span>
            <span className="text-white font-medium text-sm">
              {stylist ? stylist.name : 'Any Available'}
            </span>
          </div>

          {formData.date && (
            <div className="flex items-center justify-between p-3 rounded-lg glass/5">
              <span className="text-white/50 text-sm">Date</span>
              <span className="text-white font-medium text-sm">
                {new Date(formData.date + 'T00:00:00').toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
          )}

          {formData.time && (
            <div className="flex items-center justify-between p-3 rounded-lg glass/5">
              <span className="text-white/50 text-sm">Time</span>
              <span className="text-white font-medium text-sm">
                {formatTimeDisplay(formData.time)}
              </span>
            </div>
          )}

          {service && (
            <div className="flex items-center justify-between p-3 rounded-lg glass/5">
              <span className="text-white/50 text-sm">Duration</span>
              <span className="text-white font-medium text-sm">
                {formatDuration(service.duration)}
              </span>
            </div>
          )}

          {service && (
            <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-primary/70 text-sm">Total</span>
              <span className="text-primary font-bold">{formatPrice(service.price)}</span>
            </div>
          )}

          <div className="flex items-center justify-between p-3 rounded-lg glass/5">
            <span className="text-white/50 text-sm">Contact</span>
            <span className="text-white font-medium text-sm">{formData.name}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={handleAddToCalendar} variant="secondary" className="w-full">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Add to Calendar
          </Button>

          <Button onClick={handleWhatsApp} variant="outline" className="w-full">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Confirmation
          </Button>

          <Button onClick={onClose} variant="ghost" className="w-full">
            Close
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
