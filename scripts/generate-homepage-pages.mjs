import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const source = path.join(dist, 'index.html');
if (!fs.existsSync(source)) throw new Error('dist/index.html tidak ditemukan setelah vite build.');

const baseHtml = fs.readFileSync(source, 'utf8');
const cities = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', 'localSeoCities.json'), 'utf8'));
const services = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', 'serviceSeoPages.json'), 'utf8'));
const posts = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', 'blogSeoPosts.json'), 'utf8'));

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const rootUrl = 'https://nakamadigital.biz.id/';
const enUrl = 'https://nakamadigital.biz.id/en/';

const homepageContent = [
  '<main>',
  '<section>',
  '<p>Jasa pembuatan website untuk bisnis &amp; UMKM</p>',
  '<h1>Jasa Pembuatan Website untuk Bisnis &amp; UMKM</h1>',
  '<p>Website profesional yang cepat, responsif, dan dibuat sesuai kebutuhan bisnis Anda.</p>',
  '<p>Company profile, website UMKM, landing page, sekolah, travel, hingga toko online.</p>',
  '<a href="https://wa.me/6285820830530?text=' + encodeURIComponent('Halo Nakama Digital, saya ingin konsultasi website.') + '">Mulai Konsultasi</a>',
  ' <a href="/website-umkm/">Lihat Layanan</a>',
  '</section>',
  '</main>'
].join('');

const englishContent = [
  '<main>',
  '<section>',
  '<p>Professional websites for businesses &amp; SMEs</p>',
  '<h1>Professional Website Design &amp; Development for Businesses</h1>',
  '<p>Fast, responsive websites designed around your business needs.</p>',
  '<p>Company profiles, SME websites, landing pages, school websites, travel websites, and online stores.</p>',
  '<a href="https://wa.me/6285820830530?text=' + encodeURIComponent('Hello Nakama Digital, I would like to consult about a website.') + '">Start a Consultation</a>',
  ' <a href="/website-umkm/">View Services</a>',
  '</section>',
  '</main>'
].join('');

const injectRoot = (html, content) => html.replace('<div id="root"></div>', '<div id="root">' + content + '</div>');
const localizedMeta = (html, locale, title, description, canonical) => html
  .replace(/<html lang="[^"]*"/i, '<html lang="' + locale + '"')
  .replace(/<title>.*?<\/title>/i, '<title>' + escapeHtml(title) + '</title>')
  .replace(/<meta name="description"[^>]*>/i, '<meta name="description" content="' + escapeHtml(description) + '">')
  .replace(/<meta name="robots"[^>]*>/i, '<meta name="robots" content="index,follow">')
  .replace(/<link rel="canonical"[^>]*>/i, '<link rel="canonical" href="' + canonical + '">')
  .replace(/<meta property="og:title"[^>]*>/i, '<meta property="og:title" content="' + escapeHtml(title) + '">')
  .replace(/<meta property="og:description"[^>]*>/i, '<meta property="og:description" content="' + escapeHtml(description) + '">')
  .replace(/<meta property="og:url"[^>]*>/i, '<meta property="og:url" content="' + canonical + '">')
  .replace('</head>', '<link rel="alternate" hreflang="id" href="' + rootUrl + '"><link rel="alternate" hreflang="en" href="' + enUrl + '"><link rel="alternate" hreflang="x-default" href="' + rootUrl + '"></head>');

const idTitle = 'Jasa Pembuatan Website untuk Bisnis & UMKM | Nakama Digital';
const idDescription = 'Jasa pembuatan website profesional untuk bisnis, UMKM, sekolah, travel, dan perusahaan. Nakama Digital mengerjakan website yang cepat, responsif, dan siap mendukung pemasaran online.';
const enTitle = 'Professional Website Design & Development | Nakama Digital';
const enDescription = 'Nakama Digital creates fast, responsive, professional websites for businesses, SMEs, schools, travel companies, and organizations.';

fs.writeFileSync(source, injectRoot(localizedMeta(baseHtml, 'id', idTitle, idDescription, rootUrl), homepageContent));

const enDir = path.join(dist, 'en');
fs.mkdirSync(enDir, { recursive: true });
fs.writeFileSync(path.join(enDir, 'index.html'), injectRoot(localizedMeta(baseHtml, 'en', enTitle, enDescription, enUrl), englishContent));

const urls = [
  rootUrl,
  enUrl,
  ...cities.map((city) => rootUrl + city.slug + '/'),
  ...services.map((service) => rootUrl + service.slug + '/'),
  ...posts.map((post) => rootUrl + 'blog/' + post.slug + '/'),
];

const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map((url) => '  <url><loc>' + url + '</loc></url>').join('\n') + '\n</urlset>\n';

fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(dist, 'robots.txt'), 'User-agent: *\nAllow: /\n\nSitemap: https://nakamadigital.biz.id/sitemap.xml\n');
console.log('Generated static ID/EN homepages and synchronized sitemap.');