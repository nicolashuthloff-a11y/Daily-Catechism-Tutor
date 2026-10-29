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
  const [language, setLanguageState] = useState<Language>("en");

  const setLanguage = (lang: Language) => {
    setLanguageState("en");
    try {
      localStorage.setItem(STORAGE_KEY, "en");
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage("en");
  };

  const t = TRANSLATIONS.en;

  const getCurriculumDay = (day: CurriculumDay): CurriculumDay => {
    return getLocalizedCurriculumDay(day, "en");
  };

  const getQuestion = (question: Question): Question => {
    return getLocalizedQuestion(question, "en");
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
