import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const cityConfigPath = path.join(root, 'src', 'data', 'localSeoCities.json');
const serviceConfigPath = path.join(root, 'src', 'data', 'serviceSeoPages.json');

const cities = JSON.parse(fs.readFileSync(cityConfigPath, 'utf8'));
const services = JSON.parse(fs.readFileSync(serviceConfigPath, 'utf8'));

const source = path.join(dist, 'index.html');
if (!fs.existsSync(source)) throw new Error('dist/index.html tidak ditemukan setelah vite build.');

const baseHtml = fs.readFileSync(source, 'utf8');

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const faqItems = (service) => service.faqs.map((faq) => ({
  '@type': 'Question',
  name: faq.q,
  acceptedAnswer: { '@type': 'Answer', text: faq.a },
}));

const staticServiceContent = (service) => `
  <main>
    <section>
      <p>Jasa website</p>
      <h1>${escapeHtml(service.headline)}</h1>
      <p>${escapeHtml(service.intro)}</p>
      <a href="https://wa.me/6285820830530?text=${encodeURIComponent(`Halo Nakama Digital, saya ingin konsultasi ${service.keyword}.`) }">Konsultasi Website Gratis</a>
    </section>
    <section>
      ${service.sections.map((item) => `<h2>${escapeHtml(item.heading)}</h2><p>${escapeHtml(item.text)}</p>`).join('')}
    </section>
    <section>
      <h2>Cocok untuk</h2>
      <ul>${service.audience.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
    </section>
    <section>
      <h2>Yang bisa Anda dapatkan</h2>
      <ul>${service.benefits.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
    </section>
    <section>
      <h2>Area layanan</h2>
      <ul>
        ${cities.map((city) => `<li><a href="/${escapeHtml(city.slug)}/">Website ${escapeHtml(city.city)}</a></li>`).join('')}
      </ul>
    </section>
    <section>
      <h2>FAQ</h2>
      <dl>
        ${service.faqs.map((faq) => `<dt>${escapeHtml(faq.q)}</dt><dd>${escapeHtml(faq.a)}</dd>`).join('')}
      </dl>
    </section>
  </main>
`;

for (const service of services) {
  const serviceUrl = `https://nakamadigital.biz.id/${service.slug}/`;

  const serviceSchema = {
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
    url: serviceUrl,
  };

  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: service.title,
    description: service.description,
    url: serviceUrl,
    inLanguage: 'id-ID',
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
        name: service.keyword,
        item: serviceUrl,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems(service),
  };

  const html = baseHtml
    .replace(/<html lang="[^"]*"/i, '<html lang="id"')
    .replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(service.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(service.description)}">`)
    .replace(/<meta name="robots"[^>]*>/i, '<meta name="robots" content="index,follow">')
    .replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${serviceUrl}">`)
    .replace(/<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${escapeHtml(service.title)}">`)
    .replace(/<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${escapeHtml(service.description)}">`)
    .replace(/<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${serviceUrl}">`)
    .replace('<div id="root"></div>', `<div id="root">${staticServiceContent(service)}</div>`)
    .replace('</head>', `<meta property="og:type" content="website">
<script type="application/ld+json">${JSON.stringify(serviceSchema)}</script>
<script type="application/ld+json">${JSON.stringify(webpageSchema)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
</head>`);

  const dir = path.join(dist, service.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

const sitemapUrls = [
  'https://nakamadigital.biz.id/',
  ...cities.map((city) => `https://nakamadigital.biz.id/${city.slug}/`),
  ...services.map((service) => `https://nakamadigital.biz.id/${service.slug}/`),
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

console.log(`Generated ${services.length} service pages plus ${cities.length} city URLs in sitemap.`);
