export type Gender = 'women' | 'men' | 'unisex';
export type ServiceCategory = 'hair' | 'skin' | 'nails' | 'makeup' | 'spa' | 'bridal' | 'mens';

export interface Service {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  gender: Gender;
  price: number;
  duration: number;
  image: string;
  popular?: boolean;
  features?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
  experience: number;
  rating: number;
  reviewCount: number;
  social?: {
    instagram?: string;
    twitter?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  service: string;
  date: string;
  source?: 'google' | 'facebook' | 'yelp';
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  period: string;
  features: string[];
  popular?: boolean;
  badge?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorImage: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface BeforeAfterItem {
  id: string;
  before: string;
  after: string;
  title: string;
  category: string;
  description: string;
}

export interface BookingFormData {
  service: string;
  stylist: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isClosed?: boolean;
}
