import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function Process() {
  const { t } = useLanguage();

  return (
    <section id="process" className="relative py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-900">
            {t.process.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-gray-100" />
          
          {t.process.items.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-sm font-semibold text-brand-500 mb-8 relative z-10 shadow-sm">
                {step.id}
              </div>
              <h3 className="text-xl font-semibold text-brand-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
