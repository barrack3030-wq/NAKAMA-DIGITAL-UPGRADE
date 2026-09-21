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
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <a href="/" className="flex items-center group shrink-0" aria-label={siteConfig.brandName}>
          <img
            key={logoSrc}
            src={logoSrc}
            alt={siteConfig.brandName}
            className="block w-[150px] h-auto max-h-[64px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            loading="eager"
          />
        </a>
        <div className="hidden md:flex items-center gap-1.5">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/65 px-3.5 py-2 text-xs font-medium text-gray-600 shadow-sm backdrop-blur-md transition-all hover:border-gray-300 hover:bg-white hover:text-brand-900 hover:shadow"
            >
              {link.name === t.nav.home && <span className="h-1.5 w-1.5 rounded-full bg-brand-900" />}
              {link.name}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button onClick={toggleLanguage} className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors"><Globe className="w-4 h-4"/><span>{lang === 'id' ? 'EN' : 'ID'}</span></button>
          <a href="#contact" className="px-5 py-2.5 bg-brand-900 hover:bg-brand-800 text-white text-sm font-medium rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow-sm">{t.nav.cta}</a>
        </div>
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleLanguage} className="text-gray-600 hover:text-brand-600 transition-colors flex items-center gap-1 font-medium text-sm"><Globe className="w-4 h-4"/><span>{lang === 'id' ? 'EN' : 'ID'}</span></button>
          <button className="text-gray-800 p-2 -mr-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}</button>
        </div>
      </div>
    </motion.nav>
    <AnimatePresence>{mobileMenuOpen && <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 md:hidden"><div className="mx-auto flex max-w-sm flex-col gap-2">{navLinks.map(link => <a key={link.name} href={link.href} onClick={()=>setMobileMenuOpen(false)} className="rounded-full border border-gray-200 px-5 py-3 text-center text-base font-medium text-gray-900 transition hover:border-brand-300 hover:bg-brand-50">{link.name}</a>)}<a href="https://wa.me/6285820830530?text=Halo%20Nakama%20Digital,%20saya%20ingin%20konsultasi%20website." target="_blank" rel="noopener noreferrer" onClick={()=>setMobileMenuOpen(false)} className="mt-3 rounded-full bg-brand-900 px-6 py-3.5 text-center text-base font-semibold text-white">{t.nav.cta}</a></div></motion.div>}</AnimatePresence>
  </>;
}
