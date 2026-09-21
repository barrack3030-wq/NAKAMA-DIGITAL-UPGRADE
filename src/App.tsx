import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import CityLanding from './pages/CityLanding';
import ServiceLanding from './pages/ServiceLanding';
import BlogIndex from './pages/BlogIndex';
import BlogArticle from './pages/BlogArticle';

const Admin = lazy(() => import('./pages/Admin'));
const CustomerIntake = lazy(() => import('./pages/CustomerIntake'));
const WorkflowLayout = lazy(() => import('./workflow/components/WorkflowLayout').then((module) => ({ default: module.WorkflowLayout })));
const WorkflowLogin = lazy(() => import('./workflow/pages/WorkflowLogin').then((module) => ({ default: module.WorkflowLogin })));
const WorkflowDashboard = lazy(() => import('./workflow/pages/WorkflowDashboard'));
const Customers = lazy(() => import('./workflow/pages/Customers').then((module) => ({ default: module.Customers })));
const CustomerForm = lazy(() => import('./workflow/pages/CustomerForm').then((module) => ({ default: module.CustomerForm })));
const CustomerDetail = lazy(() => import('./workflow/pages/CustomerDetail').then((module) => ({ default: module.CustomerDetail })));
const Projects = lazy(() => import('./workflow/pages/Projects').then((module) => ({ default: module.Projects })));
const ProjectForm = lazy(() => import('./workflow/pages/ProjectForm').then((module) => ({ default: module.ProjectForm })));
const ProjectDetail = lazy(() => import('./workflow/pages/ProjectDetail').then((module) => ({ default: module.ProjectDetail })));
const Tasks = lazy(() => import('./workflow/pages/Tasks').then((module) => ({ default: module.Tasks })));
const Settings = lazy(() => import('./workflow/pages/Settings').then((module) => ({ default: module.Settings })));

function PublicPage() {
  return (
    <LanguageProvider>
      <PageContent />
    </LanguageProvider>
  );
}

function PageContent() {
  const { lang } = useLanguage();

  useEffect(() => {
    const isEnglish = lang === 'en';
    const title = isEnglish
      ? 'Professional Website Design & Development | Nakama Digital'
      : 'Jasa Pembuatan Website untuk Bisnis & UMKM | Nakama Digital';
    const description = isEnglish
      ? 'Nakama Digital designs fast, responsive, professional websites for businesses, SMEs, schools, travel companies, and organizations.'
      : 'Jasa pembuatan website profesional untuk bisnis, UMKM, sekolah, travel, dan perusahaan. Nakama Digital mengerjakan website yang cepat, responsif, dan siap mendukung pemasaran online.';
    const canonicalUrl = isEnglish
      ? 'https://nakamadigital.biz.id/en/'
      : 'https://nakamadigital.biz.id/';

    const faqItems = isEnglish
      ? [
          { q: 'How long does it take to build a website?', a: 'Development time varies depending on complexity. It generally takes 3–7 working days for a standard website, and 2-4 weeks for custom websites.' },
          { q: 'Can I use my own domain?', a: 'Certainly. You can use an existing domain, or we can help register a new domain for you.' },
          { q: 'Are the websites responsive?', a: 'Yes, all websites we build are guaranteed to be 100% responsive and will look perfect on various devices (desktop, tablet, and mobile).' },
          { q: 'Can I change the content myself?', a: 'We provide an easy-to-use CMS (Content Management System) so you can update text, images, and other content independently.' },
          { q: 'Do you help with hosting and domain?', a: 'Yes, we provide all-in-one packages that include high-speed hosting and domain registration.' },
          { q: 'How does the payment process work?', a: 'Payment can be made in two stages: a 50% DP (Down Payment) to start the project, and the remaining 50% upon completion when the website is ready to go live.' }
        ]
      : [
          { q: 'Berapa lama website dibuat?', a: 'Waktu pengerjaan bervariasi tergantung kompleksitas. Umumnya memakan waktu 3–7 hari kerja untuk website standar, dan 2-4 minggu untuk website custom.' },
          { q: 'Apakah bisa menggunakan domain sendiri?', a: 'Tentu. Anda bisa menggunakan domain yang sudah ada, atau kami bisa membantu mendaftarkan domain baru untuk Anda.' },
          { q: 'Apakah website responsive?', a: 'Ya, semua website yang kami buat dijamin 100% responsive dan akan terlihat sempurna di berbagai perangkat (desktop, tablet, maupun mobile).' },
          { q: 'Apakah saya bisa mengubah konten?', a: 'Kami menyediakan CMS (Content Management System) yang mudah digunakan sehingga Anda dapat mengubah teks, gambar, dan konten lainnya secara mandiri.' },
          { q: 'Apakah bisa membantu hosting dan domain?', a: 'Ya, kami menyediakan paket all-in-one yang sudah termasuk layanan hosting berkecepatan tinggi dan registrasi domain.' },
          { q: 'Bagaimana proses pembayarannya?', a: 'Pembayaran dapat dilakukan dalam dua tahap: DP (Down Payment) sebesar 50% untuk memulai proyek, dan pelunasan 50% setelah website selesai dan siap online.' }
        ];

    document.documentElement.lang = isEnglish ? 'en' : 'id';
    document.title = title;

    const setMeta = (selector: string, attributes: Record<string, string>) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        document.head.appendChild(el);
      }
      Object.entries(attributes).forEach(([key, value]) => el!.setAttribute(key, value));
    };

    setMeta('meta[name="description"]', { name: 'description', content: description });
    setMeta('meta[name="robots"]', { name: 'robots', content: 'index,follow' });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    };

    let faqScript = document.head.querySelector('#homepage-faq-schema') as HTMLScriptElement | null;
    if (!faqScript) {
      faqScript = document.createElement('script');
      faqScript.id = 'homepage-faq-schema';
      faqScript.type = 'application/ld+json';
      document.head.appendChild(faqScript);
    }
    faqScript.textContent = JSON.stringify(faqSchema);
  }, [lang]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
      </main>
      <Footer />
      <a href="https://wa.me/6285820830530?text=Halo%20Nakama%20Digital,%20saya%20ingin%20konsultasi%20website." target="_blank" rel="noopener noreferrer" className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl flex items-center justify-center z-50" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.198-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z"/></svg>
      </a>
    </> 
  );
  );
}

function AppShell() {
  return (
    <div className="relative min-h-screen bg-[#FDFDFF] overflow-hidden selection:bg-brand-500 selection:text-white">
      <div className="fixed inset-0 z-0 pointer-events-none flex justify-center">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] rounded-full bg-brand-200/40 blur-[120px]" />
        <div className="absolute top-[30%] right-[-10%] w-[40vw] h-[60vh] rounded-full bg-blue-300/20 blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[10%] w-[60vw] h-[50vh] rounded-full bg-brand-400/15 blur-[150px]" />
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Routes>
          <Route element={<Suspense fallback={<div className="min-h-screen bg-white" aria-busy="true" />} />}>
            <Route path="/workflow/login" element={<WorkflowLogin />} />
            <Route path="/workflow" element={<WorkflowLayout />}>
              <Route index element={<WorkflowDashboard />} />
              <Route path="customers" element={<Customers />} />
              <Route path="customers/new" element={<CustomerForm />} />
              <Route path="customers/:id" element={<CustomerDetail />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/new" element={<ProjectForm />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/client-intake" element={<CustomerIntake />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/en" element={<PublicPage english />} />
          <Route path="/website-company-profile/" element={<ServiceLanding />} />
          <Route path="/website-umkm/" element={<ServiceLanding />} />
          <Route path="/landing-page/" element={<ServiceLanding />} />
          <Route path="/website-sekolah/" element={<ServiceLanding />} />
          <Route path="/website-travel/" element={<ServiceLanding />} />
          <Route path="/website-toko-online/" element={<ServiceLanding />} />
          <Route path="/blog/" element={<BlogIndex />} />
          <Route path="/blog/:slug/" element={<BlogArticle />} />
          <Route path="/:citySlug" element={<CityLanding />} />
          <Route path="/" element={<PublicPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return <AppShell />;
}
