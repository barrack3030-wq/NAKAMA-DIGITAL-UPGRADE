import React from 'react';
import { LanguageProvider } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage({ english = false }: { english?: boolean }) {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#FDFDFF] text-brand-900">
        <Navbar />
        <main className="pt-20">
          <section className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-24">
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-brand-600">{english ? 'About Nakama Digital' : 'Tentang Nakama Digital'}</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{english ? 'Website development for businesses in Indonesia' : 'Layanan website untuk bisnis di Indonesia'}</h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">{english ? 'Nakama Digital is an Indonesia-based website development service helping businesses, SMEs, schools, travel companies, and organizations build a clear and useful online presence.' : 'Nakama Digital adalah layanan pengembangan website berbasis Indonesia yang membantu bisnis, UMKM, sekolah, travel, dan organisasi membangun kehadiran online yang jelas dan berguna.'}</p>
            </div>
          </section>
          <section className="border-b border-slate-100 bg-slate-50">
            <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
              <div className="grid gap-8 md:grid-cols-3">
                <div><h2 className="text-xl font-bold">Website sesuai kebutuhan</h2><p className="mt-2 leading-7 text-slate-600">{english ? 'Company profiles, SME websites, landing pages, school websites, travel websites, and online stores.' : 'Company profile, website UMKM, landing page, website sekolah, website travel, dan toko online.'}</p></div>
                <div><h2 className="text-xl font-bold">Fokus lokal</h2><p className="mt-2 leading-7 text-slate-600">{english ? 'We create pages that speak to local markets, with city-focused content where it is useful.' : 'Kami menyusun halaman yang relevan dengan pasar lokal, termasuk konten berbasis kota ketika memang dibutuhkan.'}</p></div>
                <div><h2 className="text-xl font-bold">Siap dipasarkan</h2><p className="mt-2 leading-7 text-slate-600">{english ? 'Responsive, lightweight structures are prepared to support search visibility and digital marketing.' : 'Struktur yang responsif dan ringan disiapkan agar mendukung visibilitas pencarian dan pemasaran digital.'}</p></div>
              </div>
            </div>
          </section>
          <section>
            <div className="mx-auto max-w-4xl px-6 py-14 lg:px-8 lg:py-20">
              <h2 className="text-3xl font-bold">{english ? 'Explore our work and services' : 'Lihat layanan dan project kami'}</h2>
              <p className="mt-3 leading-7 text-slate-600">{english ? 'Explore the service pages, portfolio, city pages, and practical website guides published on this site.' : 'Lihat halaman layanan, portfolio, halaman kota, dan panduan website praktis yang tersedia di website ini.'}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold hover:border-brand-300" href="/website-company-profile/">Website Company Profile</a>
                <a className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold hover:border-brand-300" href="/website-umkm/">Website UMKM</a>
                <a className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold hover:border-brand-300" href="/portfolio/">Portfolio</a>
                <a className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold hover:border-brand-300" href="/blog/">Panduan Website</a>
                <a className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold hover:border-brand-300" href="https://wa.me/6285820830530?text=Halo%20Nakama%20Digital,%20saya%20ingin%20konsultasi%20website.">Konsultasi</a>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
