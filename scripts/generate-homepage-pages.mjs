import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const source = path.join(dist, 'index.html');
if (!fs.existsSync(source)) throw new Error('dist/index.html tidak ditemukan setelah vite build.');

const baseHtml = fs.readFileSync(source, 'utf8');
const cities = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', 'localSeoCities.json'), 'utf8'));
const services = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', 'serviceSeoPages.json'), 'utf8'));

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
  '<section><p>Jasa pembuatan website untuk bisnis Anda</p>',
  '<h1>Jasa Pembuatan Website untuk Bisnis, UMKM &amp; Perusahaan</h1>',
  '<p>Nakama Digital membantu bisnis, UMKM, sekolah, travel, dan perusahaan memiliki website profesional yang rapi, cepat, responsif, dan siap mendukung pemasaran online.</p>',
  '<p>Website dapat disesuaikan dengan kebutuhan bisnis, mulai dari company profile, website UMKM, landing page, website sekolah, hingga website travel.</p>',
  '<a href="https://wa.me/6285820830530?text=' + encodeURIComponent('Halo Nakama Digital, saya ingin konsultasi website.') + '">Mulai Konsultasi</a></section>',
  '<section><h2>Layanan website untuk kebutuhan bisnis</h2>',
  '<p>Setiap jenis bisnis membutuhkan struktur website yang berbeda. Pilih layanan yang paling dekat dengan kebutuhan Anda.</p><ul>' +
  services.map((service) => '<li><a href="/' + escapeHtml(service.slug) + '/">' + escapeHtml(service.title) + '</a> — ' + escapeHtml(service.description) + '</li>').join('') +
  '</ul></section>',
  '<section><h2>Website untuk bisnis di berbagai kota</h2>',
  '<p>Nakama Digital menyediakan halaman layanan lokal untuk membantu bisnis menemukan informasi website yang lebih relevan dengan wilayahnya.</p><ul>' +
  cities.map((city) => '<li><a href="/' + escapeHtml(city.slug) + '/">Jasa website ' + escapeHtml(city.city) + '</a> — ' + escapeHtml(city.locationLabel) + '</li>').join('') +
  '</ul></section>',
  '<section><h2>Website yang dibuat sesuai tujuan bisnis</h2>',
  '<p>Kami merancang struktur, tampilan, dan fitur berdasarkan jenis bisnis, target pelanggan, informasi yang perlu ditampilkan, dan tindakan yang ingin dilakukan pengunjung.</p>',
  '<p>Website dapat digunakan sebagai pusat informasi resmi, katalog produk, profil perusahaan, halaman promosi, atau media komunikasi dengan pelanggan.</p></section>',
  '<section><h2>Pertanyaan umum tentang pembuatan website</h2><dl>',
  '<dt>Berapa lama website dibuat?</dt><dd>Waktu pengerjaan bergantung pada kompleksitas. Website standar umumnya membutuhkan 3–7 hari kerja, sedangkan proyek custom membutuhkan waktu lebih lama.</dd>',
  '<dt>Apakah website responsive?</dt><dd>Ya. Website dirancang agar nyaman digunakan di desktop, tablet, dan smartphone.</dd>',
  '<dt>Apakah website bisa terhubung ke WhatsApp?</dt><dd>Ya. Tombol WhatsApp dapat ditempatkan pada bagian strategis sesuai kebutuhan.</dd>',
  '<dt>Apakah website bisa muncul di Google?</dt><dd>Website dapat dibuat dengan struktur teknis dan konten yang SEO-friendly, tetapi posisi tertentu di Google tidak dapat dijamin.</dd>',
  '</dl></section></main>'
].join('');

const englishContent = [
  '<main>',
  '<section><p>Professional websites for your business</p>',
  '<h1>Professional Website Design &amp; Development for Businesses</h1>',
  '<p>Nakama Digital creates fast, responsive, professional websites for businesses, SMEs, schools, travel companies, and organizations.</p>',
  '<p>Services include company profile websites, SME websites, landing pages, school websites, and travel websites.</p>',
  '<a href="https://wa.me/6285820830530?text=' + encodeURIComponent('Hello Nakama Digital, I would like to consult about a website.') + '">Start a Consultation</a></section>',
  '<section><h2>Website services for different business needs</h2>',
  '<p>Different businesses need different website structures. Explore the service that best matches your project.</p><ul>' +
  services.map((service) => '<li><a href="/' + escapeHtml(service.slug) + '/">' + escapeHtml(service.title) + '</a></li>').join('') +
  '</ul></section>',
  '<section><h2>Local website services</h2><p>Explore city-specific pages for local business website needs in Indonesia.</p><ul>' +
  cities.map((city) => '<li><a href="/' + escapeHtml(city.slug) + '/">Website services in ' + escapeHtml(city.city) + '</a></li>').join('') +
  '</ul></section></main>'
].join('');

const injectRoot = (html, content) => html.replace('<div id="root"></div>', '<div id="root">' + content + '</div>');
const localizedMeta = (html, locale, title, description, canonical) => html
  .replace(/<html lang="[^"]*"/i, '<html lang="' + locale + '"')
  .replace(/<title>.*?<\/title>/i, '<title>' + escapeHtml(title) + '</title>')
  .replace(/<meta name="description"[^>]*>/i, '<meta name="description" content="' + escapeHtml(description) + '">')
  .replace(/<meta property="og:title"[^>]*>/i, '<meta property="og:title" content="' + escapeHtml(title) + '">')
  .replace(/<meta property="og:description"[^>]*>/i, '<meta property="og:description" content="' + escapeHtml(description) + '">')
  .replace(/<meta property="og:url"[^>]*>/i, '<meta property="og:url" content="' + canonical + '">')
  .replace('</head>', '<link rel="alternate" hreflang="id" href="' + rootUrl + '"><link rel="alternate" hreflang="en" href="' + enUrl + '"><link rel="alternate" hreflang="x-default" href="' + rootUrl + '"></head>');

const idTitle = 'Jasa Pembuatan Website untuk Bisnis, UMKM & Perusahaan | Nakama Digital';
const idDescription = 'Nakama Digital membantu bisnis, UMKM, sekolah, travel, dan perusahaan membuat website profesional yang cepat, responsif, dan siap mendukung pemasaran online.';
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
];

const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map((url) => '  <url><loc>' + url + '</loc></url>').join('\n') + '\n</urlset>\n';

fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(dist, 'robots.txt'), 'User-agent: *\nAllow: /\n\nSitemap: https://nakamadigital.biz.id/sitemap.xml\n');
console.log('Generated static ID/EN homepages and synchronized sitemap.');