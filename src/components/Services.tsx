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

const serviceImages = [
  'https://image.thum.io/get/width/1400/crop/900/https://barrack3030-wq.github.io/pelita-dental-luwuk/',
  'https://image.thum.io/get/width/1400/crop/900/https://agenbptoili.my.id/',
  'https://image.thum.io/get/width/1400/crop/900/https://barrack3030-wq.github.io/DEHO-CAFE-/',
  'https://images.unsplash.com/photo-1759643740737-9ba5a2e62332?auto=format&fit=crop&w=1400&q=80',
  'https://image.thum.io/get/width/1400/crop/900/https://www.banggaiwonderland.my.id/',
  'https://images.unsplash.com/photo-1642177977596-36c73531208d?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1784729553968-07da5d7b7c99?auto=format&fit=crop&w=1400&q=80',
  'https://image.thum.io/get/width/1400/crop/900/https://agenbptoili.my.id/',
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
            Pilih jenis website yang paling dekat dengan kebutuhan bisnis Anda.
          </p>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {t.services.items.map((service, index) => {
            const Icon = icons[index];
            const featured = index === 0;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
                className={featured ? 'md:col-span-2 lg:col-span-2' : ''}
              >
                <a
                  href={serviceLinks[index] ?? '#contact'}
                  className="group relative block aspect-[4/3] overflow-hidden rounded-[1.8rem] bg-slate-900 shadow-xl shadow-slate-900/10"
                >
                  <img
                    src={serviceImages[index]}
                    alt={service.title}
                    loading={index < 2 ? 'eager' : 'lazy'}
                    className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  <div className="absolute left-5 top-5 flex items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-brand-600 shadow-sm backdrop-blur">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <span className="rounded-full bg-white/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.16em] text-white backdrop-blur">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 className={featured ? 'text-2xl font-bold tracking-tight text-white sm:text-3xl' : 'text-xl font-bold tracking-tight text-white'}>
                          {service.title}
                        </h3>
                        <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-white/85">
                          {serviceLinks[index] ? 'Lihat layanan' : 'Diskusikan kebutuhan'}
                          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </span>
                      </div>
                    </div>
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
