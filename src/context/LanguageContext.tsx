import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { dict, Language } from '../locales';

type LanguageContextType = {
  lang: Language;
  t: typeof dict.id;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('id');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check path for /en or /id
    const path = location.pathname;
    if (path.startsWith('/en')) {
      setLang('en');
    } else {
      setLang('id');
    }
  }, [location.pathname]);

  const setLanguage = (newLang: Language) => {
    if (newLang === 'en') {
      navigate('/en');
    } else {
      navigate('/');
    }
  };

  const t = dict[lang];

  return (
    <LanguageContext.Provider value={{ lang, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
