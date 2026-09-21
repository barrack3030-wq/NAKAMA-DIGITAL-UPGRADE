import React from 'react';
import { ArrowUpRight, Check, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

const WA = 'https://wa.me/6285820830530?text=Halo%20Nakama%20Digital,%20saya%20ingin%20konsultasi%20website.';

export default function HomeExperience() {
  const { lang, t } = useLanguage();
  const en = lang === 'en';

  const services = en
    ? [
        ['Company Profile', 'For companies, organizations, and professional services.', '/website-company-profile/'],
        ['SME Website', 'A clear online home for shops, food businesses, and local brands.', '/website-umkm/'],
        ['Landing Page', 'Focused pages for campaigns, ads, launches, and offers.', '/landing-page/'],
        ['School Website', 'Information and admissions pages that are easy to navigate.', '/website-sekolah/'],
        ['Travel Website', 'Present tours, private trips, and travel services clearly.', '/website-travel/'],
        ['Online Store', 'A practical storefront for products and online sales.', '/website-toko-online/'],
      ]
    : [
        ['Website Company Profile', 'Untuk perusahaan, organisasi, dan layanan profesional.', '/website-company-profile/'],
        ['Website UMKM', 'Rumah online yang jelas untuk toko, kuliner, dan bisnis lokal.', '/website-umkm/'],
        ['Landing Page', 'Halaman fokus untuk promosi, iklan, campaign, dan penawaran.', '/landing-page/'],
        ['Website Sekolah', 'Informasi dan pendaftaran sekolah yang mudah dinavigasi.', '/website-sekolah/'],
        ['Website Travel', 'Tampilkan paket, private trip, dan layanan travel dengan jelas.', '/website-travel/'],
        ['Toko Online', 'Etalase praktis untuk produk dan penjualan secara online.', '/website-toko-online/'],
      ];

  const tags = en
    ? ['Company Profile', 'SME', 'Landing Page', 'School', 'Travel', 'Online Store']
    : ['Company Profile', 'UMKM', 'Landing Page', 'Sekolah', 'Travel', 'Toko Online'];

  return (
    <main className="pb-10">
      <section className="relative overflow-hidden border-b border-slate-200/70">
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-28 lg:px-8 lg:pb-20 lg:pt-32">
          <div className="grid items-end gap-12 lg:grid-cols-[1.18fr_.82fr]">
            <div>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-semibold uppercase tracking-[.2em] text-brand-600">
                {en ? 'Web design · development · SEO' : 'Web design · development · SEO'}
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mt-6 max-w-5xl text-balance text-5xl font-bold uppercase tracking-[-.055em] leading-[.94] text-brand-900 sm:text-7xl lg:text-[6.2rem]">
                {t.hero.title1} <span className="text-brand-500">{t.hero.titleHighlight}</span>
              </motion.h1>
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-800">
                  {t.hero.cta1} <ArrowUpRight size={17} />
                </a>
                <a href="/website-company-profile/" className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-brand-900 underline decoration-brand-300 underline-offset-4 hover:text-brand-600">
                  {t.hero.cta2} <ArrowUpRight size={16} />
                </a>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="relative">
              <div className="absolute -inset-10 rounded-full bg-brand-300/15 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] bg-brand-900 p-3 shadow-2xl">
                <div className="rounded-[1.4rem] bg-white p-4 sm:p-5">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                    <span className="ml-auto text-[10px] font-medium uppercase tracking-[.16em] text-slate-400">Nakama Digital</span>
                  </div>
                  <div className="mt-4 grid grid-cols-[.9fr_1.1fr] gap-3">
                    <div className="rounded-2xl bg-brand-900 p-5 text-white">
                      <p className="text-[10px] uppercase tracking-[.18em] text-brand-200">Website</p>
                      <p className="mt-5 text-2xl font-bold leading-none">{en ? 'Built to be noticed.' : 'Dibuat untuk terlihat.'}</p>
                      <p className="mt-3 text-xs leading-5 text-brand-100">{en ? 'Clean structure. Strong first impression.' : 'Struktur rapi. Kesan pertama yang kuat.'}</p>
                    </div>
                    <div className="rounded-2xl bg-gradient-to-br from-brand-100 via-white to-blue-50 p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-brand-600">01</p>
                      <p className="mt-4 text-3xl font-bold tracking-tight text-slate-950">Design</p>
                      <div className="mt-8 space-y-2">
                        <div className="h-2 w-3/4 rounded-full bg-brand-200" />
                        <div className="h-2 w-1/2 rounded-full bg-slate-200" />
                        <div className="h-2 w-2/3 rounded-full bg-slate-200" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-wrap gap-2">
                      {tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-600">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_.9fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-brand-600">{en ? 'Introduction' : 'Pengenalan'}</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-[-.04em] text-brand-900 sm:text-5xl">
              {en ? 'A website should make your business easier to understand.' : 'Website seharusnya membuat bisnis Anda lebih mudah dipahami.'}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{t.hero.desc}</p>
            <a href="/website-company-profile/" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 underline decoration-brand-200 underline-offset-4">
              {en ? 'Explore our services' : 'Lihat layanan kami'} <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="flex items-end">
            <div className="w-full rounded-[2rem] bg-slate-100 p-4 sm:p-5">
              <div className="rounded-[1.5rem] bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[.18em] text-brand-600">{en ? 'Built around your business' : 'Dibuat mengikuti bisnis Anda'}</span>
                  <span className="text-xs text-slate-400">02</span>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {[
                    en ? ['Fast', 'Lightweight structure'] : ['Cepat', 'Struktur ringan'],
                    en ? ['Responsive', 'Comfortable on mobile'] : ['Responsif', 'Nyaman di mobile'],
                    en ? ['SEO Ready', 'Clear page structure'] : ['SEO Ready', 'Struktur halaman jelas'],
                    en ? ['WhatsApp', 'Easy to contact'] : ['WhatsApp', 'Mudah dihubungi'],
                  ].map(([title, text]) => (
                    <div key={title} className="rounded-2xl border border-slate-200 p-4">
                      <p className="text-sm font-semibold text-slate-900">{title}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-b border-slate-200 bg-brand-900 py-4 text-white">
        <div className="flex min-w-max gap-8 px-6 text-sm font-medium uppercase tracking-[.14em]">
          {[...tags, ...tags].map((tag, index) => <span key={tag + index} className="inline-flex items-center gap-8"><span>{tag}</span><span className="text-brand-400">✦</span></span>)}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-brand-600">{en ? 'Core services' : 'Layanan utama'}</p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-.04em] text-brand-900 sm:text-5xl">{en ? 'Choose the website your business actually needs.' : 'Pilih website yang memang dibutuhkan bisnis Anda.'}</h2>
          </div>
          <a href="/website-company-profile/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600">Lihat semua layanan <ArrowUpRight size={16} /></a>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map(([title, text, href], index) => (
            <a key={title} href={href} className="group rounded-[1.6rem] border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-900/5">
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold tracking-[.16em] text-slate-400">0{index + 1}</span>
                <ArrowUpRight size={18} className="text-slate-300 transition group-hover:text-brand-600" />
              </div>
              <h3 className="mt-10 text-2xl font-bold tracking-tight text-brand-900">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-brand-600">
                {en ? 'View service' : 'Lihat layanan'} <ArrowUpRight size={15} />
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="px-6 pb-4 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] bg-brand-500 px-6 py-12 text-white sm:px-12 lg:py-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.2em] text-brand-100">{en ? 'Start a project' : 'Mulai proyek'}</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-[-.03em] sm:text-5xl">
                {en ? 'Tell us what you need. We will help shape the right website.' : 'Ceritakan kebutuhan Anda. Kami bantu bentuk website yang tepat.'}
              </h2>
            </div>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-brand-700 transition hover:bg-brand-50">
              {en ? 'Talk on WhatsApp' : 'Konsultasi via WhatsApp'} <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
