import React from 'react';
import { motion } from 'motion/react';
import { Building2, Store, LayoutTemplate, GraduationCap, Plane, Code2, Search, Wrench } from 'lucide-react';
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
    <section id="services" className="relative py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-900 text-balance mb-6">
            {t.services.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.services.items.map((service, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl border border-white/60 bg-white/60 backdrop-blur-xl hover:bg-white/80 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(37,99,235,0.08)] hover:-translate-y-1 hover:border-brand-200"
              >
                <a href={serviceLinks[index] ?? '#contact'} className="block p-8">
                  <div className="absolute inset-0 bg-brand-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                  <div className="relative z-10 flex flex-col gap-6">
                    <div className="w-12 h-12 rounded-full bg-brand-100/50 flex items-center justify-center text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h3 className="text-lg font-semibold text-brand-900">
                      {service.title}
                    </h3>
                    {serviceLinks[index] && (
                      <span className="text-sm font-medium text-brand-600">Lihat layanan →</span>
                    )}
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
