import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function Stats() {
  const { t } = useLanguage();

  return (
    <section className="relative py-8 lg:py-10 border-y border-white/50 bg-white/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 divide-x divide-transparent md:divide-gray-100">
          {t.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-brand-900 mb-2">
                {stat.value}
              </h3>
              <p className="text-sm md:text-base text-gray-500 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
