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

export default function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="relative py-14 lg:py-18">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }} className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-brand-600">Layanan</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-.03em] text-brand-900 sm:text-4xl lg:text-5xl">{t.services.title}</h2>
          </motion.div>
          <p className="max-w-sm text-sm leading-6 text-slate-500 md:text-right">Mulai dari website sederhana sampai kebutuhan yang lebih spesifik—pilih berdasarkan apa yang perlu dijelaskan kepada pelanggan.</p>
        </div>

        <div className="mt-9 grid gap-4 lg:grid-cols-12">
          {t.services.items.map((service, index) => {
            const Icon = icons[index];
            const featured = index === 0;
            const cardClass = featured
              ? 'group flex min-h-[255px] h-full flex-col justify-between rounded-[1.8rem] bg-slate-950 p-7 text-white shadow-2xl shadow-slate-900/10 transition hover:-translate-y-1'
              : 'group flex min-h-[210px] h-full flex-col rounded-[1.8rem] border border-slate-200 bg-white/75 p-6 shadow-sm backdrop-blur-md transition hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-xl';

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .5, delay: index * .05 }}
                className={featured ? 'lg:col-span-6' : 'lg:col-span-3'}
              >
                <a href={serviceLinks[index] ?? '#contact'} className={cardClass}>
                  <div className="flex items-start justify-between gap-4">
                    <div className={featured ? 'flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-brand-300' : 'flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600'}>
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </div>
                    <span className={featured ? 'text-xs font-semibold tracking-[.16em] text-white/35' : 'text-xs font-semibold tracking-[.16em] text-slate-300'}>0{index + 1}</span>
                  </div>
                  <div className="mt-8">
                    <h3 className={featured ? 'text-2xl font-bold tracking-tight text-white sm:text-3xl' : 'text-lg font-semibold tracking-tight text-brand-900'}>{service.title}</h3>
                    <span className={featured ? 'mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-300' : 'mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600'}>
                      {serviceLinks[index] ? 'Lihat layanan' : 'Diskusikan kebutuhan'}
                      <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
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
