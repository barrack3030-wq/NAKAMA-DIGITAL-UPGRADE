import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const configPath = path.join(root, 'src', 'data', 'localSeoCities.json');

const cities = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const source = path.join(dist, 'index.html');
if (!fs.existsSync(source)) throw new Error('dist/index.html tidak ditemukan setelah vite build.');

const baseHtml = fs.readFileSync(source, 'utf8');
const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const staticCityContent = (city) => `
  <main>
    <section>
      <p>Jasa pembuatan website ${escapeHtml(city.city)}</p>
      <p>${escapeHtml(city.locationLabel)}</p>
      <h1>${escapeHtml(city.headline)}</h1>
      <p>${escapeHtml(city.intro)}</p>
      <a href="https://wa.me/6285820830530?text=${encodeURIComponent(`Halo Nakama Digital, saya ingin konsultasi website untuk bisnis saya di ${city.city}.`)}">Konsultasi Website Gratis</a>
    </section>
    <section>
      <h2>Website untuk bisnis dan organisasi di ${escapeHtml(city.city)}</h2>
      <p>${escapeHtml(city.context)}</p>
      <h3>Kebutuhan bisnis yang relevan</h3>
      <ul>
        ${city.serviceFocus.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
      </ul>
    </section>
    <section>
      <h2>Layanan website di ${escapeHtml(city.city)}</h2>
      <ul>
        <li>Website UMKM &amp; Toko</li>
        <li>Company Profile</li>
        <li>Landing Page</li>
        <li>Sekolah &amp; Yayasan</li>
      </ul>
    </section>
    <section>
      <h2>Pertanyaan umum</h2>
      <dl>
        <dt>Apakah Nakama Digital melayani pembuatan website di ${escapeHtml(city.city)}?</dt>
        <dd>Ya. Website dapat dibuat untuk berbagai jenis bisnis dan organisasi yang beroperasi di ${escapeHtml(city.city)}.</dd>
        <dt>Apakah website bisa terhubung ke WhatsApp?</dt>
        <dd>Ya. Tombol WhatsApp dapat ditempatkan pada bagian strategis agar calon pelanggan dapat menghubungi bisnis secara langsung.</dd>
      </dl>
    </section>
  </main>
`;


function faqItems(city) {
  return [
    {
      '@type': 'Question',
      name: `Apakah Nakama Digital melayani pembuatan website untuk bisnis di ${city.city}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Ya. Website dapat dibuat untuk berbagai jenis bisnis dan organisasi yang beroperasi di ${city.city} dan membutuhkan kehadiran digital profesional.`,
      },
    },
    {
      '@type': 'Question',
      name: 'Apakah website bisa terhubung ke WhatsApp?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ya. Tombol WhatsApp dapat ditempatkan pada bagian strategis agar calon pelanggan dapat menghubungi bisnis secara langsung.',
      },
    },
    {
      '@type': 'Question',
      name: 'Apakah website bisa muncul di Google?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Website dapat dibuat dengan struktur teknis dan konten yang SEO-friendly. Namun, posisi tertentu di hasil pencarian Google tidak dapat dijamin karena ranking dipengaruhi banyak faktor.',
      },
    },
    {
      '@type': 'Question',
      name: 'Apakah website bisa dibuka melalui HP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ya. Website dirancang responsive agar nyaman digunakan pada smartphone, tablet, dan desktop.',
      },
    },
  ];
}

for (const city of cities) {
  const cityUrl = `https://nakamadigital.biz.id/${city.slug}/`;
  const title = `Jasa Pembuatan Website ${city.city} | Nakama Digital`;
  const description = `Jasa pembuatan website untuk bisnis, UMKM, jasa, sekolah, yayasan, perusahaan, dan organisasi di ${city.locationLabel}. Website profesional, mobile-friendly, SEO-ready, dan terhubung WhatsApp.`;

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
    .replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)
    .replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${description}">`)
    .replace('<div id="root"></div>', `<div id="root">${staticCityContent(city)}</div>`)
    .replace('</head>', `<meta name="robots" content="index,follow">
<link rel="canonical" href="${cityUrl}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:type" content="website">
<meta property="og:url" content="${cityUrl}">
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
