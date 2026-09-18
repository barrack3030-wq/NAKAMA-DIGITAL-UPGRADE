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
  services: { title: string; description: string; anchor: string }[];
  faqs: { q: string; a: string }[];
};

const buildCity = (city: string, region: string, local: {
  headline: string;
  intro: string;
  context: string;
  highlights: string[];
}): LocalSeoCity => ({
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
  headline: local.headline,
  intro: local.intro,
  localContext: local.context,
  localHighlights: local.highlights,
  services: [
    { title: 'Website UMKM & Toko', description: 'Produk, katalog, lokasi, dan WhatsApp.', anchor: 'umkm' },
    { title: 'Company Profile', description: 'Profil perusahaan, layanan, dan portofolio.', anchor: 'company-profile' },
    { title: 'Landing Page', description: 'Fokus promosi satu produk, jasa, atau campaign.', anchor: 'landing-page' },
    { title: 'Sekolah & Yayasan', description: 'Profil lembaga, program, fasilitas, dan informasi.', anchor: 'sekolah' },
  ],
  faqs: [
    { q: `Apakah Nakama Digital melayani pembuatan website untuk bisnis di ${city}?`, a: `Ya. Website dapat dibuat untuk berbagai jenis bisnis dan organisasi yang beroperasi di ${city} dan membutuhkan kehadiran digital profesional.` },
    { q: 'Apakah website bisa terhubung ke WhatsApp?', a: 'Ya. Tombol WhatsApp dapat ditempatkan pada bagian strategis agar calon pelanggan dapat menghubungi bisnis secara langsung.' },
    { q: 'Apakah website bisa muncul di Google?', a: 'Website dapat dibuat dengan struktur teknis dan konten yang SEO-friendly. Namun, posisi tertentu di hasil pencarian Google tidak dapat dijamin karena ranking dipengaruhi banyak faktor.' },
    { q: 'Apakah website bisa dibuka melalui HP?', a: 'Ya. Website dirancang responsive agar nyaman digunakan pada smartphone, tablet, dan desktop.' },
    { q: 'Saya belum tahu website seperti apa yang saya butuhkan. Bagaimana?', a: `Ceritakan jenis bisnis, layanan, dan target pelanggan Anda di ${city}. Kami akan membantu menentukan struktur website yang sesuai.` },
  ],
});

export const localSeoCities: Record<string, LocalSeoCity> = {
  luwuk: buildCity('Luwuk', 'Banggai', {
    headline: 'Jasa Pembuatan Website di Luwuk untuk Bisnis yang Ingin Tampil Lebih Profesional',
    intro: 'Bangun website profesional untuk UMKM, jasa, hotel, travel, sekolah, dan perusahaan di Luwuk agar informasi bisnis lebih mudah diakses calon pelanggan.',
    context: 'Untuk bisnis di Luwuk dan wilayah Banggai, website dapat menjadi pusat informasi resmi yang menyatukan profil usaha, layanan, lokasi, portofolio, dan kontak WhatsApp.',
    highlights: ['UMKM, toko, dan usaha lokal', 'Hotel, homestay, travel, dan pariwisata', 'Jasa, perusahaan, dan profesional', 'Sekolah, yayasan, dan organisasi'],
  }),
  sintang: buildCity('Sintang', 'Kalimantan Barat', {
    headline: 'Jasa Pembuatan Website di Sintang untuk UMKM, Sekolah, dan Bisnis Lokal',
    intro: 'Buat bisnis dan organisasi di Sintang memiliki website resmi yang rapi, cepat diakses, mobile-friendly, dan siap menjadi pusat informasi online.',
    context: 'Website untuk bisnis di Sintang dapat membantu menyajikan profil, produk, layanan, alamat, portofolio, dan jalur komunikasi dalam satu halaman resmi yang mudah dibagikan.',
    highlights: ['UMKM, toko, dan kuliner', 'Jasa dan usaha lokal', 'Sekolah, madrasah, dan yayasan', 'Perusahaan dan organisasi'],
  }),
  surabaya: buildCity('Surabaya', 'Jawa Timur', {
    headline: 'Jasa Pembuatan Website di Surabaya untuk UMKM, Perusahaan, dan Layanan Profesional',
    intro: 'Tampilkan bisnis Anda di Surabaya dengan website profesional yang fokus pada kejelasan layanan, tampilan modern, mobile experience, dan kemudahan calon pelanggan menghubungi Anda.',
    context: 'Untuk pasar Surabaya yang beragam, website dapat disusun sebagai pusat informasi bisnis: menjelaskan layanan, menampilkan portofolio, memperkuat identitas brand, dan mengarahkan pengunjung ke WhatsApp.',
    highlights: ['UMKM, toko, dan bisnis kuliner', 'Company profile dan jasa profesional', 'Properti, developer, dan hospitality', 'Sekolah, klinik, dan organisasi'],
  }),
};

export const getLocalSeoCity = (slug: string) => localSeoCities[slug.toLowerCase()];
