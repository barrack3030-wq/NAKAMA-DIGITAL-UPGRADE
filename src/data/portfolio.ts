import { Language } from '../locales';

export interface PortfolioItem {
  id: string;
  title: Record<Language, string>;
  category: Record<Language, string>;
  color: string;
  image?: string;
  link?: string;
}

// Live projects. The image URLs use live website screenshots so the portfolio
// stays visually representative without requiring manual image uploads.
export const portfolioData: PortfolioItem[] = [
  {
    id: 'pelita-dental-luwuk',
    title: {
      id: 'Pelita Dental Luwuk',
      en: 'Pelita Dental Luwuk'
    },
    category: {
      id: 'Website Klinik',
      en: 'Dental Clinic Website'
    },
    color: 'from-blue-500/20 to-cyan-500/5',
    image: 'https://image.thum.io/get/width/1400/crop/900/https://barrack3030-wq.github.io/pelita-dental-luwuk/',
    link: 'https://barrack3030-wq.github.io/pelita-dental-luwuk/'
  },
  {
    id: 'british-propolis-toili',
    title: {
      id: 'British Propolis Toili',
      en: 'British Propolis Toili'
    },
    category: {
      id: 'Website Bisnis',
      en: 'Business Website'
    },
    color: 'from-amber-500/20 to-orange-500/5',
    image: 'https://image.thum.io/get/width/1400/crop/900/https://agenbptoili.my.id/',
    link: 'https://agenbptoili.my.id/'
  },
  {
    id: 'banggai-wonderland',
    title: {
      id: 'Banggai Wonderland',
      en: 'Banggai Wonderland'
    },
    category: {
      id: 'Website Travel',
      en: 'Travel Website'
    },
    color: 'from-cyan-500/20 to-blue-500/5',
    image: 'https://image.thum.io/get/width/1400/crop/900/https://www.banggaiwonderland.my.id/',
    link: 'https://www.banggaiwonderland.my.id/'
  },
  {
    id: 'the-common-cafe',
    title: {
      id: 'The Common Cafe',
      en: 'The Common Cafe'
    },
    category: {
      id: 'Website Cafe',
      en: 'Cafe Website'
    },
    color: 'from-stone-500/20 to-amber-500/5',
    image: 'https://image.thum.io/get/width/1400/crop/900/https://barrack3030-wq.github.io/tHE-COMMON-CAFE/',
    link: 'https://barrack3030-wq.github.io/tHE-COMMON-CAFE/'
  },
  {
    id: 'osaka-residence',
    title: {
      id: 'Osaka Residence',
      en: 'Osaka Residence'
    },
    category: {
      id: 'Website Properti',
      en: 'Property Website'
    },
    color: 'from-slate-500/20 to-blue-500/5',
    image: 'https://image.thum.io/get/width/1400/crop/900/https://barrack3030-wq.github.io/osaka-residence/',
    link: 'https://barrack3030-wq.github.io/osaka-residence/'
  },
  {
    id: 'deho-cafe',
    title: {
      id: 'DEHO Cafe',
      en: 'DEHO Cafe'
    },
    category: {
      id: 'Website Restoran',
      en: 'Restaurant Website'
    },
    color: 'from-rose-500/20 to-orange-500/5',
    image: 'https://image.thum.io/get/width/1400/crop/900/https://barrack3030-wq.github.io/DEHO-CAFE-/',
    link: 'https://barrack3030-wq.github.io/DEHO-CAFE-/#home'
  },
  {
    id: 'bmt-al-muhajirin',
    title: {
      id: 'BMT Al-Muhajirin',
      en: 'BMT Al-Muhajirin'
    },
    category: {
      id: 'Website Koperasi Syariah',
      en: 'Islamic Cooperative Website'
    },
    color: 'from-emerald-500/20 to-lime-500/5',
    image: 'https://image.thum.io/get/width/1400/crop/900/https://barrack3030-wq.github.io/BMT01/#/beranda',
    link: 'https://barrack3030-wq.github.io/BMT01/#/beranda'
  }
];
