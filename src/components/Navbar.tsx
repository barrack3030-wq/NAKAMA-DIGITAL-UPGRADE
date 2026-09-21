import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../data/siteConfig';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, t, setLanguage } = useLanguage();
  const asset = (path: string) => /^https?:\/\//i.test(path) ? path : `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.services, href: '/#services' },
    { name: t.nav.portfolio, href: '/portfolio/' },
    { name: t.nav.process, href: '/#process' },
    { name: t.nav.blog, href: '/blog/' },
  ];
  const toggleLanguage = () => setLanguage(lang === 'id' ? 'en' : 'id');
  const logoSrc = `${asset(siteConfig.logoPath)}?v=20260914`;

  return <>
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between relative">
        <a href="/" className="flex items-center group shrink-0" aria-label={siteConfig.brandName}>
          <img
            key={logoSrc}
            src={logoSrc}
            alt={siteConfig.brandName}
            className="block w-[150px] h-auto max-h-[64px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            loading="eager"
          />
        </a>
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center rounded-full bg-gradient-to-r from-[#0b4f8a] via-brand-600 to-[#a27bc8] p-1.5 shadow-lg shadow-brand-900/10">
          <div className="flex items-center gap-0.5">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-white/95 transition-all hover:bg-white/10 hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-5 ml-auto">
          <button
            onClick={toggleLanguage}
            aria-label={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-brand-900"
          >
            <Globe className="w-5 h-5" />
            <span>{lang === 'id' ? 'EN' : 'ID'}</span>
          </button>
          <a
            href="https://wa.me/6285820830530?text=Halo%20Nakama%20Digital,%20saya%20ingin%20konsultasi%20website."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-[#0b1020] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-black"
          >
            {lang === 'id' ? 'Mulai Konsultasi' : 'Start Consultation'}
          </a>
        </div>
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleLanguage} className="text-gray-600 hover:text-brand-600 transition-colors flex items-center gap-1 font-medium text-sm"><Globe className="w-4 h-4"/><span>{lang === 'id' ? 'EN' : 'ID'}</span></button>
          <button className="text-gray-800 p-2 -mr-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}</button>
        </div>
      </div>
    </motion.nav>
    <AnimatePresence>{mobileMenuOpen && <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 md:hidden"><div className="mx-auto max-w-sm rounded-3xl bg-gradient-to-br from-[#0b4f8a] via-brand-600 to-[#a27bc8] p-3 shadow-2xl"><div className="flex flex-col gap-1">{navLinks.map(link => <a key={link.name} href={link.href} onClick={()=>setMobileMenuOpen(false)} className="rounded-full px-5 py-3.5 text-center text-base font-medium text-white transition hover:bg-white/10">{link.name}</a>)}<a href="https://wa.me/6285820830530?text=Halo%20Nakama%20Digital,%20saya%20ingin%20konsultasi%20website." target="_blank" rel="noopener noreferrer" onClick={()=>setMobileMenuOpen(false)} className="mt-2 rounded-full bg-brand-900 px-6 py-3.5 text-center text-base font-semibold text-white">{lang === 'id' ? 'Mulai Konsultasi' : 'Start Consultation'}</a></div></div></motion.div>}</AnimatePresence>
  </>;
}
