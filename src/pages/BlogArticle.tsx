import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import { ArrowRight, ChevronDown, MessageCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getBlogSeoPost } from '../data/blogSeoPosts';
import { LanguageProvider } from '../context/LanguageContext';

const WHATSAPP = '6285820830530';

export default function BlogArticle() {
  const { slug = '' } = useParams();
  const post = getBlogSeoPost(slug);

  useEffect(() => {
    if (!post) return;

    document.title = post.title;
    document.documentElement.lang = 'id';

    const canonicalUrl = `https://nakamadigital.biz.id/blog/${post.slug}/`;

    const setMeta = (selector: string, attributes: Record<string, string>) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        document.head.appendChild(el);
      }
      Object.entries(attributes).forEach(([key, value]) => el!.setAttribute(key, value));
    };

    setMeta('meta[name="description"]', { name: 'description', content: post.description });
    setMeta('meta[name="robots"]', { name: 'robots', content: 'index,follow' });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: post.title });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: post.description });
    setMeta('meta[property="og:type"]', { property: 'og:type', content: 'article' });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    ['blog-article-schema', 'blog-breadcrumb-schema', 'blog-faq-schema'].forEach((id) => {
      document.getElementById(id)?.remove();
    });

    const schemas = [
      {
        id: 'blog-article-schema',
        data: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.headline,
          description: post.description,
          mainEntityOfPage: canonicalUrl,
          author: { '@type': 'Organization', name: 'Nakama Digital' },
          publisher: { '@type': 'Organization', name: 'Nakama Digital', url: 'https://nakamadigital.biz.id/' },
          inLanguage: 'id-ID',
        },
      },
      {
        id: 'blog-breadcrumb-schema',
        data: {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Nakama Digital', item: 'https://nakamadigital.biz.id/' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://nakamadigital.biz.id/blog/' },
            { '@type': 'ListItem', position: 3, name: post.headline, item: canonicalUrl },
          ],
        },
      },
      {
        id: 'blog-faq-schema',
        data: {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
          })),
        },
      },
    ];

    schemas.forEach(({ id, data }) => {
      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    });

    return () => {
      ['blog-article-schema', 'blog-breadcrumb-schema', 'blog-faq-schema'].forEach((id) => {
        document.getElementById(id)?.remove();
      });
    };
  }, [post]);

  if (!post) {
    return (
      <main className="min-h-screen bg-white px-5 py-24 text-center text-slate-900">
        <h1 className="text-3xl font-bold">Artikel tidak ditemukan</h1>
        <a href="/" className="mt-6 inline-flex rounded-full bg-brand-600 px-6 py-3 font-semibold text-white">Kembali ke Nakama Digital</a>
      </main>
    );
  }

  const whatsapp = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Halo Nakama Digital, saya ingin konsultasi website setelah membaca artikel: ${post.headline}.`)}`;

  return (
    <LanguageProvider>
      <div className="bg-white text-brand-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-5 lg:px-8">
          <a href="/" className="inline-flex items-center" aria-label="Nakama Digital"><img src="/images/logo/logo.png" alt="Nakama Digital" className="h-9 w-auto object-contain" /></a>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Konsultasi</a>
        </div>
      </header>

      <main>
        <article className="mx-auto max-w-4xl px-5 py-14 lg:px-8 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <a href="/" className="hover:text-brand-700">Nakama Digital</a>
            <span>/</span>
            <a href="/blog/" className="hover:text-brand-700">Blog</a>
            <span>/</span>
            <span className="text-slate-700">{post.headline}</span>
          </nav>

          <p className="text-sm font-semibold uppercase tracking-[.18em] text-brand-600">Panduan website</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{post.headline}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">{post.intro}</p>

          <div className="mt-12 space-y-10">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{section.heading}</h2>
                <p className="mt-4 text-lg leading-8 text-slate-700">{section.text}</p>
              </section>
            ))}
          </div>

          <section className="mt-14 rounded-3xl border border-brand-100 bg-brand-50 p-7">
            <h2 className="text-2xl font-bold">Layanan yang mungkin Anda butuhkan</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {post.links.map((link) => (
                <a key={link.href} href={link.href} className="inline-flex items-center justify-between rounded-2xl border border-brand-100 bg-white px-5 py-4 font-semibold text-brand-700 transition hover:border-brand-300">
                  {link.label}<ArrowRight size={17} />
                </a>
              ))}
            </div>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">FAQ</h2>
            <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200">
              {post.faqs.map((faq) => (
                <details key={faq.q} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                    {faq.q}<ChevronDown size={18} className="shrink-0 transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 pr-8 text-sm leading-6 text-slate-600">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-14 rounded-[2rem] bg-slate-950 px-6 py-10 text-white sm:px-10">
            <h2 className="text-2xl font-bold sm:text-3xl">Sudah tahu website yang Anda butuhkan?</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-300">Ceritakan jenis bisnis, tujuan, dan kebutuhan Anda. Kami bantu menentukan struktur website yang sesuai.</p>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-slate-900">
              Chat WhatsApp <MessageCircle size={18} />
            </a>
          </section>
        </article>
      </main>

      <Footer />
      </div>
    </LanguageProvider>
  );
}
