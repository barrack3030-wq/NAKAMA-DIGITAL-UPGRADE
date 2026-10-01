import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const source = path.join(dist, 'index.html');
if (!fs.existsSync(source)) throw new Error('dist/index.html tidak ditemukan setelah vite build.');

const baseHtml = fs.readFileSync(source, 'utf8');
const items = [
  ['Pelita Dental Luwuk','Website Klinik','https://barrack3030-wq.github.io/pelita-dental-luwuk/'],
  ['British Propolis Toili','Website Bisnis','https://agenbptoili.my.id/'],
  ['Banggai Wonderland','Website Travel','https://www.banggaiwonderland.my.id/'],
  ['The Common Cafe','Website Cafe','https://barrack3030-wq.github.io/tHE-COMMON-CAFE/'],
  ['Osaka Residence','Website Properti','https://barrack3030-wq.github.io/osaka-residence/'],
  ['DEHO Cafe','Website Restoran','https://barrack3030-wq.github.io/DEHO-CAFE-/'],
  ['BMT Al-Muhajirin','Website Koperasi Syariah','https://barrack3030-wq.github.io/BMT01/#/beranda'],
];

const esc = (v) => String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');

const content = '<main><article><p>Portfolio website</p>' +
  '<h1>Portfolio Website Nakama Digital</h1>' +
  '<p>Contoh website yang telah kami kerjakan untuk bisnis, klinik, travel, cafe, properti, restoran, dan koperasi.</p>' +
  '<section><h2>Project website</h2><ul>' +
  items.map(([name, category, url]) => '<li><strong>' + esc(name) + '</strong> — ' + esc(category) + ' — <a href="' + esc(url) + '">Lihat website</a></li>').join('') +
  '</ul></section>' +
  '<section><h2>Jenis project yang pernah dikerjakan</h2><p>Portfolio mencakup website klinik, bisnis produk, travel, cafe, properti, restoran, dan koperasi. Setiap project memiliki kebutuhan informasi yang berbeda sehingga struktur website disusun berdasarkan tujuan bisnis dan karakter audiens.</p><p>Website klinik dapat menonjolkan layanan dan kontak, travel membutuhkan paket dan itinerary, properti membutuhkan informasi unit dan lokasi, sedangkan bisnis produk membutuhkan katalog dan jalur pemesanan. Contoh-contoh tersebut membantu calon klien melihat bagaimana kebutuhan bisnis diterjemahkan menjadi struktur website.</p></section><section><h2>Butuh website untuk bisnis Anda?</h2><p>Kami dapat membantu menyusun struktur, desain, dan pengembangan website sesuai kebutuhan bisnis.</p>' +
  '<a href="https://wa.me/6285820830530?text=' + encodeURIComponent('Halo Nakama Digital, saya ingin konsultasi website.') + '">Mulai Konsultasi</a></section>' +
  '</article></main>';

const url = 'https://nakamadigital.biz.id/portfolio/';
const title = 'Portfolio Website | Contoh Project Nakama Digital';
const description = 'Portfolio website Nakama Digital: contoh project website untuk bisnis, klinik, travel, cafe, properti, restoran, dan koperasi.';

const html = baseHtml
  .replace(/<html lang="[^"]*"/i, '<html lang="id"')
  .replace(/<title>.*?<\/title>/i, '<title>' + esc(title) + '</title>')
  .replace(/<meta name="description"[^>]*>/i, '<meta name="description" content="' + esc(description) + '">')
  .replace(/<meta name="robots"[^>]*>/i, '<meta name="robots" content="index,follow">')
  .replace(/<link rel="canonical"[^>]*>/i, '<link rel="canonical" href="' + url + '">')
  .replace(/<meta property="og:title"[^>]*>/i, '<meta property="og:title" content="' + esc(title) + '">')
  .replace(/<meta property="og:description"[^>]*>/i, '<meta property="og:description" content="' + esc(description) + '">')
  .replace(/<meta property="og:url"[^>]*>/i, '<meta property="og:url" content="' + url + '">')
  .replace('<div id="root"></div>', '<div id="root">' + content + '</div>')
  .replace('</head>', '<meta property="og:type" content="website"><script type="application/ld+json">' + JSON.stringify({
    '@context':'https://schema.org','@type':'CollectionPage',name:title,description,url,inLanguage:'id-ID',
    isPartOf:{'@type':'WebSite',name:'Nakama Digital',url:'https://nakamadigital.biz.id/'}
  }) + '</script></head>');

fs.mkdirSync(path.join(dist, 'portfolio'), { recursive: true });
fs.writeFileSync(path.join(dist, 'portfolio', 'index.html'), html);
console.log('Generated static portfolio page.');
