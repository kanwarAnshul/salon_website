import { TeamMember } from '@/types';

export const teamMembers: TeamMember[] = [
  {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    role: 'Lead Hair Stylist',
    bio: 'With over 12 years of experience in hair styling, Sarah specializes in color transformations and modern cuts. Trained at Vidal Sassoon Academy, London.',
    image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400&q=80',
    specialties: ['Hair Coloring', 'Balayage', 'Precision Cuts', 'Bridal Hair'],
    experience: 12,
    rating: 4.9,
    reviewCount: 320,
    social: {
      instagram: '@sarah.styles',
    },
  },
  {
    id: 'michael-chen',
    name: 'Michael Chen',
    role: 'Senior Hair Stylist',
    bio: 'Michael brings 10 years of expertise in men\'s grooming and contemporary styling. Known for his impeccable fade techniques and beard artistry.',
    image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=400&q=80',
    specialties: ['Men\'s Cuts', 'Fades', 'Beard Styling', 'Texturizing'],
    experience: 10,
    rating: 4.8,
    reviewCount: 280,
    social: {
      instagram: '@michael.cuts',
    },
  },
  {
    id: 'emma-williams',
    name: 'Emma Williams',
    role: 'Skin Care Specialist',
    bio: 'A certified dermatological aesthetician, Emma delivers personalized skin treatments using cutting-edge technology and organic products.',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&q=80',
    specialties: ['Facials', 'Anti-Aging', 'Skin Analysis', 'Chemical Peels'],
    experience: 8,
    rating: 4.9,
    reviewCount: 210,
  },
  {
    id: 'david-kumar',
    name: 'David Kumar',
    role: 'Makeup Artist',
    bio: 'David is a celebrity makeup artist with a passion for creating stunning looks for weddings, editorials, and special events.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    specialties: ['Bridal Makeup', 'Editorial', 'SFX', 'Airbrush'],
    experience: 15,
    rating: 5.0,
    reviewCount: 185,
    social: {
      instagram: '@david.beauty',
    },
  },
  {
    id: 'lisa-park',
    name: 'Lisa Park',
    role: 'Nail Artist',
    bio: 'Lisa transforms nails into miniature works of art. Her intricate designs and creative nail art have earned her a loyal following.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    specialties: ['Nail Art', 'Gel Extensions', 'Chrome Nails', '3D Art'],
    experience: 6,
    rating: 4.7,
    reviewCount: 150,
    social: {
      instagram: '@lisa.nails',
    },
  },
  {
    id: 'james-miller',
    name: 'James Miller',
    role: 'Spa Therapist',
    bio: 'James is a licensed massage therapist specializing in deep tissue, aromatherapy, and relaxation techniques for holistic wellness.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    specialties: ['Deep Tissue', 'Aromatherapy', 'Hot Stone', 'Reflexology'],
    experience: 9,
    rating: 4.8,
    reviewCount: 195,
  },
];

export const getTeamMemberById = (id: string) => teamMembers.find((m) => m.id === id);
