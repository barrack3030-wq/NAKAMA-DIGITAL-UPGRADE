import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const cityConfigPath = path.join(root, 'src', 'data', 'localSeoCities.json');
const serviceConfigPath = path.join(root, 'src', 'data', 'serviceSeoPages.json');

const cities = JSON.parse(fs.readFileSync(cityConfigPath, 'utf8'));
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

const faqItems = (service) => service.faqs.map((faq) => ({
  '@type': 'Question',
  name: faq.q,
  acceptedAnswer: { '@type': 'Answer', text: faq.a },
}));

const staticServiceContent = (service) => [
  '  <main>',
  '    <nav aria-label="Breadcrumb"><a href="/">Nakama Digital</a> / <span>' + escapeHtml(service.keyword) + '</span></nav>',
  '    <section>',
  '      <p>Jasa pembuatan website</p>',
  '      <h1>' + escapeHtml(service.headline) + '</h1>',
  '      <p>' + escapeHtml(service.intro) + '</p>',
  '      <p>Website dibuat sesuai kebutuhan bisnis atau organisasi, dengan struktur yang jelas, mobile-friendly, dan siap dikembangkan.</p>',
  '      <p><a href="https://wa.me/6285820830530?text=' + encodeURIComponent('Halo Nakama Digital, saya ingin konsultasi ' + service.keyword + '.') + '">Konsultasi Website Gratis</a> <a href="/portfolio/">Lihat Portfolio</a></p>',
  '    </section>',
  '    <section>',
  '      <h2>Mengapa layanan ini dibutuhkan?</h2>',
  service.sections.map((item) => '      <h3>' + escapeHtml(item.heading) + '</h3><p>' + escapeHtml(item.text) + '</p>').join(''),
  '      <h2>Cakupan layanan</h2><p>' + escapeHtml(service.seoCoverage) + '</p>',
  '    </section>',
  '    <section><h2>Yang bisa Anda dapatkan</h2><ul>' + service.benefits.map((item) => '<li>' + escapeHtml(item) + '</li>').join('') + '</ul></section>',
  '    <section><h2>Cocok untuk</h2><ul>' + service.audience.map((item) => '<li>' + escapeHtml(item) + '</li>').join('') + '</ul></section>',
  '    <section><h2>Proses pembuatan website</h2><ol>' +
    '<li><strong>Konsultasi kebutuhan</strong> — menentukan tujuan, target pengunjung, halaman, dan fitur yang diperlukan.</li>' +
    '<li><strong>Struktur dan desain</strong> — menyusun alur informasi, tampilan, dan konten agar mudah dipahami di mobile maupun desktop.</li>' +
    '<li><strong>Development</strong> — membangun website, memasukkan konten, menghubungkan CTA, dan menyiapkan struktur teknis SEO.</li>' +
    '<li><strong>Review dan peluncuran</strong> — mengecek tampilan, tautan, performa dasar, dan kebutuhan sebelum website dipublikasikan.</li></ol></section>',
  '    <section><h2>Portfolio website</h2><p>Lihat beberapa proyek website yang pernah dikerjakan Nakama Digital untuk bisnis dan organisasi.</p><p><a href="/portfolio/">Lihat portfolio dan contoh proyek</a></p></section>',
  '    <section><h2>Layanan website lainnya</h2><p>Kebutuhan website bisa berkembang. Bandingkan layanan lain yang mungkin relevan.</p><ul>' + services.filter((item) => item.slug !== service.slug).map((item) => '<li><a href="/' + escapeHtml(item.slug) + '/">' + escapeHtml(item.title) + '</a></li>').join('') + '</ul></section>',
  '    <section><h2>Area layanan</h2><p>Nakama Digital melayani kebutuhan website dari berbagai kota di Indonesia.</p><ul>' + cities.map((city) => '<li><a href="/' + escapeHtml(city.slug) + '/">Jasa website ' + escapeHtml(city.city) + '</a></li>').join('') + '</ul></section>',
  '    <section><h2>Artikel terkait</h2><p>Pelajari panduan yang masih satu topik dengan layanan ini.</p>' +
    '      ' + (() => { const links = relatedPosts((internalLinks.services[service.slug] || {}).posts); return links.length ? '<ul>' + links.map((post) => '<li><a href="/blog/' + escapeHtml(post.slug) + '/">' + escapeHtml(post.title) + '</a></li>').join('') + '</ul>' : '<p>Belum ada artikel terkait.</p>'; })() +
  '</section>',
  '    <section><h2>Contoh proyek terkait</h2><p>Lihat case study yang menggunakan pendekatan website serupa.</p>' +
    (() => { const links = relatedCaseStudies((internalLinks.services[service.slug] || {}).caseStudies); return links.length ? '<ul>' + links.map((item) => '<li><a href="/portfolio/' + escapeHtml(item.slug) + '/">' + escapeHtml(item.name) + '</a></li>').join('') + '</ul>' : '<p>Belum ada case study terkait.</p>'; })() +
  '</section>',
  '    <section><h2>Pertanyaan yang sering ditanyakan</h2><dl>' + service.faqs.map((faq) => '<dt>' + escapeHtml(faq.q) + '</dt><dd>' + escapeHtml(faq.a) + '</dd>').join('') + '</dl></section>',
  '    <section><h2>Siap membahas kebutuhan website?</h2><p>Ceritakan jenis bisnis, target pelanggan, dan kebutuhan website Anda. Kami dapat membantu menentukan struktur yang sesuai sebelum proyek dimulai.</p><p><a href="https://wa.me/6285820830530?text=' + encodeURIComponent('Halo Nakama Digital, saya ingin konsultasi ' + service.keyword + '.') + '">Mulai konsultasi via WhatsApp</a></p></section>',
  '  </main>'
].join('\n');

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
      logo: 'https://nakamadigital.biz.id/images/logo/logo.png',
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
