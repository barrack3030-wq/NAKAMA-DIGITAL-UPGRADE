import React from 'react';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

const WA = 'https://wa.me/6285820830530?text=Halo%20Nakama%20Digital,%20saya%20ingin%20konsultasi%20website.';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-20 pb-12 lg:pt-24 lg:pb-14">
      <div className="pointer-events-none absolute left-1/2 top-10 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-brand-500/12 blur-[110px]" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="mx-auto inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.18em] text-brand-600 sm:text-xs"
          >
            <span className="h-px w-7 bg-brand-300" />
            {t.hero.eyebrow}
            <span className="h-px w-7 bg-brand-300" />
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-5 max-w-4xl text-balance text-[2.45rem] font-bold leading-[1.04] tracking-[-0.035em] text-brand-900 sm:text-5xl md:text-6xl lg:text-[4.15rem]"
          >
            {t.hero.title1 + ' '}
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 bg-clip-text text-transparent">
              {t.hero.titleHighlight}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-900 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-900/10 transition hover:bg-brand-800"
            >
              {t.hero.cta1}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/portfolio/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-200 bg-white/70 px-6 py-3.5 text-sm font-semibold text-brand-900 shadow-sm backdrop-blur-md transition hover:border-brand-300 hover:bg-white"
            >
              {t.hero.cta2}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto mt-10 max-w-6xl"
        >
          <div className="rounded-[2rem] border border-white/80 bg-white/50 p-3 shadow-[0_24px_70px_rgba(15,23,42,.10)] backdrop-blur-xl">
            <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
              <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                <span className="ml-auto text-[10px] font-semibold uppercase tracking-[.14em] text-slate-400">Nakama Digital</span>
              </div>

              <div className="grid lg:grid-cols-[1.15fr_.85fr]">
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[.16em] text-brand-700">Business website</span>
                    <span className="text-xs text-slate-400">01</span>
                  </div>
                  <h2 className="mt-7 max-w-xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                    Website yang menjelaskan bisnis sebelum pelanggan bertanya.
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">
                    Profil, layanan, produk, lokasi, dan cara menghubungi Anda disusun dalam satu alur yang mudah diikuti.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {['Company Profile', 'UMKM', 'Landing Page', 'Travel'].map((item) => (
                      <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">{item}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 p-6 sm:p-8">
                  <div className="rounded-2xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 p-5 text-white shadow-2xl">
                    <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[.16em] text-brand-100">
                      <span>Structure</span><span>02</span>
                    </div>
                    <div className="mt-7 rounded-2xl bg-white/10 p-4 backdrop-blur">
                      <div className="h-2 w-24 rounded-full bg-white/70" />
                      <div className="mt-3 h-2 w-36 rounded-full bg-white/25" />
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-white p-4 text-slate-900">
                        <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-brand-600">CTA</p>
                        <p className="mt-3 text-sm font-semibold">Hubungi kami</p>
                      </div>
                      <div className="rounded-2xl bg-white/10 p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-brand-100">Mobile</p>
                        <p className="mt-3 text-sm font-semibold">Nyaman dibuka</p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      {['Informasi mudah ditemukan', 'Tampilan rapi di mobile', 'Arah tindakan jelas'].map((item) => (
                        <div key={item} className="flex items-center gap-2 rounded-xl bg-black/15 px-3 py-2.5 text-xs text-brand-50">
                          <Check className="h-3.5 w-3.5 text-white" />{item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
