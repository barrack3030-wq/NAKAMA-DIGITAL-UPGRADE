import React, { useEffect } from 'react';
import { ArrowRight, Check, ChevronDown, Globe2, MessageCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getServiceSeoPage } from '../data/serviceSeoPages';
import { localSeoCities } from '../data/localSeoCities';

const WHATSAPP = '6285820830530';

export default function ServiceLanding() {
  const { serviceSlug = '' } = useParams();
  const service = getServiceSeoPage(serviceSlug);

  useEffect(() => {
    if (!service) return;

    document.title = service.title;
    document.documentElement.lang = 'id';

    const setMeta = (selector: string, attributes: Record<string, string>) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        document.head.appendChild(el);
      }
      Object.entries(attributes).forEach(([key, value]) => el!.setAttribute(key, value));
    };

    setMeta('meta[name="description"]', { name: 'description', content: service.description });
    setMeta('meta[name="robots"]', { name: 'robots', content: 'index,follow' });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: service.title });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: service.description });
    setMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });

    const canonicalUrl = `https://nakamadigital.biz.id/${service.slug}/`;
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const schemaIds = ['service-page-schema', 'service-faq-schema', 'service-breadcrumb-schema'];
    schemaIds.forEach((id) => document.getElementById(id)?.remove());

    const appendSchema = (id: string, value: unknown) => {
      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(value);
      document.head.appendChild(script);
    };

    appendSchema('service-page-schema', {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.keyword,
      description: service.description,
      provider: {
        '@type': 'Organization',
        name: 'Nakama Digital',
        url: 'https://nakamadigital.biz.id/',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Indonesia',
      },
      serviceType: service.keyword,
      url: canonicalUrl,
    });

    appendSchema('service-faq-schema', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    });

    appendSchema('service-breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Nakama Digital',
          item: 'https://nakamadigital.biz.id/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: service.keyword,
          item: canonicalUrl,
        },
      ],
    });

    return () => schemaIds.forEach((id) => document.getElementById(id)?.remove());
  }, [service]);

  if (!service) {
    return (
      <main className="min-h-screen bg-white px-5 py-24 text-center text-slate-900">
        <h1 className="text-3xl font-bold">Layanan tidak ditemukan</h1>
        <a href="/" className="mt-6 inline-flex rounded-full bg-brand-600 px-6 py-3 font-semibold text-white">Kembali ke Nakama Digital</a>
      </main>
    );
  }

  const whatsapp = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Halo Nakama Digital, saya ingin konsultasi ${service.keyword}.`)}`;

  return (
    <div className="bg-white text-brand-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="Nakama Digital">
            <img src="/assets/logo/logo.svg" alt="Nakama Digital" className="h-9 w-auto" />
            <span className="hidden text-sm font-semibold tracking-tight sm:block">Nakama Digital</span>
          </a>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700">Konsultasi Gratis</a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,.16),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(96,146,255,.12),transparent_38%)]" />
          <div className="relative mx-auto max-w-6xl px-5 pt-5 lg:px-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-500">
              <a href="/" className="hover:text-brand-700">Nakama Digital</a>
              <span aria-hidden="true">/</span>
              <span className="font-medium text-slate-700">{service.keyword}</span>
            </nav>
          </div>

          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.08fr_.92fr] lg:px-8 lg:py-28">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[.18em] text-brand-600">
                <Globe2 size={15} /> Jasa website
              </p>
              <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-[-.04em] sm:text-5xl lg:text-6xl">{service.headline}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{service.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700">
                  Konsultasi Website Gratis <ArrowRight size={18} />
                </a>
                <a href="#detail" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-800 transition hover:border-brand-300 hover:text-brand-700">
                  Lihat detail layanan
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 shadow-2xl shadow-slate-900/10">
              <div className="rounded-2xl bg-white p-5">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                  <span className="ml-auto text-xs text-slate-400">Nakama Digital</span>
                </div>
                <div className="py-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">{service.keyword}</p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight">Informasi bisnis lebih mudah dipahami.</h2>
                  <p className="mt-4 leading-7 text-slate-500">Struktur, desain, dan isi halaman disesuaikan dengan tujuan website Anda.</p>
                  <div className="mt-7 h-2 w-32 rounded-full bg-brand-600" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="detail" className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              {service.sections.map((section) => (
                <article key={section.heading} className="mb-10">
                  <h2 className="text-3xl font-bold tracking-tight">{section.heading}</h2>
                  <p className="mt-4 text-lg leading-8 text-slate-600">{section.text}</p>
                </article>
              ))}
            </div>

            <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
              <h2 className="text-2xl font-bold tracking-tight">Cocok untuk</h2>
              <ul className="mt-6 space-y-4">
                {service.audience.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-700">
                    <Check className="mt-0.5 shrink-0 text-brand-600" size={19} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Yang bisa Anda dapatkan</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {service.benefits.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="flex gap-3">
                    <Check className="mt-0.5 shrink-0 text-brand-600" size={19} />
                    <p className="leading-7 text-slate-700">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">Area layanan</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Layanan ini tersedia untuk bisnis di berbagai kota</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Mulai dari halaman kota yang sudah tersedia, Anda dapat melihat contoh kebutuhan website lokal yang lebih spesifik.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {Object.values(localSeoCities).map((city) => (
              <a key={city.slug} href={`/${city.slug}/`} className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg">
                <span className="text-sm font-semibold text-brand-600">Website {city.city}</span>
                <h3 className="mt-2 text-xl font-bold">{city.city}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{city.locationLabel}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">Layanan lainnya</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Pilihan layanan website lainnya</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">Kebutuhan website bisa berkembang. Lihat layanan lain yang mungkin relevan dengan bisnis atau organisasi Anda.</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { slug: 'website-company-profile', title: 'Website Company Profile' },
                { slug: 'website-umkm', title: 'Website UMKM' },
                { slug: 'landing-page', title: 'Landing Page' },
                { slug: 'website-sekolah', title: 'Website Sekolah' },
                { slug: 'website-travel', title: 'Website Travel' },
              ].filter((item) => item.slug !== service.slug).map((item) => (
                <a key={item.slug} href={`/${item.slug}/`} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg">
                  <h3 className="font-bold">{item.title}</h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">Lihat layanan <ArrowRight size={15} /></span>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Pertanyaan tentang {service.keyword}</h2>
          </div>
          <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200">
            {service.faqs.map((faq) => (
              <details key={faq.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {faq.q}
                  <ChevronDown size={18} className="shrink-0 transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 pr-8 text-sm leading-6 text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="px-5 pb-16 lg:px-8">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-brand-600 px-6 py-12 text-center text-white sm:px-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Mari bahas website yang Anda butuhkan</h2>
            <p className="mx-auto mt-4 max-w-2xl text-brand-100">Ceritakan bisnis, tujuan, dan kebutuhan Anda. Kami bantu menentukan struktur website yang masuk akal untuk proyek Anda.</p>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-brand-700 shadow-xl transition hover:bg-brand-50">
              Chat WhatsApp <MessageCircle size={18} />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
