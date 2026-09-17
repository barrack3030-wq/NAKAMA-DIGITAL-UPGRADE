import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import ProductExperience from './components/ProductExperience';
import Features from './components/Features';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import CustomerIntake from './pages/CustomerIntake';
import SintangLanding from './pages/SintangLanding';

import { WorkflowLayout } from './workflow/components/WorkflowLayout';
import { WorkflowLogin } from './workflow/pages/WorkflowLogin';
import WorkflowDashboard from './workflow/pages/WorkflowDashboard';
import { Customers } from './workflow/pages/Customers';
import { CustomerForm } from './workflow/pages/CustomerForm';
import { CustomerDetail } from './workflow/pages/CustomerDetail';
import { Projects } from './workflow/pages/Projects';
import { ProjectForm } from './workflow/pages/ProjectForm';
import { ProjectDetail } from './workflow/pages/ProjectDetail';
import { Tasks } from './workflow/pages/Tasks';
import { Settings } from './workflow/pages/Settings';

function PublicPage({ english = false }: { english?: boolean }) {
  return (
    <LanguageProvider>
      <PageContent />
    </LanguageProvider>
  );
}

function PageContent() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <ProductExperience />
        <Features />
        <Portfolio />
        <Process />
        <Contact />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <a href="https://wa.me/6285820830530?text=Halo%20Nakama%20Digital,%20saya%20ingin%20konsultasi%20website." target="_blank" rel="noopener noreferrer" className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl flex items-center justify-center z-50" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
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
          <Route path="/jasa-pembuatan-website-sintang/" element={<SintangLanding />} />
          <Route path="/" element={<SintangLanding />} />
          <Route path="/home" element={<PublicPage />} />
          <Route path="/en" element={<PublicPage english />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return <AppShell />;
}
