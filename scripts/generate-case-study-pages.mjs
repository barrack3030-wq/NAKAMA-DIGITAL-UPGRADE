import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const source = path.join(dist, 'index.html');
if (!fs.existsSync(source)) throw new Error('dist/index.html tidak ditemukan setelah vite build.');
const baseHtml = fs.readFileSync(source, 'utf8');
const { internalLinks, relatedPosts } = await import('./internal-links.mjs');

const projects = [
  { slug:'pelita-dental-luwuk', name:'Pelita Dental Luwuk', category:'Website Klinik', city:'Luwuk', region:'Banggai, Sulawesi Tengah', url:'https://barrack3030-wq.github.io/pelita-dental-luwuk/', service:'website-company-profile', title:'Website Klinik Pelita Dental Luwuk | Case Study Nakama Digital', description:'Case study website Pelita Dental Luwuk oleh Nakama Digital, dengan fokus pada profil klinik, informasi layanan, dan akses kontak.' },
  { slug:'british-propolis-toili', name:'British Propolis Toili', category:'Website Bisnis', city:'Toili', region:'Banggai, Sulawesi Tengah', url:'https://agenbptoili.my.id/', service:'website-umkm', title:'Website British Propolis Toili | Case Study Nakama Digital', description:'Case study website British Propolis Toili oleh Nakama Digital untuk kebutuhan website bisnis dan informasi produk.' },
  { slug:'banggai-wonderland', name:'Banggai Wonderland', category:'Website Travel', city:'Luwuk', region:'Banggai, Sulawesi Tengah', url:'https://www.banggaiwonderland.my.id/', service:'website-travel', title:'Website Banggai Wonderland | Case Study Nakama Digital', description:'Case study website Banggai Wonderland oleh Nakama Digital untuk bisnis travel dan informasi paket wisata.' },
  { slug:'the-common-cafe', name:'The Common Cafe', category:'Website Cafe', city:'', region:'', url:'https://barrack3030-wq.github.io/tHE-COMMON-CAFE/', service:'website-umkm', title:'Website The Common Cafe | Case Study Nakama Digital', description:'Case study website The Common Cafe oleh Nakama Digital untuk kebutuhan website bisnis cafe.' },
  { slug:'osaka-residence', name:'Osaka Residence', category:'Website Properti', city:'', region:'', url:'https://barrack3030-wq.github.io/osaka-residence/', service:'website-company-profile', title:'Website Osaka Residence | Case Study Nakama Digital', description:'Case study website Osaka Residence oleh Nakama Digital untuk kebutuhan informasi dan presentasi bisnis properti.' },
  { slug:'deho-cafe', name:'DEHO Cafe', category:'Website Restoran', city:'', region:'', url:'https://barrack3030-wq.github.io/DEHO-CAFE-/', service:'website-umkm', title:'Website DEHO Cafe | Case Study Nakama Digital', description:'Case study website DEHO Cafe oleh Nakama Digital untuk kebutuhan website bisnis restoran.' },
  { slug:'bmt-al-muhajirin', name:'BMT Al-Muhajirin', category:'Website Koperasi Syariah', city:'Toili', region:'Banggai, Sulawesi Tengah', url:'https://barrack3030-wq.github.io/BMT01/#/beranda', service:'website-company-profile', title:'Website BMT Al-Muhajirin | Case Study Nakama Digital', description:'Case study website BMT Al-Muhajirin oleh Nakama Digital untuk kebutuhan informasi lembaga dan layanan koperasi syariah.' }
];

const esc = (v) => String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const wa = (name) => 'https://wa.me/6285820830530?text=' + encodeURIComponent('Halo Nakama Digital, saya ingin konsultasi website seperti project ' + name + '.');

for (const project of projects) {
  const url = `https://nakamadigital.biz.id/portfolio/${project.slug}/`;
  const location = project.city ? ` di ${project.city}${project.region ? ', ' + project.region : ''}` : '';
  const content = [
    '<main><article>',
    '<nav aria-label="Breadcrumb"><a href="/">Nakama Digital</a> / <a href="/portfolio/">Portfolio</a> / <span>' + esc(project.name) + '</span></nav>',
    '<p>Case Study Website</p>',
    '<h1>Website ' + esc(project.name) + '</h1>',
    '<p>' + esc(project.category) + (location ? esc(location) : '') + '. Proyek ini tercatat sebagai salah satu contoh website yang dikerjakan Nakama Digital.</p>',
    '<section><h2>Tentang project</h2><p>Project ' + esc(project.name) + ' merupakan website dengan kategori ' + esc(project.category.toLowerCase()) + '. Halaman ini dibuat untuk mendokumentasikan jenis proyek dan hasil website yang dapat dilihat secara langsung.</p>',
    '<p><a href="' + esc(project.url) + '">Lihat website project</a></p></section>',
    '<section><h2>Kebutuhan website</h2><p>Struktur website disesuaikan dengan kebutuhan informasi dan karakter bisnis atau organisasi. Fokus dapat mencakup profil, layanan atau produk, informasi penting, dan jalur kontak yang mudah ditemukan.</p></section>',
    '<section><h2>Layanan terkait</h2><p><a href="/' + esc(project.service) + '/">Lihat layanan ' + esc(project.category.toLowerCase()) + '</a></p></section>',
    '<section><h2>Artikel terkait</h2><ul>' +
      (() => { const links = relatedPosts((internalLinks.caseStudies[project.slug] || {}).posts); return links.map((item) => '<li><a href="/blog/' + esc(item.slug) + '/">' + esc(item.title) + '</a></li>').join(''); })() +
    '</ul></section>',
    '<section><h2>Project lainnya</h2><p><a href="/portfolio/">Lihat seluruh portfolio Nakama Digital</a></p></section>',
    '<section><h2>Ingin website dengan kebutuhan serupa?</h2><p>Diskusikan jenis bisnis, kebutuhan halaman, fitur, dan tujuan website Anda.</p><p><a href="' + wa(project.name) + '">Konsultasi via WhatsApp</a></p></section>',
    '</article></main>'
  ].join('\\n');

  const html = baseHtml
    .replace(/<html lang="[^"]*"/i, '<html lang="id"')
    .replace(/<title>.*?<\/title>/i, '<title>' + esc(project.title) + '</title>')
    .replace(/<meta name="description"[^>]*>/i, '<meta name="description" content="' + esc(project.description) + '">')
    .replace(/<meta name="robots"[^>]*>/i, '<meta name="robots" content="index,follow">')
    .replace(/<link rel="canonical"[^>]*>/i, '<link rel="canonical" href="' + url + '">')
    .replace(/<meta property="og:title"[^>]*>/i, '<meta property="og:title" content="' + esc(project.title) + '">')
    .replace(/<meta property="og:description"[^>]*>/i, '<meta property="og:description" content="' + esc(project.description) + '">')
    .replace(/<meta property="og:url"[^>]*>/i, '<meta property="og:url" content="' + url + '">')
    .replace('<div id="root"></div>', '<div id="root">' + content + '</div>')
    .replace('</head>', '<meta property="og:type" content="article"><script type="application/ld+json">' + JSON.stringify({
      '@context':'https://schema.org','@type':'Article',headline:project.title,description:project.description,url,inLanguage:'id-ID',
      about:{'@type':'Thing',name:project.category},
      isPartOf:{'@type':'WebSite',name:'Nakama Digital',url:'https://nakamadigital.biz.id/'}
    }) + '</script></head>');

  const dir = path.join(dist, 'portfolio', project.slug);
  fs.mkdirSync(dir, { recursive:true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}
console.log(`Generated ${projects.length} portfolio case study pages.`);
