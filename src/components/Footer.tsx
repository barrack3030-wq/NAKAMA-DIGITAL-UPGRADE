import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="relative bg-white/40 backdrop-blur-xl pt-16 pb-8 border-t border-white/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-xs">
            <a href="#" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-brand-600 transition-colors">
                N
              </div>
              <span className="font-semibold text-xl tracking-tight text-brand-900">
                Nakama Digital
              </span>
            </a>
            <p className="text-sm text-gray-500 leading-relaxed">
              {t.footer.desc}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 md:gap-16">
            <div>
              <h4 className="font-semibold text-brand-900 mb-4 text-sm uppercase tracking-wider">{t.footer.nav}</h4>
              <ul className="space-y-3">
                {['Services', 'Portfolio', 'Process', 'FAQ'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-sm text-gray-500 hover:text-brand-600 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-brand-900 mb-4 text-sm uppercase tracking-wider">{t.footer.contact}</h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://wa.me/6285820830530" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-brand-600 transition-colors">
                    WhatsApp: <br/>+62 858-2083-0530
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Nakama Digital. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-gray-400 hover:text-brand-600 transition-colors">{t.footer.privacy}</a>
            <a href="#" className="text-sm text-gray-400 hover:text-brand-600 transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
