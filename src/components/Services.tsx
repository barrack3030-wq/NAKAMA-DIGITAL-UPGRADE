import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Building2, Code2, GraduationCap, LayoutTemplate, Plane, Search, Store, Wrench } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const icons = [Building2, Store, LayoutTemplate, GraduationCap, Plane, Code2, Search, Wrench];
const serviceLinks = [
  '/website-company-profile/',
  '/website-umkm/',
  '/landing-page/',
  '/website-sekolah/',
  '/website-travel/',
  '/website-toko-online/',
  null,
  null,
];

const themes = [
  {
    card: 'bg-slate-950',
    soft: 'bg-white/10',
    line: 'bg-white/20',
    text: 'text-white',
    muted: 'text-slate-300',
    accent: 'text-brand-300',
    blob: 'bg-brand-500/25',
  },
  {
    card: 'bg-gradient-to-br from-[#0b4f8a] via-[#1769d1] to-[#6d5ce7]',
    soft: 'bg-white/12',
    line: 'bg-white/25',
    text: 'text-white',
    muted: 'text-blue-100',
    accent: 'text-white',
    blob: 'bg-white/10',
  },
  {
    card: 'bg-gradient-to-br from-[#22204d] via-[#5146b8] to-[#8e6bd6]',
    soft: 'bg-white/12',
    line: 'bg-white/25',
    text: 'text-white',
    muted: 'text-violet-100',
    accent: 'text-violet-100',
    blob: 'bg-fuchsia-300/10',
  },
  {
    card: 'bg-gradient-to-br from-[#eff6ff] via-white to-[#dbeafe]',
    soft: 'bg-brand-100',
    line: 'bg-brand-200',
    text: 'text-slate-950',
    muted: 'text-slate-500',
    accent: 'text-brand-600',
    blob: 'bg-brand-200/60',
  },
  {
    card: 'bg-gradient-to-br from-[#172033] via-[#22355a] to-[#315b91]',
    soft: 'bg-white/10',
    line: 'bg-white/20',
    text: 'text-white',
    muted: 'text-slate-300',
    accent: 'text-blue-200',
    blob: 'bg-blue-400/10',
  },
  {
    card: 'bg-gradient-to-br from-[#f5f3ff] via-white to-[#e0e7ff]',
    soft: 'bg-violet-100',
    line: 'bg-violet-200',
    text: 'text-slate-950',
    muted: 'text-slate-500',
    accent: 'text-violet-600',
    blob: 'bg-violet-200/70',
  },
  {
    card: 'bg-gradient-to-br from-[#e0f2fe] via-white to-[#dbeafe]',
    soft: 'bg-sky-100',
    line: 'bg-sky-200',
    text: 'text-slate-950',
    muted: 'text-slate-500',
    accent: 'text-sky-700',
    blob: 'bg-sky-300/60',
  },
  {
    card: 'bg-gradient-to-br from-[#0f172a] via-[#12346b] to-[#1d4ed8]',
    soft: 'bg-white/10',
    line: 'bg-white/20',
    text: 'text-white',
    muted: 'text-blue-100',
    accent: 'text-blue-200',
    blob: 'bg-blue-400/15',
  },
];

export default function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="relative py-14 lg:py-18">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-brand-600">Layanan</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-.03em] text-brand-900 sm:text-4xl lg:text-5xl">
              {t.services.title}
            </h2>
          </motion.div>
          <p className="max-w-sm text-sm leading-6 text-slate-500 md:text-right">
            Pilih berdasarkan hal yang paling perlu Anda jelaskan kepada pelanggan—bukan sekadar jenis halaman.
          </p>
        </div>

        <div className="mt-9 grid gap-4 lg:grid-cols-12">
          {t.services.items.map((service, index) => {
            const Icon = icons[index];
            const theme = themes[index];
            const featured = index === 0;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={featured ? 'lg:col-span-6' : 'lg:col-span-3'}
              >
                <a
                  href={serviceLinks[index] ?? '#contact'}
                  className={`group relative isolate flex h-full min-h-[260px] flex-col overflow-hidden rounded-[1.8rem] p-6 shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${theme.card}`}
                >
                  <div className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl ${theme.blob}`} />
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${theme.soft} ${theme.accent}`}>
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </div>
                    <span className={`text-xs font-semibold tracking-[.16em] opacity-60 ${theme.text}`}>0{index + 1}</span>
                  </div>

                  <div className="relative z-10 mt-7 flex-1">
                    {featured ? (
                      <div className="rounded-2xl border border-white/10 bg-white/[.06] p-4">
                        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                          <span className="h-2 w-2 rounded-full bg-white/40" />
                          <span className="h-2 w-2 rounded-full bg-white/25" />
                          <span className="h-2 w-2 rounded-full bg-white/15" />
                          <span className="ml-auto text-[9px] uppercase tracking-[.16em] text-white/45">Business profile</span>
                        </div>
                        <div className="mt-4 grid grid-cols-[1.1fr_.9fr] gap-3">
                          <div className="rounded-xl bg-white p-4">
                            <div className="h-2 w-20 rounded-full bg-slate-200" />
                            <div className="mt-2 h-2 w-28 rounded-full bg-slate-100" />
                            <div className="mt-5 h-16 rounded-lg bg-brand-50" />
                          </div>
                          <div className="rounded-xl bg-brand-500/20 p-4">
                            <div className="h-2 w-16 rounded-full bg-white/45" />
                            <div className="mt-4 h-2 w-full rounded-full bg-white/10" />
                            <div className="mt-2 h-2 w-4/5 rounded-full bg-white/10" />
                            <div className="mt-6 h-8 rounded-full bg-white/15" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-6">
                        <div className={`mb-3 h-1.5 w-20 rounded-full ${theme.line}`} />
                        <div className={`h-1.5 w-32 rounded-full opacity-70 ${theme.line}`} />
                      </div>
                    )}

                    <h3 className={`text-xl font-bold tracking-tight ${theme.text} ${featured ? 'sm:text-2xl mt-5' : ''}`}>
                      {service.title}
                    </h3>
                  </div>

                  <div className={`relative z-10 mt-5 inline-flex items-center gap-2 text-sm font-semibold ${theme.accent}`}>
                    {serviceLinks[index] ? 'Lihat layanan' : 'Diskusikan kebutuhan'}
                    <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
