import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import ProductExperience from './components/ProductExperience';
import Features from './components/Features';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Contact from './components/Contact';
import CTA from './components/CTA';
import Footer from './components/Footer';
import CityLanding from './pages/CityLanding';
import ServiceLanding from './pages/ServiceLanding';
import BlogIndex from './pages/BlogIndex';
import BlogArticle from './pages/BlogArticle';
import { blogSeoPosts } from './data/blogSeoPosts';
import { localSeoCities } from './data/localSeoCities';
import PortfolioPage from './pages/PortfolioPage';

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

function PublicPage({ english = false }: { english?: boolean }) {
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

    document.title = title;
    document.documentElement.lang = isEnglish ? 'en' : 'id';

    const setMeta = (selector: string, attributes: Record<string, string>) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        document.head.appendChild(element);
      }
      Object.entries(attributes).forEach(([name, value]) => element!.setAttribute(name, value));
    };

    const setCanonical = (href: string) => {
      let element = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.rel = 'canonical';
        document.head.appendChild(element);
      }
      element.href = href;
    };

    setMeta('meta[name="description"]', { name: 'description', content: description });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    setCanonical(canonicalUrl);
  }, [lang]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <ProductExperience />
        <Features />
        <Process />
        <Contact />
        <CTA />

        <section id="blog" className="border-t border-slate-100 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-14">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-brand-600">Panduan website</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Sebelum bikin website, lihat dulu panduannya.</h2>
                <p className="mt-3 text-base leading-7 text-slate-600">Artikel singkat tentang jenis website, struktur halaman, dan hal yang perlu disiapkan sebelum mulai.</p>
              </div>
              <a href="/blog/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">Lihat semua artikel <span aria-hidden="true">→</span></a>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {blogSeoPosts.slice(0, 3).map((post) => (
                <a key={post.slug} href={`/blog/${post.slug}/`} className="group rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-lg">
                  <p className="text-xs font-semibold uppercase tracking-[.12em] text-brand-600">{post.keyword}</p>
                  <h3 className="mt-2 text-lg font-bold tracking-tight text-brand-900">{post.headline}</h3>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">Baca artikel <span className="transition group-hover:translate-x-1">→</span></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-14">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-brand-600">Area layanan</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Jasa website berdasarkan kota.</h2>
              <p className="mt-3 text-base leading-7 text-slate-600">Lihat halaman lokal untuk kebutuhan website bisnis, UMKM, sekolah, dan organisasi di kota yang sudah kami siapkan.</p>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {Object.values(localSeoCities).map((item) => (
                <a key={item.city} href={`/${item.slug}/`} className="group rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-lg">
                  <span className="text-xs font-semibold uppercase tracking-[.12em] text-brand-600">Website {item.city}</span>
                  <h3 className="mt-2 text-lg font-bold tracking-tight text-brand-900">{item.city}</h3>
                  <p className="mt-1 text-sm text-slate-500">{item.region}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">Lihat layanan <span className="transition group-hover:translate-x-1">→</span></span>
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <a href="https://wa.me/6285820830530?text=Halo%20Nakama%20Digital,%20saya%20ingin%20konsultasi%20website." target="_blank" rel="noopener noreferrer" className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl flex items-center justify-center z-50" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z"/></svg>
      </a>
    </>
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
          <Route path="/portfolio/" element={<PortfolioPage />} />
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
