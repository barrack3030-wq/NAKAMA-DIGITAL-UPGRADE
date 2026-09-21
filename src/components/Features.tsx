import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Features() {
  const { t } = useLanguage();

  return (
    <section className="relative py-14 lg:py-18">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-brand-600">Yang kami perhatikan</p>
          <h2 className="mt-3 text-4xl font-bold leading-[1.02] tracking-[-.04em] text-brand-900 sm:text-5xl">
            {t.features.title1}<br />
            <span className="text-slate-400">{t.features.title2}</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-slate-600">
            Bukan sekadar membuat halaman terlihat bagus. Struktur website harus membantu orang menemukan informasi dan tahu apa yang harus dilakukan berikutnya.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="rounded-[2rem] border border-slate-200 bg-white/85 p-4 shadow-xl shadow-slate-900/5 backdrop-blur"
        >
          <div className="rounded-[1.5rem] bg-slate-950 p-5 sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-[10px] font-semibold uppercase tracking-[.18em] text-brand-300">Website structure</span>
              <span className="text-[10px] text-white/35">03</span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_.8fr]">
              <div className="rounded-2xl bg-white p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-brand-700">Homepage</span>
                  <span className="rounded-full bg-brand-50 px-2 py-1 text-[9px] font-semibold text-brand-600">Clear</span>
                </div>
                <div className="mt-5 space-y-3">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="h-2 w-24 rounded-full bg-slate-200" />
                    <div className="mt-2 h-2 w-40 rounded-full bg-slate-100" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-brand-50 p-4">
                      <span className="text-[10px] font-semibold text-brand-600">CTA</span>
                      <p className="mt-2 text-xs font-semibold text-slate-900">WhatsApp</p>
                    </div>
                    <div className="rounded-xl border border-slate-100 p-4">
                      <span className="text-[10px] font-semibold text-slate-400">SEO</span>
                      <p className="mt-2 text-xs font-semibold text-slate-900">Ready</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-b from-brand-600 to-brand-800 p-5 text-white">
                <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-brand-100">Checks</span>
                <div className="mt-5 space-y-3">
                  {t.features.items.map((feature, index) => (
                    <div key={feature} className="flex items-start gap-2 rounded-xl bg-white/10 px-3 py-3">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-100" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold">{feature}</p>
                        <p className="mt-0.5 text-[10px] text-brand-100/75">Checked before launch</p>
                      </div>
                      <span className="ml-auto text-[9px] text-brand-100/50">0{index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <a href="/portfolio/" className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold text-white/80 transition hover:bg-white/10">
              <span>Lihat hasil dalam portfolio</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
