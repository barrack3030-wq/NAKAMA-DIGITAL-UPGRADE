import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function ProductExperience() {
  const { t } = useLanguage();

  return (
    <section className="py-12 lg:py-16 bg-[#0A0A0B] overflow-hidden relative text-white">
      {/* Background gradients */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-500/30 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 text-balance leading-tight">
            {t.experience.title1}<br />
            <span className="text-brand-300">{t.experience.title2}</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
