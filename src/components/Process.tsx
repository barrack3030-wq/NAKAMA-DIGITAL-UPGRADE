import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Process() {
  const { t } = useLanguage();

  return (
    <section id="process" className="relative py-14 lg:py-18">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-brand-600">Cara kerja</p>
          <h2 className="mt-3 text-4xl font-bold tracking-[-.04em] text-brand-900 sm:text-5xl">{t.process.title}</h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-500">Anda tidak perlu datang dengan brief yang sudah sempurna. Kita mulai dari memahami bisnisnya dulu.</p>
        </motion.div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {t.process.items.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .55, delay: index * .08 }}
              className="group rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl"
            >
              <div className="flex items-start justify-between">
                <span className="text-5xl font-bold tracking-[-.05em] text-brand-100 transition group-hover:text-brand-200">{step.id}</span>
                <span className="mt-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition group-hover:bg-brand-50 group-hover:text-brand-600">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
              <h3 className="mt-10 text-xl font-bold tracking-tight text-brand-900">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
