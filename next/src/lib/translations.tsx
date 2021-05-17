import React, { createContext, useEffect, useState } from "react";
import { Languages } from "./lang";

export const defaultLocale = "en";
export const locales = Object.getOwnPropertyNames(Languages);
export const LanguageContext = createContext<any>([]);

export const LanguageProvider: React.FC = ({ children }) => {
  const [locale, setLocale] = useState<string>("en");

  useEffect(() => {
    if (!window) {
      return;
    }

    const language = localStorage.getItem("lang") || locale;
    setLocale(language);
  }, [locale]);

  return (
    <LanguageContext.Provider value={[locale, setLocale]}>
      {children}
    </LanguageContext.Provider>
  );
};
