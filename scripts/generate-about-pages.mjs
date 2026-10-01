import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const source = path.join(dist, 'index.html');
if (!fs.existsSync(source)) throw new Error('dist/index.html tidak ditemukan setelah vite build.');

const baseHtml = fs.readFileSync(source, 'utf8');
const esc = (v) => String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');

const makePage = ({ english, url, title, description, dir, content }) => {
  const html = baseHtml
    .replace(/<html lang="[^"]*"/i, '<html lang="' + (english ? 'en' : 'id') + '"')
    .replace(/<title>.*?<\/title>/i, '<title>' + esc(title) + '</title>')
    .replace(/<meta name="description"[^>]*>/i, '<meta name="description" content="' + esc(description) + '">')
    .replace(/<meta name="robots"[^>]*>/i, '<meta name="robots" content="index,follow">')
    .replace(/<link rel="canonical"[^>]*>/i, '<link rel="canonical" href="' + url + '">')
    .replace(/<meta property="og:title"[^>]*>/i, '<meta property="og:title" content="' + esc(title) + '">')
    .replace(/<meta property="og:description"[^>]*>/i, '<meta property="og:description" content="' + esc(description) + '">')
    .replace(/<meta property="og:url"[^>]*>/i, '<meta property="og:url" content="' + url + '">')
    .replace('<div id="root"></div>', '<div id="root">' + content + '</div>')
    .replace('</head>', '<link rel="alternate" hreflang="id" href="https://nakamadigital.biz.id/tentang-nakama-digital/"><link rel="alternate" hreflang="en" href="https://nakamadigital.biz.id/en/about/"><link rel="alternate" hreflang="x-default" href="https://nakamadigital.biz.id/tentang-nakama-digital/"><script type="application/ld+json">' + JSON.stringify({
      '@context':'https://schema.org','@type':'AboutPage',name:title,description,url,inLanguage:english ? 'en-US' : 'id-ID',
      about:{'@type':'Organization',name:'Nakama Digital',url:'https://nakamadigital.biz.id/',logo:'https://nakamadigital.biz.id/images/logo/logo.png'},
      isPartOf:{'@type':'WebSite',name:'Nakama Digital',url:'https://nakamadigital.biz.id/'}
    }) + '</script></head>');
  fs.mkdirSync(path.dirname(path.join(dist, dir, 'index.html')), { recursive: true });
  fs.writeFileSync(path.join(dist, dir, 'index.html'), html);
};

const idContent = '<main><article><p>Tentang Nakama Digital</p><h1>Layanan website untuk bisnis di Indonesia</h1><p>Nakama Digital adalah layanan pengembangan website berbasis Indonesia yang membantu bisnis, UMKM, sekolah, travel, dan organisasi membangun kehadiran online yang jelas dan berguna.</p><section><h2>Website sesuai kebutuhan</h2><p>Company profile, website UMKM, landing page, website sekolah, website travel, dan toko online.</p></section><section><h2>Fokus lokal</h2><p>Kami menyusun halaman yang relevan dengan pasar lokal, termasuk konten berbasis kota ketika memang dibutuhkan.</p></section><section><h2>Siap dipasarkan</h2><p>Struktur yang responsif dan ringan disiapkan agar mendukung visibilitas pencarian dan pemasaran digital.</p></section><section><h2>Lihat layanan dan project</h2><p><a href="/website-company-profile/">Website Company Profile</a> · <a href="/website-umkm/">Website UMKM</a> · <a href="/portfolio/">Portfolio</a> · <a href="/blog/">Panduan Website</a></p></section></article></main>';

const enContent = '<main><article><p>About Nakama Digital</p><h1>Website development for businesses in Indonesia</h1><p>Nakama Digital is an Indonesia-based website development service helping businesses, SMEs, schools, travel companies, and organizations build a clear and useful online presence.</p><section><h2>Website services</h2><p>Company profiles, SME websites, landing pages, school websites, travel websites, and online stores.</p></section><section><h2>Local focus</h2><p>We create pages that speak to local markets, with city-focused content where it is useful.</p></section><section><h2>Built for digital marketing</h2><p>Responsive, lightweight structures are prepared to support search visibility and digital marketing.</p></section><section><h2>Explore services and work</h2><p><a href="/website-company-profile/">Company Profile Website</a> · <a href="/website-umkm/">SME Website</a> · <a href="/portfolio/">Portfolio</a> · <a href="/blog/">Website Guides</a></p></section></article></main>';

makePage({
  english:false,
  url:'https://nakamadigital.biz.id/tentang-nakama-digital/',
  title:'Tentang Nakama Digital | Jasa Website Indonesia',
  description:'Tentang Nakama Digital, layanan pengembangan website di Indonesia untuk bisnis, UMKM, sekolah, travel, dan organisasi.',
  dir:'tentang-nakama-digital',
  content:idContent
});

makePage({
  english:true,
  url:'https://nakamadigital.biz.id/en/about/',
  title:'About Nakama Digital | Website Development in Indonesia',
  description:'About Nakama Digital, an Indonesia-based website development service for businesses, SMEs, schools, travel companies, and organizations.',
  dir:path.join('en','about'),
  content:enContent
});

console.log('Generated static about pages.');
