export const SITE_CONFIG = {
  name: 'Glamour Studio',
  tagline: 'Premium Unisex Salon',
  description: 'Experience luxury beauty services at Glamour Studio. Premium unisex salon offering hair styling, spa treatments, makeup, and grooming services.',
  url: 'https://glamourstudio-demo.vercel.app',
  email: 'info@glamourstudio.com',
  phone: '+1-234-567-8900',
  whatsapp: '+1234567890',
  address: {
    street: '123 Beauty Lane',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'US',
  },
  coordinates: {
    lat: 40.7128,
    lng: -74.006,
  },
  social: {
    facebook: 'https://facebook.com/glamourstudio',
    instagram: 'https://instagram.com/glamourstudio',
    twitter: 'https://twitter.com/glamourstudio',
    pinterest: 'https://pinterest.com/glamourstudio',
  },
  hours: {
    weekday: { open: '09:00', close: '20:00' },
    weekend: { open: '10:00', close: '18:00' },
  },
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Team', href: '/team' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const SERVICE_CATEGORIES = [
  { id: 'hair', label: 'Hair Services', icon: 'Scissors' },
  { id: 'skin', label: 'Skin Care', icon: 'Sparkles' },
  { id: 'nails', label: 'Nail Services', icon: 'Hand' },
  { id: 'makeup', label: 'Makeup & Grooming', icon: 'Palette' },
  { id: 'spa', label: 'Spa & Wellness', icon: 'Heart' },
  { id: 'bridal', label: 'Bridal & Party', icon: 'Crown' },
  { id: 'mens', label: "Men's Grooming", icon: 'User' },
] as const;

export const GENDER_FILTERS = [
  { id: 'all', label: 'All Services' },
  { id: 'women', label: 'For Her' },
  { id: 'men', label: 'For Him' },
  { id: 'unisex', label: 'Unisex' },
] as const;

export const BREAKPOINTS = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};

export const BUSINESS_DATA = {
  stats: [
    { label: 'Happy Clients', value: 5000, suffix: '+' },
    { label: 'Years Experience', value: 15, suffix: '' },
    { label: 'Expert Stylists', value: 50, suffix: '+' },
    { label: 'Awards Won', value: 25, suffix: '' },
  ],
  certifications: [
    'Licensed Beauty Professionals',
    'Certified Color Experts',
    'Hygiene & Safety Certified',
    'Eco-Friendly Products',
  ],
  paymentMethods: ['Cash', 'Credit Cards', 'Debit Cards', 'Digital Wallets'],
};
