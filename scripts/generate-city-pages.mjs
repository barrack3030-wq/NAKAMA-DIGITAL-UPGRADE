import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const configPath = path.join(root, 'src', 'data', 'localSeoCities.json');
const serviceConfigPath = path.join(root, 'src', 'data', 'serviceSeoPages.json');

const cities = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const services = JSON.parse(fs.readFileSync(serviceConfigPath, 'utf8'));
const { internalLinks, relatedPosts, relatedCaseStudies } = await import('./internal-links.mjs');

const source = path.join(dist, 'index.html');
if (!fs.existsSync(source)) throw new Error('dist/index.html tidak ditemukan setelah vite build.');

const baseHtml = fs.readFileSync(source, 'utf8');
const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const staticCityContent = (city) => [
  '  <main>',
  '    <nav aria-label="Breadcrumb"><a href="/">Nakama Digital</a> / <span>Website ' + escapeHtml(city.city) + '</span></nav>',
  '    <section>',
  '      <p>Jasa pembuatan website ' + escapeHtml(city.city) + '</p>',
  '      <p>' + escapeHtml(city.locationLabel) + '</p>',
  '      <h1>' + escapeHtml(city.headline) + '</h1>',
  '      <p>' + escapeHtml(city.intro) + '</p>',
  '      <p><a href="https://wa.me/6285820830530?text=' + encodeURIComponent('Halo Nakama Digital, saya ingin konsultasi website untuk bisnis saya di ' + city.city + '.') + '">Konsultasi Website Gratis</a> <a href="/portfolio/">Lihat Portfolio</a></p>',
  '    </section>',
  '    <section>',
  '      <h2>Website untuk bisnis di ' + escapeHtml(city.city) + '</h2>',
  '      <p>' + escapeHtml(city.context) + '</p>',
  '      <h3>Jenis bisnis yang dapat dilayani</h3>',
  '      <ul>' + city.highlights.map((item) => '<li>' + escapeHtml(item) + '</li>').join('') + '</ul>',
  '    </section>',
  '    <section>',
  '      <h2>Layanan website yang tersedia di ' + escapeHtml(city.city) + '</h2>',
  '      <ul>' + city.serviceFocus.map((item) => '<li>' + escapeHtml(item) + '</li>').join('') + '</ul>',
  '      <p>Butuh layanan yang lebih spesifik? Lihat pilihan jasa website Nakama Digital.</p>',
  '      <ul>' + services.map((service) => '<li><a href="/' + escapeHtml(service.slug) + '/">' + escapeHtml(service.title) + '</a></li>').join('') + '</ul>',
  '    </section>',
  '    <section>',
  '      <h2>' + escapeHtml(city.seoHeading) + '</h2>',
  '      <p>' + escapeHtml(city.seoParagraph) + '</p>',
  '      <h2>' + escapeHtml(city.seoSecondHeading) + '</h2>',
  '      <p>' + escapeHtml(city.seoSecondParagraph) + '</p>',
  '      <p>' + escapeHtml(city.keywordCoverage) + '</p>',
  '    </section>',
  '    <section>',
  '      <h2>Contoh proyek website</h2>',
  '      <p>Lihat contoh website yang dikerjakan Nakama Digital untuk bisnis dan organisasi.</p>',
  '      <p><a href="/portfolio/">Lihat portfolio dan contoh proyek</a></p>',
  '    </section>',
  '    <section><h2>Panduan terkait ' + escapeHtml(city.city) + '</h2><p>Beberapa panduan yang relevan untuk memahami kebutuhan website bisnis.</p>' +
    (() => { const links = relatedPosts((internalLinks.cities[city.slug] || {}).posts); return links.length ? '<ul>' + links.map((post) => '<li><a href="/blog/' + escapeHtml(post.slug) + '/">' + escapeHtml(post.title) + '</a></li>').join('') + '</ul>' : '<p>Belum ada artikel terkait.</p>'; })() +
  '</section>',
  '    <section><h2>Contoh proyek terkait</h2><p>Contoh proyek yang dapat menjadi referensi struktur dan kebutuhan website.</p>' +
    (() => { const links = relatedCaseStudies((internalLinks.cities[city.slug] || {}).caseStudies); return links.length ? '<ul>' + links.map((item) => '<li><a href="/portfolio/' + escapeHtml(item.slug) + '/">' + escapeHtml(item.name) + '</a></li>').join('') + '</ul>' : '<p>Belum ada proyek lokal yang dipublikasikan.</p>'; })() +
  '</section>',
  '    <section>',
  '      <h2>FAQ ' + escapeHtml(city.city) + '</h2>',
  '      <dl>' + faqItems(city).slice(0, 6).map(({ name, acceptedAnswer }) => '<dt>' + escapeHtml(name) + '</dt><dd>' + escapeHtml(acceptedAnswer.text) + '</dd>').join('') + '</dl>',
  '    </section>',
  '    <section>',
  '      <h2>Butuh website untuk bisnis di ' + escapeHtml(city.city) + '?</h2>',
  '      <p>Ceritakan jenis bisnis, target pelanggan, dan kebutuhan website Anda. Kami dapat membantu menentukan struktur yang sesuai.</p>',
  '      <p><a href="https://wa.me/6285820830530?text=' + encodeURIComponent('Halo Nakama Digital, saya ingin konsultasi website untuk bisnis saya di ' + city.city + '.') + '">Mulai konsultasi via WhatsApp</a></p>',
  '    </section>',
  '  </main>'
].join('\\n');

function faqItems(city) {
  return [
    {
      '@type': 'Question',
      name: `Apakah Nakama Digital melayani pembuatan website untuk bisnis di ${city.city}?`,
      acceptedAnswer: { '@type': 'Answer', text: `Ya. Website dapat dibuat untuk berbagai jenis bisnis dan organisasi yang beroperasi di ${city.city}.` },
    },
    {
      '@type': 'Question',
      name: `Apakah tersedia jasa web design dan desain website di ${city.city}?`,
      acceptedAnswer: { '@type': 'Answer', text: `Ya. Desain dapat disesuaikan dengan jenis bisnis, gaya brand, struktur halaman, dan tujuan website.` },
    },
    {
      '@type': 'Question',
      name: `Berapa biaya pembuatan website di ${city.city}?`,
      acceptedAnswer: { '@type': 'Answer', text: 'Biaya disesuaikan dengan jenis website, jumlah halaman, fitur, dan ruang lingkup proyek.' },
    },
    {
      '@type': 'Question',
      name: 'Apakah website bisa terhubung ke WhatsApp?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ya. Tombol WhatsApp dapat ditempatkan pada bagian strategis agar calon pelanggan dapat menghubungi bisnis secara langsung.' },
    },
    {
      '@type': 'Question',
      name: 'Apakah website bisa muncul di Google?',
      acceptedAnswer: { '@type': 'Answer', text: 'Website dapat dibuat dengan struktur teknis dan konten yang SEO-friendly, tetapi posisi tertentu di Google tidak dapat dijamin.' },
    },
    {
      '@type': 'Question',
      name: 'Apakah website bisa dibuka melalui HP?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ya. Website dirancang responsive untuk smartphone, tablet, dan desktop.' },
    },
    {
      '@type': 'Question',
      name: 'Saya belum tahu website seperti apa yang saya butuhkan. Bagaimana?',
      acceptedAnswer: { '@type': 'Answer', text: `Ceritakan jenis bisnis, layanan, dan target pelanggan Anda di ${city.city}. Kami akan membantu menentukan struktur website yang sesuai.` },
    },
  ];
}

for (const city of cities) {
  const cityUrl = `https://nakamadigital.biz.id/${city.slug}/`;
  const title = city.seoTitle || `Jasa Website ${city.city} | Nakama Digital`;
  const description = city.seoDescription || `Jasa pembuatan website untuk bisnis, UMKM, jasa, sekolah, yayasan, perusahaan, dan organisasi di ${city.locationLabel}. Website profesional, mobile-friendly, SEO-ready, dan terhubung WhatsApp.`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `jasa pembuatan website ${city.city}`,
    provider: {
      '@type': 'Organization',
      name: 'Nakama Digital',
      url: 'https://nakamadigital.biz.id/',
    },
    areaServed: {
      '@type': 'City',
      name: city.city,
      addressRegion: city.region,
      addressCountry: 'ID',
    },
    serviceType: 'Website design and development',
    url: cityUrl,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems(city),
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: cityUrl,
    inLanguage: 'id-ID',
    about: {
      '@type': 'City',
      name: city.city,
      addressRegion: city.region,
      addressCountry: 'ID',
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'Nakama Digital',
      url: 'https://nakamadigital.biz.id/',
    },
  };

  const breadcrumbSchema = {
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
        name: `Website ${city.city}`,
        item: cityUrl,
      },
    ],
  };

  let html = baseHtml
    .replace(/<html lang="[^"]*"/i, '<html lang="id"')
    .replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(description)}">`)
    .replace(/<meta name="robots"[^>]*>/i, '<meta name="robots" content="index,follow">')
    .replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${cityUrl}">`)
    .replace(/<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${escapeHtml(title)}">`)
    .replace(/<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${escapeHtml(description)}">`)
    .replace(/<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${cityUrl}">`)
    .replace('<div id="root"></div>', `<div id="root">${staticCityContent(city)}</div>`)
    .replace('</head>', `<meta property="og:type" content="website">
<script type="application/ld+json">${JSON.stringify(serviceSchema)}</script>
<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
<script type="application/ld+json">${JSON.stringify(webPageSchema)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
</head>`);

  const dir = path.join(dist, city.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

const sitemapUrls = [
  'https://nakamadigital.biz.id/',
  ...cities.map((city) => `https://nakamadigital.biz.id/${city.slug}/`),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  'User-agent: *\nAllow: /\n\nSitemap: https://nakamadigital.biz.id/sitemap.xml\n',
);

console.log(`Generated ${cities.length} static city pages, sitemap, and robots.txt.`);
