import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, Translations, TRANSLATIONS } from "./translations";
import { CurriculumDay, Question } from "../types";
import { getLocalizedCurriculumDay, getLocalizedQuestion } from "./localizedCurriculumData";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  getCurriculumDay: (day: CurriculumDay) => CurriculumDay;
  getQuestion: (question: Question) => Question;
}

const STORAGE_KEY = "virtuepath_app_language";

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: TRANSLATIONS.en,
  getCurriculumDay: (d) => d,
  getQuestion: (q) => q,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY) as Language;
        if (saved === "en" || saved === "de") return saved;
      } catch {
        // ignore
      }
    }
    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    const next = language === "en" ? "de" : "en";
    setLanguage(next);
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const getCurriculumDay = (day: CurriculumDay): CurriculumDay => {
    return getLocalizedCurriculumDay(day, language);
  };

  const getQuestion = (question: Question): Question => {
    return getLocalizedQuestion(question, language);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        getCurriculumDay,
        getQuestion,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
