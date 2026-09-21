import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-24 pb-16 lg:min-h-[calc(100vh-80px)] lg:pt-28 lg:pb-20">
      {/* Diffused electric-blue light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.08fr_.92fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/75 px-3 py-1 text-xs font-semibold uppercase tracking-[.16em] text-brand-600 shadow-sm backdrop-blur-md"
        >
          <Sparkles className="w-3 h-3" />
          <span>{t.hero.eyebrow}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl text-balance text-5xl font-bold tracking-[-.045em] text-brand-900 leading-[1.02] sm:text-6xl lg:text-[4.9rem]"
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
          className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 text-balance"
        >
          {t.hero.desc}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
        >
          <a
            href="https://wa.me/6285820830530?text=Halo%20Nakama%20Digital,%20saya%20ingin%20konsultasi%20website." target="_blank" rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-brand-900 px-7 py-3.5 font-semibold text-white shadow-xl shadow-brand-900/10 transition-all duration-300 hover:bg-brand-800"
          >
            <span>{t.hero.cta1}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="/website-umkm/"
            className="inline-flex items-center justify-center rounded-full border border-brand-200/70 bg-white/75 px-7 py-3.5 font-semibold text-brand-900 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-white"
          >
            {t.hero.cta2}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="absolute -inset-8 rounded-[3rem] bg-brand-400/15 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-slate-950 p-3 shadow-2xl shadow-brand-900/15">
            <div className="rounded-[1.4rem] bg-white p-5 sm:p-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                <span className="ml-auto text-xs font-medium text-slate-400">nakamadigital.biz.id</span>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-brand-50 via-white to-blue-50 p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-brand-600">Website untuk bisnis</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Rapi di layar. Jelas saat dibuka.</h2>
                <p className="mt-4 text-sm leading-6 text-slate-600">Tampilkan bisnis, layanan, produk, dan kontak dalam satu halaman yang mudah dipahami calon pelanggan.</p>
                <div className="mt-7 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-brand-100 bg-white p-4">
                    <p className="text-xs font-semibold text-brand-600">DESIGN</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">Visual yang rapi</p>
                  </div>
                  <div className="rounded-xl border border-brand-100 bg-white p-4">
                    <p className="text-xs font-semibold text-brand-600">BUILD</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">Cepat & responsif</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Company Profile', 'UMKM', 'Landing Page'].map((item) => (
                    <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
