export type Language = 'id' | 'en';

export const dict = {
  id: {
    nav: {
      home: 'Beranda',
      services: 'Layanan',
      portfolio: 'Portfolio',
      process: 'Proses',
      faq: 'FAQ',
      blog: 'Blog',
      cta: 'Mulai Konsultasi'
    },
    hero: {
      eyebrow: 'Untuk bisnis yang ingin tampil lebih jelas di internet',
      title1: 'Jasa pembuatan website untuk\nbisnis & UMKM',
      titleHighlight: 'yang dibuat mengikuti kebutuhan bisnis Anda.',
      desc: '',
      cta1: 'Ceritakan Kebutuhan Anda',
      cta2: 'Lihat Contoh Website'
    },
    stats: [
      { label: 'Website & proyek', value: '100+' },
      { label: 'Waktu Pengerjaan', value: '3–7 Hari' },
      { label: 'Responsif', value: '100%' },
      { label: 'Fondasi Teknis', value: 'SEO Ready' },
    ],
    services: {
      title: 'Jenis website yang paling sering dibutuhkan bisnis.',
      items: [
        { title: 'Website Company Profile' },
        { title: 'Website UMKM' },
        { title: 'Landing Page' },
        { title: 'Website Sekolah' },
        { title: 'Website Travel' },
        { title: 'Toko Online' },
        { title: 'SEO Optimization' },
        { title: 'Website Maintenance' },
      ]
    },
    experience: {
      title1: 'Website yang langsung menjelaskan bisnis Anda.',
      title2: 'Tanpa bikin pengunjung menebak-nebak.'
    },
    features: {
      title1: 'Tampilan yang rapi.',
      title2: 'Struktur yang tidak bikin bingung.',
      items: [
        'Struktur yang jelas',
        'Cepat dibuka',
        'Nyaman di mobile',
        'Mudah ditemukan',
        'Mudah diperbarui',
        'Arah CTA yang jelas'
      ]
    },
    portfolio: {
      title: 'Contoh website yang bisa kami sesuaikan',
      desc: 'Lihat beberapa contoh tampilan. Struktur, warna, isi, dan gaya visualnya bisa disesuaikan dengan bisnis Anda.',
      viewAll: 'Lihat Semua Portfolio'
    },
    process: {
      title: 'Dari kebutuhan bisnis sampai website siap dipakai.',
      items: [
        { id: '01', title: 'Discover', desc: 'Memahami bisnis, tujuan, dan target audiens Anda.' },
        { id: '02', title: 'Design', desc: 'Merancang pengalaman visual yang premium dan berpusat pada pengguna.' },
        { id: '03', title: 'Build', desc: 'Mengembangkan dengan teknologi modern untuk kecepatan dan keandalan.' },
        { id: '04', title: 'Launch', desc: 'Pengujian ketat dan peluncuran yang mulus.' },
      ]
    },
    contact: {
      title: 'Ceritakan dulu kebutuhan Anda.',
      desc: 'Tidak perlu sudah tahu semua detail. Ceritakan bisnis dan kebutuhan Anda, lalu kita susun arah websitenya.',
      name: 'Nama',
      whatsapp: 'Nomor WhatsApp',
      business: 'Nama Bisnis',
      type: 'Jenis Website',
      budget: 'Budget',
      message: 'Pesan / Kebutuhan',
      submit: 'Kirim Permintaan',
      waTemplate: 'Halo Nakama Digital,%0A%0ASaya ingin konsultasi website.%0A%0ANama: {name}%0ANo. WhatsApp: {whatsapp}%0ANama Bisnis: {business}%0AJenis Website: {type}%0ABudget: {budget}%0AKebutuhan: {message}%0A%0ATerima kasih.',
      typeOptions: ['Company Profile', 'UMKM', 'Landing Page', 'Sekolah', 'Travel', 'Toko Online', 'Custom'],
      budgetOptions: ['Di bawah Rp2 juta', 'Rp2–5 juta', 'Rp5–10 juta', 'Di atas Rp10 juta', 'Belum tahu']
    },
    faq: {
      title: 'Sebelum mulai, ini yang sering ditanyakan',
      items: [
        { q: 'Berapa lama website dibuat?', a: 'Waktu pengerjaan bervariasi tergantung kompleksitas. Umumnya memakan waktu 3–7 hari kerja untuk website standar, dan 2-4 minggu untuk website custom.' },
        { q: 'Apakah bisa menggunakan domain sendiri?', a: 'Tentu. Anda bisa menggunakan domain yang sudah ada, atau kami bisa membantu mendaftarkan domain baru untuk Anda.' },
        { q: 'Apakah website responsive?', a: 'Ya, semua website yang kami buat dijamin 100% responsive dan akan terlihat sempurna di berbagai perangkat (desktop, tablet, maupun mobile).' },
        { q: 'Apakah saya bisa mengubah konten?', a: 'Kami menyediakan CMS (Content Management System) yang mudah digunakan sehingga Anda dapat mengubah teks, gambar, dan konten lainnya secara mandiri.' },
        { q: 'Apakah bisa membantu hosting dan domain?', a: 'Ya, kami menyediakan paket all-in-one yang sudah termasuk layanan hosting berkecepatan tinggi dan registrasi domain.' },
        { q: 'Bagaimana proses pembayarannya?', a: 'Pembayaran dapat dilakukan dalam dua tahap: DP (Down Payment) sebesar 50% untuk memulai proyek, dan pelunasan 50% setelah website selesai dan siap online.' }
      ]
    },
    cta: {
      title1: 'Punya rencana bikin website?',
      title2: 'Kita mulai dari kebutuhan bisnisnya.',
      desc: 'Tidak harus sudah punya brief. Ceritakan bisnis Anda di WhatsApp, kami bantu menentukan langkah berikutnya.',
      btn: 'Konsultasi via WhatsApp'
    },
    footer: {
      desc: 'Kami membantu bisnis, UMKM, sekolah, travel, dan organisasi tampil lebih jelas di internet lewat website yang rapi, cepat, dan mudah digunakan.',
      nav: 'Navigasi',
      contact: 'Kontak',
      privacy: 'Kebijakan Privasi',
      terms: 'Syarat Ketentuan'
    }
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      portfolio: 'Portfolio',
      process: 'Process',
      faq: 'FAQ',
      blog: 'Blog',
      cta: 'Start Consultation'
    },
    hero: {
      eyebrow: 'For businesses that want a clearer presence online',
      title1: 'Websites that make\nyour business easier to understand',
      titleHighlight: 'and easier to trust.',
      desc: 'We shape the design, content, and flow so visitors quickly understand what you do, what you offer, and how to contact you.',
      cta1: 'Tell Us What You Need',
      cta2: 'See Website Examples'
    },
    stats: [
      { label: 'Websites & projects', value: '100+' },
      { label: 'Typical Delivery', value: '3–7 Days' },
      { label: 'Responsive', value: '100%' },
      { label: 'Technical Foundation', value: 'SEO Ready' },
    ],
    services: {
      title: 'Website types businesses most often need.',
      items: [
        { title: 'Company Profile Website' },
        { title: 'SME Website' },
        { title: 'Landing Page' },
        { title: 'School Website' },
        { title: 'Travel Website' },
        { title: 'Online Store' },
        { title: 'SEO Optimization' },
        { title: 'Website Maintenance' },
      ]
    },
    experience: {
      title1: 'A website that explains your business clearly.',
      title2: 'Without making visitors guess.'
    },
    features: {
      title1: 'A clean first impression.',
      title2: 'A structure that stays clear.',
      items: [
        'Clear structure',
        'Fast loading',
        'Comfortable on mobile',
        'Easy to find',
        'Easy to update',
        'Clear calls to action'
      ]
    },
    portfolio: {
      title: 'Website examples we can adapt',
      desc: 'See a few examples of different website styles. Structure, colors, content, and visual direction can be adapted to your business.',
      viewAll: 'View All Portfolio'
    },
    process: {
      title: 'From business needs to a website ready to use.',
      items: [
        { id: '01', title: 'Discover', desc: 'Understanding your business, goals, and target audience.' },
        { id: '02', title: 'Design', desc: 'Crafting premium, user-centric visual experiences.' },
        { id: '03', title: 'Build', desc: 'Developing with modern tech for speed and reliability.' },
        { id: '04', title: 'Launch', desc: 'Rigorous testing and a smooth deployment.' },
      ]
    },
    contact: {
      title: 'Tell us what you need first.',
      desc: 'You do not need to have every detail figured out. Tell us about your business and goals, and we will help shape the website direction.',
      name: 'Name',
      whatsapp: 'WhatsApp Number',
      business: 'Business Name',
      type: 'Website Type',
      budget: 'Budget',
      message: 'Message / Needs',
      submit: 'Send Request',
      waTemplate: 'Hello Nakama Digital,%0A%0AI would like to consult about a website.%0A%0AName: {name}%0AWhatsApp: {whatsapp}%0ABusiness Name: {business}%0AWebsite Type: {type}%0ABudget: {budget}%0ANeeds: {message}%0A%0AThank you.',
      typeOptions: ['Company Profile', 'SME', 'Landing Page', 'School', 'Travel', 'E-commerce', 'Custom'],
      budgetOptions: ['Under Rp2 million', 'Rp2–5 million', 'Rp5–10 million', 'Above Rp10 million', 'Not sure yet']
    },
    faq: {
      title: 'Before we start, here are common questions',
      items: [
        { q: 'How long does it take to build a website?', a: 'Development time varies depending on complexity. It generally takes 3–7 working days for a standard website, and 2-4 weeks for custom websites.' },
        { q: 'Can I use my own domain?', a: 'Certainly. You can use an existing domain, or we can help register a new domain for you.' },
        { q: 'Are the websites responsive?', a: 'Yes, all websites we build are guaranteed to be 100% responsive and will look perfect on various devices (desktop, tablet, and mobile).' },
        { q: 'Can I change the content myself?', a: 'We provide an easy-to-use CMS (Content Management System) so you can update text, images, and other content independently.' },
        { q: 'Do you help with hosting and domain?', a: 'Yes, we provide all-in-one packages that include high-speed hosting and domain registration.' },
        { q: 'How does the payment process work?', a: 'Payment can be made in two stages: a 50% DP (Down Payment) to start the project, and the remaining 50% upon completion when the website is ready to go live.' }
      ]
    },
    cta: {
      title1: 'Planning a new website?',
      title2: 'Let’s start with what your business needs.',
      desc: 'You do not need a finished brief. Tell us about your business on WhatsApp and we will help define the next step.',
      btn: 'Talk on WhatsApp'
    },
    footer: {
      desc: 'We help businesses, SMEs, schools, travel companies, and organizations build clear, practical websites.',
      nav: 'Navigation',
      contact: 'Contact',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    }
  }
};
