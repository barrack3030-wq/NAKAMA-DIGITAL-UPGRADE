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

export const localSeoCities: Record<string, LocalSeoCity> = {
  luwuk: {
    slug: 'luwuk',
    city: 'Luwuk',
    region: 'Banggai',
    country: 'Indonesia',
    primaryKeyword: 'jasa pembuatan website Luwuk',
    secondaryKeywords: [
      'jasa website Luwuk',
      'web developer Luwuk',
      'jasa web design Luwuk',
      'jasa website UMKM Luwuk',
      'jasa website sekolah Luwuk',
    ],
    eyebrow: 'Untuk bisnis di Luwuk',
    headline: 'Saatnya bisnis Anda tampil lebih profesional di internet',
    intro: 'Buat bisnis lebih mudah dikenal, dipercaya, dan ditemukan di internet dengan website profesional dari Nakama Digital.',
    localContext: 'Kami menyiapkan website untuk bisnis, UMKM, toko, jasa, sekolah, yayasan, dan perusahaan yang melayani pelanggan di Luwuk dan sekitarnya.',
    services: [
      { title: 'Website UMKM & Toko', description: 'Produk, katalog, lokasi, dan WhatsApp dalam satu tempat.', anchor: 'umkm' },
      { title: 'Company Profile', description: 'Profil perusahaan, layanan, portofolio, dan kontak.', anchor: 'company-profile' },
      { title: 'Landing Page', description: 'Halaman fokus untuk promosi produk, jasa, atau campaign.', anchor: 'landing-page' },
      { title: 'Sekolah & Yayasan', description: 'Profil lembaga, program, fasilitas, dan informasi.', anchor: 'sekolah' },
    ],
    faqs: [
      { q: 'Apakah Nakama Digital melayani pembuatan website di Luwuk?', a: 'Ya. Kami melayani kebutuhan website untuk bisnis, UMKM, toko, jasa, sekolah, yayasan, dan perusahaan.' },
      { q: 'Apakah website dapat terhubung ke WhatsApp?', a: 'Ya. Tombol WhatsApp dapat ditempatkan pada bagian strategis agar calon pelanggan dapat menghubungi bisnis secara langsung.' },
      { q: 'Apakah website dibuat agar mudah ditemukan di Google?', a: 'Website dapat dibuat dengan struktur teknis dan konten yang SEO-friendly. Posisi tertentu di Google tidak dapat dijamin karena ranking dipengaruhi banyak faktor.' },
      { q: 'Apakah website responsive?', a: 'Ya. Website dirancang agar nyaman digunakan pada smartphone, tablet, dan desktop.' },
    ],
  },
  sintang: {
    slug: 'sintang',
    city: 'Sintang',
    region: 'Kalimantan Barat',
    country: 'Indonesia',
    primaryKeyword: 'jasa pembuatan website Sintang',
    secondaryKeywords: [
      'jasa website Sintang',
      'web developer Sintang',
      'jasa web design Sintang',
      'jasa website UMKM Sintang',
      'jasa website sekolah Sintang',
    ],
    eyebrow: 'Untuk bisnis di Sintang',
    headline: 'Saatnya bisnis Anda tampil lebih profesional di internet',
    intro: 'Buat bisnis lebih mudah dikenal, dipercaya, dan ditemukan di internet dengan website profesional dari Nakama Digital.',
    localContext: 'Kami menyiapkan website untuk bisnis, UMKM, toko, jasa, sekolah, yayasan, dan perusahaan yang melayani pelanggan di Sintang dan sekitarnya.',
    services: [
      { title: 'Website UMKM & Toko', description: 'Produk, katalog, lokasi, dan WhatsApp dalam satu tempat.', anchor: 'umkm' },
      { title: 'Company Profile', description: 'Profil perusahaan, layanan, portofolio, dan kontak.', anchor: 'company-profile' },
      { title: 'Landing Page', description: 'Halaman fokus untuk promosi produk, jasa, atau campaign.', anchor: 'landing-page' },
      { title: 'Sekolah & Yayasan', description: 'Profil lembaga, program, fasilitas, dan informasi.', anchor: 'sekolah' },
    ],
    faqs: [
      { q: 'Apakah Nakama Digital melayani pembuatan website di Sintang?', a: 'Ya. Kami melayani kebutuhan website untuk bisnis, UMKM, toko, jasa, sekolah, yayasan, dan perusahaan.' },
      { q: 'Apakah website dapat terhubung ke WhatsApp?', a: 'Ya. Tombol WhatsApp dapat ditempatkan pada bagian strategis agar calon pelanggan dapat menghubungi bisnis secara langsung.' },
      { q: 'Apakah website dibuat agar mudah ditemukan di Google?', a: 'Website dapat dibuat dengan struktur teknis dan konten yang SEO-friendly. Posisi tertentu di Google tidak dapat dijamin karena ranking dipengaruhi banyak faktor.' },
      { q: 'Apakah website responsive?', a: 'Ya. Website dirancang agar nyaman digunakan pada smartphone, tablet, dan desktop.' },
    ],
  },
};

export const getLocalSeoCity = (slug: string) => localSeoCities[slug.toLowerCase()];
