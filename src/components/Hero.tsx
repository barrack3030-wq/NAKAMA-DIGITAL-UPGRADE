import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative pt-28 pb-24 lg:pt-36 lg:pb-32 overflow-hidden">
      {/* Diffused electric-blue light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50/80 backdrop-blur-md border border-brand-100/50 text-brand-600 text-xs font-semibold tracking-wide uppercase mb-8 shadow-sm"
        >
          <Sparkles className="w-3 h-3" />
          <span>{t.hero.eyebrow}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-brand-900 leading-[1.05] max-w-5xl mx-auto text-balance whitespace-pre-line"
        >
          {t.hero.title1 + ' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">
            {t.hero.titleHighlight}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed text-balance"
        >
          {t.hero.desc}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="https://wa.me/6285820830530?text=Halo%20Nakama%20Digital,%20saya%20ingin%20konsultasi%20website." target="_blank" rel="noopener noreferrer"
            className="group relative px-8 py-4 bg-brand-900 hover:bg-brand-800 text-white font-medium rounded-full overflow-hidden transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center shadow-xl shadow-brand-900/10"
          >
            <span>{t.hero.cta1}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="/website-umkm/"
            className="px-8 py-4 bg-white/60 hover:bg-white backdrop-blur-md text-brand-900 border border-brand-200/50 font-medium rounded-full transition-all duration-300 w-full sm:w-auto justify-center flex items-center shadow-sm"
          >
            {t.hero.cta2}
          </a>
        </motion.div>

      </div>
    </section>
  );
}
