import { useEffect } from 'react';
import { ArrowRight, Check, ChevronDown, Globe2, MessageCircle, Search, Smartphone, Store, Building2, GraduationCap, BriefcaseBusiness } from 'lucide-react';

const WHATSAPP = 'https://wa.me/6285820830530?text=Halo%20Nakama%20Digital,%20saya%20ingin%20konsultasi%20website%20untuk%20bisnis%20saya%20di%20Luwuk.';

const faqs = [
  { q: 'Apakah Nakama Digital melayani pembuatan website untuk bisnis di Luwuk?', a: 'Ya. Website dapat dibuat untuk berbagai jenis bisnis dan organisasi yang membutuhkan kehadiran digital profesional.' },
  { q: 'Apakah website bisa terhubung ke WhatsApp?', a: 'Ya. Tombol WhatsApp dapat ditempatkan pada bagian strategis agar calon pelanggan dapat menghubungi bisnis secara langsung.' },
  { q: 'Apakah website bisa muncul di Google?', a: 'Website dapat dibuat dengan struktur teknis dan konten yang SEO-friendly. Namun, posisi tertentu di hasil pencarian Google tidak dapat dijamin karena ranking dipengaruhi banyak faktor.' },
  { q: 'Apakah website bisa dibuka melalui HP?', a: 'Ya. Website dirancang responsive agar nyaman digunakan pada smartphone, tablet, dan desktop.' },
  { q: 'Saya belum tahu website seperti apa yang saya butuhkan. Bagaimana?', a: 'Ceritakan saja jenis bisnis, layanan, dan tujuan Anda. Kami akan membantu menentukan struktur website yang sesuai.' },
];

export default function LuwukLanding() {
  useEffect(() => {
    const title = 'Jasa Pembuatan Website Luwuk untuk Bisnis & UMKM | Nakama Digital';
    const description = 'Jasa pembuatan website Luwuk untuk bisnis, UMKM, toko, jasa, sekolah, yayasan, dan perusahaan. Website profesional, mobile-friendly, SEO-ready, dan terhubung WhatsApp.';
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(\`meta[name="\${name}"]\`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('description', description);
    setMeta('robots', 'index,follow');

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = new URL('/jasa-pembuatan-website-luwuk/', window.location.origin).href;

    const schemaId = 'luwuk-faq-schema';
    document.getElementById(schemaId)?.remove();
    const schema = document.createElement('script');
    schema.id = schemaId;
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    });
    document.head.appendChild(schema);
    return () => document.getElementById(schemaId)?.remove();
  }, []);

  return (
    <div className="bg-white text-brand-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="Nakama Digital">
            <img src="/assets/logo/logo.svg" alt="Nakama Digital" className="h-9 w-auto" />
            <span className="hidden text-sm font-semibold tracking-tight sm:block">Nakama Digital</span>
          </a>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700">Konsultasi Gratis</a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,.16),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(96,146,255,.12),transparent_38%)]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:py-28">
            <div>
              <p className="mb-5 text-sm font-semibold uppercase tracking-[.18em] text-brand-600">Untuk bisnis di Luwuk</p>
              <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-[-.04em] sm:text-5xl lg:text-6xl">Halo Warga Luwuk, Saatnya Bisnis Anda Tampil Lebih Profesional di Internet</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Buat bisnis Anda lebih mudah dikenal, dipercaya, dan ditemukan di internet dengan website profesional dari Nakama Digital.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700">Konsultasi Website Gratis <ArrowRight size={18} /></a>
                <a href="#portfolio" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-800 transition hover:border-brand-300 hover:text-brand-700">Lihat Contoh Website</a>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                {['Mobile Friendly', 'SEO Ready', 'Terhubung WhatsApp', 'Desain Sesuai Bisnis'].map((item) => <span key={item} className="inline-flex items-center gap-1.5"><Check size={15} className="text-brand-600" />{item}</span>)}
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 shadow-2xl shadow-slate-900/10">
              <div className="rounded-2xl bg-white p-5">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-4"><div className="h-2.5 w-2.5 rounded-full bg-slate-200" /><div className="h-2.5 w-2.5 rounded-full bg-slate-200" /><div className="h-2.5 w-2.5 rounded-full bg-slate-200" /><span className="ml-auto text-xs text-slate-400">website bisnis</span></div>
                <div className="py-10"><p className="text-xs font-semibold uppercase tracking-widest text-brand-600">Your Business</p><h2 className="mt-3 text-3xl font-bold tracking-tight">Lebih mudah ditemukan. Lebih mudah dipercaya.</h2><p className="mt-4 leading-7 text-slate-500">Profil, layanan, produk, lokasi, dan kontak bisnis Anda dalam satu tempat.</p><div className="mt-7 h-2 w-32 rounded-full bg-brand-600" /></div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
          <div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">Kenapa website?</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Bisnis Anda sudah ada. Sekarang beri tempat resminya di internet.</h2></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Lebih Profesional', 'Miliki halaman resmi untuk memperkenalkan bisnis dan layanan Anda.', Globe2],
              ['Lebih Mudah Ditemukan', 'Website dengan struktur SEO-friendly dapat membantu pencarian organik.', Search],
              ['Meningkatkan Kepercayaan', 'Tampilkan profil, produk, portofolio, lokasi, dan kontak secara rapi.', Building2],
              ['Langsung ke WhatsApp', 'Permudah calon pelanggan menghubungi bisnis Anda.', MessageCircle],
            ].map(([title, text, Icon]) => <div key={title as string} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6"><div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700"><Icon size={21} /></div><h3 className="font-bold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text as string}</p></div>)}
          </div>
        </section>

        <section className="bg-slate-50" id="kebutuhan">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
            <div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">Pilih kebutuhan</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Website untuk kebutuhan bisnis Anda</h2></div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                ['Website UMKM & Toko', 'Produk, katalog, lokasi, dan WhatsApp.', Store],
                ['Company Profile', 'Profil perusahaan, layanan, dan portofolio.', BriefcaseBusiness],
                ['Landing Page', 'Fokus promosi satu produk, jasa, atau campaign.', Smartphone],
                ['Sekolah & Yayasan', 'Profil lembaga, program, fasilitas, dan informasi.', GraduationCap],
              ].map(([title, text, Icon]) => <a key={title as string} href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5"><Icon className="text-brand-600" size={25} /><h3 className="mt-5 font-bold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text as string}</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">Saya butuh ini <ArrowRight size={15} className="transition group-hover:translate-x-1" /></span></a>)}
            </div>
          </div>
        </section>

        <section id="portfolio" className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">Portfolio</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Lihat contoh website yang kami buat</h2><p className="mt-3 leading-7 text-slate-600">Gunakan portfolio dari website utama Nakama Digital untuk melihat berbagai pendekatan desain dan kebutuhan bisnis.</p></div><a href="/#portfolio" className="inline-flex shrink-0 items-center gap-2 font-semibold text-brand-600">Lihat portfolio lengkap <ArrowRight size={17} /></a></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {['Company Profile', 'UMKM & Toko', 'Landing Page'].map((item) => <a key={item} href="/#portfolio" className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"><div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-8"><div className="w-full rounded-xl bg-white p-5 shadow-xl transition group-hover:-translate-y-1"><div className="h-2 w-20 rounded bg-brand-600" /><div className="mt-4 h-3 w-3/4 rounded bg-slate-200" /><div className="mt-2 h-3 w-1/2 rounded bg-slate-100" /><div className="mt-7 grid grid-cols-3 gap-2"><span className="h-12 rounded bg-slate-100" /><span className="h-12 rounded bg-slate-100" /><span className="h-12 rounded bg-slate-100" /></div></div></div><div className="p-5 font-semibold">{item} <span className="float-right text-brand-600">↗</span></div></a>)}
          </div>
        </section>

        <section className="bg-slate-950 text-white">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8"><div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-300">Proses sederhana</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Dari ide sampai website online.</h2></div><div className="mt-10 grid gap-8 md:grid-cols-4">{[['01','Konsultasi','Ceritakan bisnis dan kebutuhan Anda.'],['02','Kami Buat','Struktur dan desain disesuaikan dengan bisnis Anda.'],['03','Review','Anda melihat hasil dan memberikan masukan.'],['04','Online','Website siap digunakan untuk bisnis Anda.']].map(([n,title,text]) => <div key={n}><span className="text-sm font-semibold text-brand-300">{n}</span><h3 className="mt-3 text-xl font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p></div>)}</div></div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-16 lg:px-8" id="faq"><div className="text-center"><p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">FAQ</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Pertanyaan yang sering ditanyakan</h2></div><div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200">{faqs.map(({q,a}) => <details key={q} className="group p-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">{q}<ChevronDown size={18} className="shrink-0 transition group-open:rotate-180" /></summary><p className="mt-3 max-w-3xl pr-8 text-sm leading-6 text-slate-600">{a}</p></details>)}</div></section>

        <section className="px-5 pb-16 lg:px-8"><div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-brand-600 px-6 py-12 text-center text-white sm:px-12"><h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Sudah siap membuat bisnis Anda tampil lebih profesional?</h2><p className="mx-auto mt-4 max-w-2xl text-brand-100">Tidak perlu bingung menentukan jenis website atau fitur yang Anda perlukan. Ceritakan bisnis Anda kepada kami.</p><a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-brand-700 shadow-xl transition hover:bg-brand-50">Chat WhatsApp <MessageCircle size={18} /></a></div></section>
      </main>

      <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8"><span>© {new Date().getFullYear()} Nakama Digital</span><a href="/" className="font-medium text-slate-700 hover:text-brand-600">Kembali ke website utama</a></div></footer>
    </div>
  );
}
