import { PricingPlan } from '@/types';

export const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic Touch',
    description: 'Essential grooming services for everyday freshness',
    price: 29,
    period: 'per visit',
    features: [
      'Haircut & Styling',
      'Basic Facial',
      'Nail Shaping',
      'Complimentary Tea',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Experience',
    description: 'Complete beauty makeover with premium products',
    price: 89,
    originalPrice: 120,
    period: 'per visit',
    features: [
      'Haircut & Color',
      'Luxury Facial',
      'Manicure & Pedicure',
      'Party Makeup',
      'Complimentary Refreshments',
      'Hair Treatment',
    ],
    popular: true,
    badge: 'Most Popular',
  },
  {
    id: 'bridal',
    name: 'Bridal Bliss',
    description: 'Complete bridal package for your special day',
    price: 499,
    originalPrice: 650,
    period: 'per package',
    features: [
      'Bridal Hair & Makeup',
      'Pre-wedding Facial',
      'Manicure & Pedicure',
      'Body Spa',
      'Trial Session',
      'Touch-up Kit',
      'Complimentary Bridesmaid Service',
    ],
    badge: 'Best Value',
  },
];

export const membershipPlans = [
  {
    id: 'monthly',
    name: 'Monthly Glow',
    price: 49,
    period: 'month',
    features: [
      '1 Free Haircut',
      '20% Off All Services',
      'Priority Booking',
      'Free consultations',
    ],
  },
  {
    id: 'quarterly',
    name: 'Quarterly Luxe',
    price: 129,
    period: 'quarter',
    features: [
      '2 Free Haircuts',
      '1 Free Facial',
      '30% Off All Services',
      'Priority Booking',
      'Free consultations',
      'Birthday special discount',
    ],
    popular: true,
  },
  {
    id: 'annual',
    name: 'Annual Elite',
    price: 399,
    period: 'year',
    features: [
      '6 Free Haircuts',
      '4 Free Facials',
      '2 Free Manicures',
      '40% Off All Services',
      'VIP Priority Booking',
      'Free consultations',
      'Birthday special discount',
      'Exclusive member events',
    ],
  },
];

export const seasonalOffers = [
  {
    id: 'summer',
    title: 'Summer Glow Special',
    description: 'Get 25% off on all skin treatments this summer!',
    discount: '25%',
    validUntil: '2024-08-31',
    code: 'SUMMER25',
  },
  {
    id: 'bridal-season',
    title: 'Bridal Season Deal',
    description: 'Book your bridal package and get a free mehendi session!',
    discount: 'Free Mehendi',
    validUntil: '2024-12-31',
    code: 'BRIDE2024',
  },
];
