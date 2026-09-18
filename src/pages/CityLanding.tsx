import { useEffect } from 'react';
import { ArrowRight, Check, ChevronDown, Globe2, MessageCircle, Search, Smartphone, Store, Building2, GraduationCap, BriefcaseBusiness, MapPin } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getLocalSeoCity, localSeoCities } from '../data/localSeoCities';

const WHATSAPP_NUMBER = '6285820830530';

const icons = [Store, BriefcaseBusiness, Smartphone, GraduationCap];

export default function CityLanding() {
  const { citySlug = '' } = useParams();
  const city = getLocalSeoCity(citySlug);

  useEffect(() => {
    if (!city) return;

    const title = `${city.primaryKeyword} | Nakama Digital`;
    const description = `${city.primaryKeyword} untuk bisnis, UMKM, toko, jasa, sekolah, yayasan, dan perusahaan. Website profesional, mobile-friendly, SEO-ready, dan terhubung WhatsApp.`;
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('robots', 'index,follow');

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = new URL(`/${city.slug}/`, window.location.origin).href;

    const schemaId = 'local-seo-city-schema';
    document.getElementById(schemaId)?.remove();
    const schema = document.createElement('script');
    schema.id = schemaId;
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: city.primaryKeyword,
      provider: {
        '@type': 'Organization',
        name: 'Nakama Digital',
        url: window.location.origin,
      },
      areaServed: {
        '@type': 'City',
        name: city.city,
      },
      serviceType: 'Website design and development',
    });
    document.head.appendChild(schema);

    const faqSchemaId = 'local-seo-faq-schema';
    document.getElementById(faqSchemaId)?.remove();
    const faqSchema = document.createElement('script');
    faqSchema.id = faqSchemaId;
    faqSchema.type = 'application/ld+json';
    faqSchema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: city.faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    });
    document.head.appendChild(faqSchema);

    return () => {
      document.getElementById(schemaId)?.remove();
      document.getElementById(faqSchemaId)?.remove();
    };
  }, [city]);

  if (!city) {
    return (
      <main className="min-h-screen bg-white px-5 py-24 text-center text-slate-900">
        <h1 className="text-3xl font-bold">Halaman kota tidak ditemukan</h1>
        <a href="/" className="mt-6 inline-flex rounded-full bg-brand-600 px-6 py-3 font-semibold text-white">Kembali ke Nakama Digital</a>
      </main>
    );
  }

  const whatsapp = (message: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <div className="bg-white text-brand-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="Nakama Digital">
            <img src="/assets/logo/logo.svg" alt="Nakama Digital" className="h-9 w-auto" />
            <span className="hidden text-sm font-semibold tracking-tight sm:block">Nakama Digital</span>
          </a>
          <a href={whatsapp(`Halo Nakama Digital, saya ingin konsultasi website untuk bisnis saya di ${city.city}.`)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700">Konsultasi Gratis</a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,.16),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(96,146,255,.12),transparent_38%)]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:py-28">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[.18em] text-brand-600"><MapPin size={15} />{city.eyebrow}</p>
              <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-[-.04em] sm:text-5xl lg:text-6xl">{city.headline}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{city.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={whatsapp(`Halo Nakama Digital, saya ingin konsultasi ${city.primaryKeyword}.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700">Konsultasi Website Gratis <ArrowRight size={18} /></a>
                <a href="#kebutuhan" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-800 transition hover:border-brand-300 hover:text-brand-700">Lihat Kebutuhan Website</a>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                {['Mobile Friendly', 'SEO Ready', 'Terhubung WhatsApp', 'Desain Sesuai Bisnis'].map((item) => <span key={item} className="inline-flex items-center gap-1.5"><Check size={15} className="text-brand-600" />{item}</span>)}
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 shadow-2xl shadow-slate-900/10">
              <div className="rounded-2xl bg-white p-5">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-4"><div className="h-2.5 w-2.5 rounded-full bg-slate-200" /><div className="h-2.5 w-2.5 rounded-full bg-slate-200" /><div className="h-2.5 w-2.5 rounded-full bg-slate-200" /><span className="ml-auto text-xs text-slate-400">website bisnis · {city.city}</span></div>
                <div className="py-10"><p className="text-xs font-semibold uppercase tracking-widest text-brand-600">{city.city}</p><h2 className="mt-3 text-3xl font-bold tracking-tight">Lebih mudah ditemukan. Lebih mudah dipercaya.</h2><p className="mt-4 leading-7 text-slate-500">Profil, layanan, produk, lokasi, dan kontak bisnis Anda dalam satu tempat.</p><div className="mt-7 h-2 w-32 rounded-full bg-brand-600" /></div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">Kenapa website?</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Bisnis Anda sudah ada. Sekarang beri tempat resminya di internet.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">{city.localContext}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Lebih Profesional', 'Miliki halaman resmi untuk memperkenalkan bisnis dan layanan Anda.', Globe2],
              ['Lebih Mudah Ditemukan', 'Website dengan struktur SEO-friendly dapat membantu pencarian organik.', Search],
              ['Meningkatkan Kepercayaan', 'Tampilkan profil, produk, portofolio, lokasi, dan kontak secara rapi.', Building2],
              ['Langsung ke WhatsApp', 'Permudah calon pelanggan menghubungi bisnis Anda.', MessageCircle],
            ].map(([title, text, Icon]) => <div key={title as string} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6"><div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700"><Icon size={21} /></div><h3 className="font-bold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text as string}</p></div>)}
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold uppercase tracking-[.16em] text-brand-600">Fokus lokal</p>
            <h3 className="mt-2 text-xl font-bold tracking-tight">Website untuk kebutuhan bisnis dan organisasi di {city.city}</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {city.localHighlights.map((item) => <div key={item} className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">{item}</div>)}
            </div>
          </div>
        </section>

        <section className="bg-slate-50" id="kebutuhan">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
            <div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">Kebutuhan website</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Pilih website sesuai kebutuhan bisnis di {city.city}</h2></div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {city.services.map((service, index) => {
                const Icon = icons[index % icons.length];
                return <a key={service.title} href={whatsapp(`Halo Nakama Digital, saya tertarik dengan ${service.title} untuk bisnis saya di ${city.city}.`)} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5"><Icon className="text-brand-600" size={25} /><h3 className="mt-5 font-bold">{service.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">Konsultasi <ArrowRight size={15} className="transition group-hover:translate-x-1" /></span></a>;
              })}
            </div>
          </div>
        </section>

        <section id="portfolio" className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">Portfolio</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Pilih tampilan website yang sesuai dengan bisnis Anda</h2><p className="mt-3 leading-7 text-slate-600">Kami menyiapkan beberapa referensi template untuk membantu Anda menentukan arah website. Pilih template yang paling dekat dengan kebutuhan bisnis Anda, lalu kami sesuaikan isi, warna, foto, dan identitas brand Anda.</p></div><a href="/#portfolio" className="inline-flex shrink-0 items-center gap-2 font-semibold text-brand-600">Lihat portfolio lengkap <ArrowRight size={17} /></a></div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[
              { name: 'LuxeNest', category: 'Interior · Architecture', slug: 'luxenest', url: 'https://demos.sitepad.com/LuxeNest/' },
              { name: 'Mansion', category: 'Property · Hotel · Villa', slug: 'mansion', url: 'https://demos.sitepad.com/Mansion/' },
              { name: 'Travio', category: 'Travel · Tour Agency', slug: 'travio', url: 'https://demos.sitepad.com/Travio/' },
              { name: 'Zentro', category: 'Restaurant · Café', slug: 'zentro', url: 'https://demos.sitepad.com/ZENTRO/' },
              { name: 'Nesto', category: 'Property · Developer', slug: 'nesto', url: 'https://demos.sitepad.com/Nesto/' },
              { name: 'Therapeutic', category: 'Clinic · Doctor · Healthcare', slug: 'therapeutic', url: 'https://demos.sitepad.com/Therapeutic/' },
            ].map((demo) => (
              <a
                key={demo.name}
                href={demo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={`https://s5.softaculous.com/a/sitepad/files/themes/${demo.slug}/screenshot.jpg`}
                    alt={`${demo.name} website demo preview`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-slate-950/80 to-transparent px-5 pb-4 pt-10">
                    <span className="text-xs font-semibold uppercase tracking-[.15em] text-white/85">Live Demo</span>
                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-900">Buka ↗</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold tracking-tight">{demo.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{demo.category}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="bg-slate-950 text-white">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8"><div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-300">Proses sederhana</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Dari ide sampai website online.</h2></div><div className="mt-10 grid gap-8 md:grid-cols-4">{[['01','Konsultasi','Ceritakan bisnis dan kebutuhan Anda.'],['02','Kami Buat','Struktur dan desain disesuaikan dengan bisnis Anda.'],['03','Review','Anda melihat hasil dan memberikan masukan.'],['04','Online','Website siap digunakan untuk bisnis Anda.']].map(([n,title,text]) => <div key={n}><span className="text-sm font-semibold text-brand-300">{n}</span><h3 className="mt-3 text-xl font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p></div>)}</div></div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">Kota lain</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight">Lihat layanan Nakama Digital di kota lain</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {Object.values(localSeoCities).filter((item) => item.slug !== city.slug).map((item) => (
                <a key={item.slug} href={`/${item.slug}/`} className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-brand-300 hover:text-brand-700">Website {item.city} <ArrowRight size={15} /></a>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-16 lg:px-8" id="faq">
          <div className="text-center"><p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">FAQ {city.city}</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Pertanyaan yang sering ditanyakan</h2></div>
          <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200">{city.faqs.map(({q,a}) => <details key={q} className="group p-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">{q}<ChevronDown size={18} className="shrink-0 transition group-open:rotate-180" /></summary><p className="mt-3 max-w-3xl pr-8 text-sm leading-6 text-slate-600">{a}</p></details>)}</div>
        </section>

        <section className="px-5 pb-16 lg:px-8"><div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-brand-600 px-6 py-12 text-center text-white sm:px-12"><h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Butuh website untuk bisnis di {city.city}?</h2><p className="mx-auto mt-4 max-w-2xl text-brand-100">Ceritakan jenis bisnis dan kebutuhan Anda. Kami akan membantu menentukan struktur website yang sesuai.</p><a href={whatsapp(`Halo Nakama Digital, saya ingin konsultasi website untuk bisnis saya di ${city.city}.`)} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-brand-700 shadow-xl transition hover:bg-brand-50">Chat WhatsApp <MessageCircle size={18} /></a></div></section>
      </main>

      <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8"><span>© {new Date().getFullYear()} Nakama Digital · {city.city}</span><a href="/" className="font-medium text-slate-700 hover:text-brand-600">Kembali ke website utama</a></div></footer>
    </div>
  );
}
