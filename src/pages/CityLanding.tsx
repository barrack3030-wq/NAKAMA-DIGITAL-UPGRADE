import { useEffect } from 'react';
import { ArrowRight, Check, ChevronDown, MessageCircle, MapPin } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getLocalSeoCity } from '../data/localSeoCities';
import Footer from '../components/Footer';
import { LanguageProvider } from '../context/LanguageContext';

const WHATSAPP_NUMBER = '6285820830530';

export default function CityLanding() {
  const { citySlug = '' } = useParams();
  const city = getLocalSeoCity(citySlug);

  useEffect(() => {
    if (!city) return;

    document.title = city.seoTitle;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', city.seoDescription);
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
      mainEntity: city.faqs.slice(0, 4).map(({ q, a }) => ({
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
    <LanguageProvider>
      <div className="bg-white text-brand-900">
        <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
            <a href="/" className="flex items-center gap-3" aria-label="Nakama Digital">
              <img src="/images/logo/logo.png" alt="Nakama Digital" className="h-9 w-auto object-contain" />
              <span className="hidden text-sm font-semibold tracking-tight sm:block">Nakama Digital</span>
            </a>
            <a
              href={whatsapp(`Halo Nakama Digital, saya ingin konsultasi website untuk bisnis saya di ${city.city}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Konsultasi Gratis
            </a>
          </div>
        </header>

        <main>
          <section className="relative overflow-hidden border-b border-slate-100">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,.16),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(96,146,255,.12),transparent_38%)]" />
            <div className="relative mx-auto max-w-6xl px-5 pt-5 lg:px-8">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-500">
                <a href="/" className="hover:text-brand-700">Nakama Digital</a>
                <span aria-hidden="true">/</span>
                <span className="font-medium text-slate-700">Website {city.city}</span>
              </nav>
            </div>

            <div className="relative mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20">
              <div className="max-w-4xl">
                <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[.18em] text-brand-600">
                  <MapPin size={15} />
                  {city.eyebrow}
                </p>
                <h1 className="text-balance text-4xl font-bold tracking-[-.04em] sm:text-5xl lg:text-6xl">{city.headline}</h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{city.intro}</p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={whatsapp(`Halo Nakama Digital, saya ingin konsultasi ${city.primaryKeyword}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700"
                  >
                    Konsultasi Website Gratis
                    <ArrowRight size={18} />
                  </a>
                  <a href="#layanan" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-800 transition hover:border-brand-300 hover:text-brand-700">
                    Lihat Layanan
                  </a>
                </div>

                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                  {['Mobile Friendly', 'SEO Ready', 'Terhubung WhatsApp', 'Desain Sesuai Bisnis'].map((item) => (
                    <span key={item} className="inline-flex items-center gap-1.5">
                      <Check size={15} className="text-brand-600" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="layanan" className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-16">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">{city.locationLabel}</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Website untuk bisnis di {city.city}</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">{city.localContext}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {city.localHighlights.map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {city.services.map((service) => (
                <a
                  key={service.title}
                  href={service.anchor === 'umkm' ? '/website-umkm/' : service.anchor === 'company-profile' ? '/website-company-profile/' : service.anchor === 'landing-page' ? '/landing-page/' : '/website-sekolah/'}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5"
                >
                  <h3 className="font-bold">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                    Lihat layanan
                    <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-2xl font-bold tracking-tight">{city.seoHeading}</h2>
                <p className="mt-3 text-base leading-7 text-slate-600">{city.seoParagraph}</p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-2xl font-bold tracking-tight">{city.seoSecondHeading}</h2>
                <p className="mt-3 text-base leading-7 text-slate-600">{city.seoSecondParagraph}</p>
              </article>
            </div>
          </section>

          <section id="faq" className="mx-auto max-w-4xl px-5 py-12 lg:px-8 lg:py-14">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">FAQ {city.city}</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Yang sering ditanyakan</h2>
            </div>

            <div className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200">
              {city.faqs.slice(0, 4).map(({ q, a }) => (
                <details key={q} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                    {q}
                    <ChevronDown size={18} className="shrink-0 transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 pr-8 text-sm leading-6 text-slate-600">{a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="px-5 pb-16 lg:px-8">
            <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-brand-600 px-6 py-10 text-center text-white sm:px-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Butuh website di {city.city}?</h2>
              <p className="mx-auto mt-3 max-w-2xl text-brand-100">Ceritakan bisnis dan kebutuhan Anda. Kita mulai dari yang paling penting.</p>
              <a
                href={whatsapp(`Halo Nakama Digital, saya ingin konsultasi website untuk bisnis saya di ${city.city}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-brand-700 shadow-xl transition hover:bg-brand-50"
              >
                Chat WhatsApp
                <MessageCircle size={18} />
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}
