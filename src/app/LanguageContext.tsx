import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { translations, type Language } from './data/translations';

const LANGUAGE_KEY = 'spin-quiz-language';

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: typeof translations.en;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  return window.sessionStorage.getItem(LANGUAGE_KEY) === 'si' ? 'si' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.sessionStorage.setItem(LANGUAGE_KEY, nextLanguage);
  };
  const value = useMemo(() => ({ language, setLanguage, t: translations[language] }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
