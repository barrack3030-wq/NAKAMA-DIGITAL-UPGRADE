import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const { t } = useLanguage();

  return (
    <section className="relative pt-20 pb-14 lg:pt-24 lg:pb-16 overflow-hidden">
      {/* Diffused electric-blue light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[.16em] text-brand-600 uppercase mb-5"
        >
          <span className="h-px w-8 bg-brand-300" />
          <span>{t.hero.eyebrow}</span>
          <span className="h-px w-8 bg-brand-300" />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[2.6rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-[-0.025em] text-brand-900 leading-[1.08] max-w-4xl mx-auto text-balance whitespace-pre-line"
        >
          {t.hero.title1 + ' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">
            {t.hero.titleHighlight}
          </span>
        </motion.h1>

        {t.hero.desc && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-base md:text-lg text-gray-600 max-w-xl mx-auto leading-6.5 md:leading-7 text-balance"
          >
            {t.hero.desc}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <a
            href="#contact"
            className="group relative px-8 py-4 bg-brand-900 hover:bg-brand-800 text-white font-medium rounded-full overflow-hidden transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center shadow-xl shadow-brand-900/10"
          >
            <span>{t.hero.cta1}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#portfolio"
            className="px-8 py-4 bg-white/60 hover:bg-white backdrop-blur-md text-brand-900 border border-brand-200/50 font-medium rounded-full transition-all duration-300 w-full sm:w-auto justify-center flex items-center shadow-sm"
          >
            {t.hero.cta2}
          </a>
        </motion.div>

      </div>
    </section>
  );
}
