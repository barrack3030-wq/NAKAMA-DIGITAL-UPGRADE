import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const source = path.join(dist, 'index.html');
const posts = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', 'blogSeoPosts.json'), 'utf8'));
const cities = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', 'localSeoCities.json'), 'utf8'));
const services = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', 'serviceSeoPages.json'), 'utf8'));

if (!fs.existsSync(source)) throw new Error('dist/index.html tidak ditemukan setelah vite build.');

const baseHtml = fs.readFileSync(source, 'utf8');
const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const staticPostContent = (post) => [
  '<main>',
  '<article>',
  '<p>Panduan website</p>',
  '<h1>' + escapeHtml(post.headline) + '</h1>',
  '<p>' + escapeHtml(post.intro) + '</p>',
  post.sections.map((section) => '<section><h2>' + escapeHtml(section.heading) + '</h2><p>' + escapeHtml(section.text) + '</p></section>').join(''),
  '<section><h2>Layanan yang mungkin Anda butuhkan</h2><ul>' +
    post.links.map((link) => '<li><a href="' + escapeHtml(link.href) + '">' + escapeHtml(link.label) + '</a></li>').join('') +
  '</ul></section>',
  '<section><h2>FAQ</h2><dl>' +
    post.faqs.map((faq) => '<dt>' + escapeHtml(faq.q) + '</dt><dd>' + escapeHtml(faq.a) + '</dd>').join('') +
  '</dl></section>',
  '<p><a href="/blog/">Lihat semua panduan website</a></p>',
  '</article>',
  '</main>',
].join('');

for (const post of posts) {
  const url = 'https://nakamadigital.biz.id/blog/' + post.slug + '/';
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.headline,
    description: post.description,
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: 'Nakama Digital' },
    publisher: { '@type': 'Organization', name: 'Nakama Digital', url: 'https://nakamadigital.biz.id/' },
    inLanguage: 'id-ID',
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Nakama Digital', item: 'https://nakamadigital.biz.id/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://nakamadigital.biz.id/blog/' },
      { '@type': 'ListItem', position: 3, name: post.headline, item: url },
    ],
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  const html = baseHtml
    .replace(/<html lang="[^"]*"/i, '<html lang="id"')
    .replace(/<title>.*?<\/title>/i, '<title>' + escapeHtml(post.title) + '</title>')
    .replace(/<meta name="description"[^>]*>/i, '<meta name="description" content="' + escapeHtml(post.description) + '">')
    .replace(/<meta name="robots"[^>]*>/i, '<meta name="robots" content="index,follow">')
    .replace(/<link rel="canonical"[^>]*>/i, '<link rel="canonical" href="' + url + '">')
    .replace(/<meta property="og:title"[^>]*>/i, '<meta property="og:title" content="' + escapeHtml(post.title) + '">')
    .replace(/<meta property="og:description"[^>]*>/i, '<meta property="og:description" content="' + escapeHtml(post.description) + '">')
    .replace(/<meta property="og:type"[^>]*>/i, '<meta property="og:type" content="article">')
    .replace(/<meta property="og:url"[^>]*>/i, '<meta property="og:url" content="' + url + '">')
    .replace('<div id="root"></div>', '<div id="root">' + staticPostContent(post) + '</div>')
    .replace('</head>', '<script type="application/ld+json">' + JSON.stringify(articleSchema) + '</script><script type="application/ld+json">' + JSON.stringify(breadcrumbSchema) + '</script><script type="application/ld+json">' + JSON.stringify(faqSchema) + '</script></head>');

  const dir = path.join(dist, 'blog', post.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

const blogIndexContent = '<main><section><p>Panduan website</p><h1>Panduan Website untuk Bisnis</h1><p>Artikel praktis tentang biaya, struktur, pilihan jenis website, dan kebutuhan bisnis.</p><ul>' +
  posts.map((post) => '<li><a href="/blog/' + escapeHtml(post.slug) + '/">' + escapeHtml(post.title) + '</a></li>').join('') +
  '</ul></section></main>';
const blogIndexHtml = baseHtml
  .replace(/<html lang="[^"]*"/i, '<html lang="id"')
  .replace(/<title>.*?<\/title>/i, '<title>Panduan Website untuk Bisnis | Nakama Digital</title>')
  .replace(/<meta name="description"[^>]*>/i, '<meta name="description" content="Panduan praktis tentang pembuatan website untuk bisnis, UMKM, sekolah, travel, dan perusahaan dari Nakama Digital.">')
  .replace(/<meta name="robots"[^>]*>/i, '<meta name="robots" content="index,follow">')
  .replace(/<link rel="canonical"[^>]*>/i, '<link rel="canonical" href="https://nakamadigital.biz.id/blog/">')
  .replace('<div id="root"></div>', '<div id="root">' + blogIndexContent + '</div>');

fs.mkdirSync(path.join(dist, 'blog'), { recursive: true });
fs.writeFileSync(path.join(dist, 'blog', 'index.html'), blogIndexHtml);

const urls = [
  'https://nakamadigital.biz.id/',
  'https://nakamadigital.biz.id/en/',
  'https://nakamadigital.biz.id/blog/',
  ...cities.map((city) => 'https://nakamadigital.biz.id/' + city.slug + '/'),
  ...services.map((service) => 'https://nakamadigital.biz.id/' + service.slug + '/'),
  ...posts.map((post) => 'https://nakamadigital.biz.id/blog/' + post.slug + '/'),
];

const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map((url) => '  <url><loc>' + url + '</loc></url>').join('\n') + '\n</urlset>\n';

fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(dist, 'robots.txt'), 'User-agent: *\nAllow: /\n\nSitemap: https://nakamadigital.biz.id/sitemap.xml\n');
console.log('Generated ' + posts.length + ' national SEO articles and refreshed sitemap.');
