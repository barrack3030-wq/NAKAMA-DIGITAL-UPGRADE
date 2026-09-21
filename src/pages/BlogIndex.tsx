import React from 'react';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogSeoPosts } from '../data/blogSeoPosts';

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[#FDFDFF] text-brand-900">
      <Navbar />
      <main className="relative overflow-hidden pt-28">
        <div className="absolute inset-x-0 top-0 h-[420px] bg-brand-50/70 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 lg:px-8 lg:pb-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-500">
            <a href="/" className="transition hover:text-brand-700">Nakama Digital</a>
            <span>/</span>
            <span className="text-slate-700">Blog</span>
          </nav>

          <div className="mx-auto max-w-3xl py-12 text-center lg:py-16">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-brand-600">Panduan website</p>
            <h1 className="mt-4 text-4xl font-bold tracking-[-.035em] sm:text-5xl lg:text-6xl">Panduan Website untuk Bisnis</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Artikel praktis untuk membantu Anda menentukan jenis website, struktur halaman, dan kebutuhan proyek sebelum mulai.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {blogSeoPosts.map((post, index) => (
              <a key={post.slug} href={`/blog/${post.slug}/`} className="group flex min-h-[250px] flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[.16em] text-brand-600">0{index + 1}</span>
                  <ArrowRight size={17} className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-brand-600" />
                </div>
                <p className="mt-8 text-xs font-semibold uppercase tracking-[.12em] text-slate-400">{post.keyword}</p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight">{post.headline}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{post.description}</p>
                <span className="mt-auto pt-7 text-sm font-semibold text-brand-700">Baca artikel</span>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
