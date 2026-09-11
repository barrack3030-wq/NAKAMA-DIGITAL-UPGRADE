import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function Features() {
  const { t } = useLanguage();

  return (
    <section className="relative py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 md:sticky top-32"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-900 leading-tight">
              {t.features.title1}<br />
              <span className="text-gray-400">{t.features.title2}</span>
            </h2>
          </motion.div>
          
          <div className="flex-1 w-full">
            <div className="flex flex-col">
              {t.features.items.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="py-8 border-b border-gray-100 last:border-0 group"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-lg font-medium text-gray-300 group-hover:text-brand-300 transition-colors">
                      0{index + 1}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-semibold text-brand-900 group-hover:text-brand-600 transition-colors">
                      {feature}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
