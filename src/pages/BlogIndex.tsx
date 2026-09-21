import React from 'react';
import { ArrowRight } from 'lucide-react';
import { blogSeoPosts } from '../data/blogSeoPosts';

export default function BlogIndex() {
  return (
    <div className="bg-white text-brand-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 lg:px-8">
          <a href="/" className="font-semibold tracking-tight">Nakama Digital</a>
          <a href="/#contact" className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Konsultasi</a>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-14 lg:px-8 lg:py-20">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <a href="/" className="hover:text-brand-700">Nakama Digital</a>
          <span>/</span>
          <span className="text-slate-700">Blog</span>
        </nav>
        <p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">Panduan website</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Panduan Website untuk Bisnis</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Artikel praktis untuk membantu bisnis, UMKM, sekolah, travel, dan organisasi memahami kebutuhan website sebelum memulai proyek.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {blogSeoPosts.map((post) => (
            <a key={post.slug} href={`/blog/${post.slug}/`} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl">
              <p className="text-sm font-semibold text-brand-600">{post.keyword}</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight">{post.headline}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{post.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">Baca artikel <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
            </a>
          ))}
        </div>
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-8 text-sm text-slate-500 lg:px-8">
          <a href="/" className="font-medium text-slate-700 hover:text-brand-600">Kembali ke website utama</a>
        </div>
      </footer>
    </div>
  );
}
