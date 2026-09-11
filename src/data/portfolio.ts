import { Language } from '../locales';

export interface PortfolioItem {
  id: string;
  title: Record<Language, string>;
  category: Record<Language, string>;
  color: string;
  image?: string; // Path to the image in assets/portfolio (optional)
  link?: string; // URL to view the live website (optional)
}

export const portfolioData: PortfolioItem[] = [
  {
    id: 'fintech-corp',
    title: {
      id: 'Fintech Corporate Profile',
      en: 'Fintech Corporate Profile'
    },
    category: {
      id: 'Company Profile',
      en: 'Company Profile'
    },
    color: 'from-blue-500/20 to-brand-500/5',
    // image: '/assets/portfolio/fintech.jpg', // Example of how to add an image later
    // link: 'https://example.com' // Example of how to add a clickable link later
  },
  {
    id: 'artisan-coffee',
    title: {
      id: 'Artisan Coffee Shop',
      en: 'Artisan Coffee Shop'
    },
    category: {
      id: 'UMKM',
      en: 'SME'
    },
    color: 'from-amber-500/20 to-orange-500/5'
  },
  {
    id: 'international-school',
    title: {
      id: 'International School',
      en: 'International School'
    },
    category: {
      id: 'Sekolah',
      en: 'School'
    },
    color: 'from-emerald-500/20 to-teal-500/5'
  },
  {
    id: 'bali-luxury',
    title: {
      id: 'Bali Luxury Tours',
      en: 'Bali Luxury Tours'
    },
    category: {
      id: 'Travel',
      en: 'Travel'
    },
    color: 'from-cyan-500/20 to-blue-500/5'
  }
];
