import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');

const cities = [
  {
    slug: 'luwuk',
    city: 'Luwuk',
    region: 'Banggai',
    title: 'Jasa Pembuatan Website Luwuk | Nakama Digital',
    description: 'Jasa pembuatan website untuk UMKM, jasa, hotel, travel, sekolah, dan perusahaan di Luwuk. Website profesional, mobile-friendly, SEO-ready, dan terhubung WhatsApp.',
  },
  {
    slug: 'sintang',
    city: 'Sintang',
    region: 'Kalimantan Barat',
    title: 'Jasa Pembuatan Website Sintang | Nakama Digital',
    description: 'Jasa pembuatan website untuk UMKM, toko, jasa, sekolah, yayasan, perusahaan, dan organisasi di Sintang. Website profesional, mobile-friendly, SEO-ready, dan terhubung WhatsApp.',
  },
  {
    slug: 'surabaya',
    city: 'Surabaya',
    region: 'Jawa Timur',
    title: 'Jasa Pembuatan Website Surabaya | Nakama Digital',
    description: 'Jasa pembuatan website untuk UMKM, perusahaan, jasa profesional, properti, sekolah, klinik, dan organisasi di Surabaya. Website profesional, mobile-friendly, SEO-ready, dan terhubung WhatsApp.',
  },
];

const source = path.join(dist, 'index.html');
if (!fs.existsSync(source)) throw new Error('dist/index.html tidak ditemukan setelah vite build.');

const baseHtml = fs.readFileSync(source, 'utf8');

function upsert(html, pattern, replacement) {
  if (!pattern.test(html)) return html.replace('</head>', replacement + '\n</head>');
  return html.replace(pattern, replacement);
}

for (const city of cities) {
  const cityUrl = `https://nakamadigital.biz.id/${city.slug}/`;
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

  const html = baseHtml
    .replace(/<title>.*?<\/title>/i, `<title>${city.title}</title>`)
    .replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${city.description}">`)
    .replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${cityUrl}">`)
    .replace(/<meta name="robots"[^>]*>/i, '<meta name="robots" content="index,follow">')
    .replace(
      '</head>',
      `<link rel="canonical" href="${cityUrl}">
<meta name="robots" content="index,follow">
<script type="application/ld+json">${JSON.stringify(serviceSchema)}</script>
</head>`,
    );

  const dir = path.join(dist, city.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

console.log(`Generated ${cities.length} static city pages.`);
