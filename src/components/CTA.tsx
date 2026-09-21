import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CTA() {
  const { t } = useLanguage();

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      {/* Diffused electric-blue light */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="absolute w-[800px] h-[800px] bg-brand-500/15 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-brand-900 mb-6 text-balance">
            {t.cta.title1} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">{t.cta.title2}</span>
          </h2>
          
          <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto font-medium text-balance">
            {t.cta.desc}
          </p>

          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-brand-900 hover:bg-brand-700 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 transform hover:scale-105 shadow-xl shadow-brand-500/20"
          >
            <span>{t.cta.btn}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
