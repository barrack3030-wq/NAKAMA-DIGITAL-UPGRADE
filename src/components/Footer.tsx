import React from 'react';
import { siteConfig } from '../data/siteConfig';

export default function Footer() {
  const isEnglish = typeof window !== 'undefined' && window.location.pathname.startsWith('/en');
  const asset = (path: string) => /^https?:\/\//i.test(path) ? path : `${import.meta.env.BASE_URL}${path.replace(/^\\/+/, '')}`;
  const logoSrc = `${asset(siteConfig.logoPath)}?v=20260914`;

  const navigation = isEnglish
    ? [
        ['Home', '/'],
        ['Services', '/website-company-profile/'],
        ['Blog', '/blog/'],
      ]
    : [
        ['Beranda', '/'],
        ['Layanan', '/website-company-profile/'],
        ['Blog', '/blog/'],
      ];

  const services = isEnglish
    ? [
        ['Company Profile', '/website-company-profile/'],
        ['SME Website', '/website-umkm/'],
        ['Landing Page', '/landing-page/'],
        ['School Website', '/website-sekolah/'],
        ['Travel Website', '/website-travel/'],
      ]
    : [
        ['Company Profile', '/website-company-profile/'],
        ['Website UMKM', '/website-umkm/'],
        ['Landing Page', '/landing-page/'],
        ['Website Sekolah', '/website-sekolah/'],
        ['Website Travel', '/website-travel/'],
      ];

  return (
    <footer className="border-t border-slate-200/80 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_.8fr_1fr]">
          <div className="max-w-sm">
            <a href="/" className="inline-flex items-center" aria-label={siteConfig.brandName}>
              <img src={logoSrc} alt={siteConfig.brandName} className="h-10 w-auto object-contain" />
            </a>
            <p className="mt-5 text-sm leading-6 text-slate-500">
              {isEnglish
                ? 'Professional websites for businesses, SMEs, schools, travel companies, and organizations.'
                : 'Website profesional untuk bisnis, UMKM, sekolah, travel, dan organisasi.'}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[.14em] text-slate-900">
              {isEnglish ? 'Navigate' : 'Navigasi'}
            </h2>
            <ul className="mt-4 space-y-3">
              {navigation.map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="text-sm text-slate-500 transition hover:text-brand-600">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[.14em] text-slate-900">
              {isEnglish ? 'Services' : 'Layanan'}
            </h2>
            <ul className="mt-4 space-y-3">
              {services.map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="text-sm text-slate-500 transition hover:text-brand-600">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-700">{isEnglish ? 'Need a website?' : 'Butuh website?'}</p>
            <a href="https://wa.me/6285820830530" target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm text-slate-500 transition hover:text-brand-600">
              WhatsApp +62 858-2083-0530
            </a>
          </div>
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} {siteConfig.brandName}
          </p>
        </div>
      </div>
    </footer>
  );
}
