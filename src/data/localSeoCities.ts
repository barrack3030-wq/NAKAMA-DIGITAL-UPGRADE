import cityConfig from './localSeoCities.json';

export type LocalSeoCity = {
  slug: string;
  city: string;
  region: string;
  country: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  eyebrow: string;
  headline: string;
  intro: string;
  localContext: string;
  localHighlights: string[];
  locationLabel: string;
  serviceFocus: string[];
  seoHeading: string;
  seoParagraph: string;
  seoSecondHeading: string;
  seoSecondParagraph: string;
  keywordCoverage: string;
  services: { title: string; description: string; anchor: string }[];
  faqs: { q: string; a: string }[];
};

type CityConfig = {
  slug: string;
  city: string;
  region: string;
  headline: string;
  intro: string;
  context: string;
  highlights: string[];
  locationLabel: string;
  serviceFocus: string[];
  seoHeading: string;
  seoParagraph: string;
  seoSecondHeading: string;
  seoSecondParagraph: string;
  keywordCoverage: string;
};

const buildCity = (config: CityConfig): LocalSeoCity => ({
  slug: config.slug,
  city: config.city,
  region: config.region,
  country: 'Indonesia',
  primaryKeyword: `jasa pembuatan website ${config.city}`,
  secondaryKeywords: [
    `jasa website ${config.city}`,
    `web developer ${config.city}`,
    `jasa web design ${config.city}`,
    `jasa website UMKM ${config.city}`,
    `jasa website sekolah ${config.city}`,
  ],
  eyebrow: `Untuk bisnis di ${config.city}`,
  headline: config.headline,
  intro: config.intro,
  localContext: config.context,
  localHighlights: config.highlights,
  locationLabel: config.locationLabel,
  serviceFocus: config.serviceFocus,
  seoHeading: config.seoHeading,
  seoParagraph: config.seoParagraph,
  seoSecondHeading: config.seoSecondHeading,
  seoSecondParagraph: config.seoSecondParagraph,
  keywordCoverage: config.keywordCoverage,
  services: [
    { title: 'Website UMKM & Toko', description: 'Website UMKM, toko online, katalog produk, lokasi, dan WhatsApp.', anchor: 'umkm' },
    { title: 'Company Profile', description: 'Jasa pembuatan website company profile untuk profil, layanan, dan portofolio.', anchor: 'company-profile' },
    { title: 'Landing Page', description: 'Landing page untuk promosi satu produk, jasa, atau campaign.', anchor: 'landing-page' },
    { title: 'Sekolah & Yayasan', description: 'Website sekolah dan yayasan untuk profil lembaga, program, fasilitas, dan informasi.', anchor: 'sekolah' },
  ],
  faqs: [
    { q: `Apakah Nakama Digital melayani pembuatan website untuk bisnis di ${config.city}?`, a: `Ya. Website dapat dibuat untuk berbagai jenis bisnis dan organisasi yang beroperasi di ${config.city} dan membutuhkan kehadiran digital profesional.` },
    { q: 'Apakah website bisa terhubung ke WhatsApp?', a: 'Ya. Tombol WhatsApp dapat ditempatkan pada bagian strategis agar calon pelanggan dapat menghubungi bisnis secara langsung.' },
    { q: 'Apakah website bisa muncul di Google?', a: 'Website dapat dibuat dengan struktur teknis dan konten yang SEO-friendly. Namun, posisi tertentu di hasil pencarian Google tidak dapat dijamin karena ranking dipengaruhi banyak faktor.' },
    { q: 'Apakah website bisa dibuka melalui HP?', a: 'Ya. Website dirancang responsive agar nyaman digunakan pada smartphone, tablet, dan desktop.' },
    { q: `Apakah tersedia jasa web design dan desain website di ${config.city}?`, a: `Ya. Kebutuhan jasa web design dan desain website dapat disesuaikan dengan jenis bisnis, gaya brand, struktur halaman, dan tujuan website di ${config.city}.` },
    { q: `Berapa biaya pembuatan website di ${config.city}?`, a: `Biaya disesuaikan dengan jenis website, jumlah halaman, fitur, dan ruang lingkup proyek. Konsultasi dapat digunakan untuk menentukan kebutuhan terlebih dahulu.` },
    { q: 'Saya belum tahu website seperti apa yang saya butuhkan. Bagaimana?', a: `Ceritakan jenis bisnis, layanan, dan target pelanggan Anda di ${config.city}. Kami akan membantu menentukan struktur website yang sesuai.` },
  ],
});

export const localSeoCities: Record<string, LocalSeoCity> = Object.fromEntries(
  (cityConfig as CityConfig[]).map((config) => [config.slug, buildCity(config)]),
);

export const getLocalSeoCity = (slug: string) => localSeoCities[slug.toLowerCase()];
