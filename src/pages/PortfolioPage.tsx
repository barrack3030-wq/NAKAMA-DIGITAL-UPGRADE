import React from 'react';
import { LanguageProvider } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import Portfolio from '../components/Portfolio';
import Footer from '../components/Footer';

export default function PortfolioPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#FDFDFF] text-brand-900">
        <Navbar />
        <main className="pt-20">
          <Portfolio />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
