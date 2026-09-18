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
  services: { title: string; description: string; anchor: string }[];
  faqs: { q: string; a: string }[];
};

const buildCity = (city: string, region: string): LocalSeoCity => ({
  slug: city.toLowerCase(),
  city,
  region,
  country: 'Indonesia',
  primaryKeyword: `jasa pembuatan website ${city}`,
  secondaryKeywords: [
    `jasa website ${city}`,
    `web developer ${city}`,
    `jasa web design ${city}`,
    `jasa website UMKM ${city}`,
    `jasa website sekolah ${city}`,
  ],
  eyebrow: `Untuk bisnis di ${city}`,
  headline: `Halo Warga ${city}, Saatnya Bisnis Anda Tampil Lebih Profesional di Internet`,
  intro: 'Buat bisnis Anda lebih mudah dikenal, dipercaya, dan ditemukan di internet dengan website profesional dari Nakama Digital.',
  localContext: `Kami menyiapkan website untuk berbagai jenis bisnis dan organisasi yang membutuhkan kehadiran digital profesional di ${city}.`,
  services: [
    { title: 'Website UMKM & Toko', description: 'Produk, katalog, lokasi, dan WhatsApp.', anchor: 'umkm' },
    { title: 'Company Profile', description: 'Profil perusahaan, layanan, dan portofolio.', anchor: 'company-profile' },
    { title: 'Landing Page', description: 'Fokus promosi satu produk, jasa, atau campaign.', anchor: 'landing-page' },
    { title: 'Sekolah & Yayasan', description: 'Profil lembaga, program, fasilitas, dan informasi.', anchor: 'sekolah' },
  ],
  faqs: [
    { q: `Apakah Nakama Digital melayani pembuatan website untuk bisnis di ${city}?`, a: 'Ya. Website dapat dibuat untuk berbagai jenis bisnis dan organisasi yang membutuhkan kehadiran digital profesional.' },
    { q: 'Apakah website bisa terhubung ke WhatsApp?', a: 'Ya. Tombol WhatsApp dapat ditempatkan pada bagian strategis agar calon pelanggan dapat menghubungi bisnis secara langsung.' },
    { q: 'Apakah website bisa muncul di Google?', a: 'Website dapat dibuat dengan struktur teknis dan konten yang SEO-friendly. Namun, posisi tertentu di hasil pencarian Google tidak dapat dijamin karena ranking dipengaruhi banyak faktor.' },
    { q: 'Apakah website bisa dibuka melalui HP?', a: 'Ya. Website dirancang responsive agar nyaman digunakan pada smartphone, tablet, dan desktop.' },
    { q: 'Saya belum tahu website seperti apa yang saya butuhkan. Bagaimana?', a: 'Ceritakan saja jenis bisnis, layanan, dan tujuan Anda. Kami akan membantu menentukan struktur website yang sesuai.' },
  ],
});

export const localSeoCities: Record<string, LocalSeoCity> = {
  luwuk: buildCity('Luwuk', 'Banggai'),
  sintang: buildCity('Sintang', 'Kalimantan Barat'),
};

export const getLocalSeoCity = (slug: string) => localSeoCities[slug.toLowerCase()];
