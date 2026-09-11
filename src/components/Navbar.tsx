import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig as defaultSiteConfig, SiteConfig } from '../data/siteConfig';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(defaultSiteConfig);
  const { lang, t, setLanguage } = useLanguage();
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/site.json?${Date.now()}`)
      .then((r) => r.ok ? r.json() : Promise.reject(new Error('site.json unavailable')))
      .then((data: SiteConfig) => setSiteConfig({ ...defaultSiteConfig, ...data }))
      .catch(() => undefined);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.portfolio, href: '#portfolio' },
    { name: t.nav.process, href: '#process' },
    { name: t.nav.faq, href: '#faq' },
  ];
  const toggleLanguage = () => setLanguage(lang === 'id' ? 'en' : 'id');

  return <>
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center overflow-hidden bg-white/70 rounded-xl border border-white/60 shadow-sm group-hover:shadow-md transition-all" style={{ width: Math.min(siteConfig.logoWidth, 180), height: 38 }}>
            <img src={asset(siteConfig.logoPath)} alt={siteConfig.brandName} className="max-h-full w-auto object-contain" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-brand-900">{siteConfig.brandName}</span>
        </a>
        <div className="hidden md:flex items-center gap-8">{navLinks.map(link => <a key={link.name} href={link.href} className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors">{link.name}</a>)}</div>
        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleLanguage} className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors"><Globe className="w-4 h-4"/><span>{lang === 'id' ? 'EN' : 'ID'}</span></button>
          <a href="#contact" className="px-5 py-2.5 bg-brand-900 hover:bg-brand-700 text-white text-sm font-medium rounded-full transition-all duration-300 transform hover:scale-105">{t.nav.cta}</a>
        </div>
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleLanguage} className="text-gray-600 hover:text-brand-600 transition-colors flex items-center gap-1 font-medium text-sm"><Globe className="w-4 h-4"/><span>{lang === 'id' ? 'EN' : 'ID'}</span></button>
          <button className="text-gray-800 p-2 -mr-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}</button>
        </div>
      </div>
    </motion.nav>
    <AnimatePresence>{mobileMenuOpen && <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"><div className="flex flex-col gap-6 text-center">{navLinks.map(link => <a key={link.name} href={link.href} onClick={()=>setMobileMenuOpen(false)} className="text-2xl font-semibold text-gray-900">{link.name}</a>)}<a href="#contact" onClick={()=>setMobileMenuOpen(false)} className="mt-4 px-6 py-4 bg-brand-500 text-white font-semibold rounded-2xl w-full">{t.nav.cta}</a></div></motion.div>}</AnimatePresence>
  </>;
}
