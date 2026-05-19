"use client";

import { useCallback, useState } from "react";
import {
  currencyOptions,
  defaultLanguage,
  languageOptions,
  localStorageLanguageKey,
  translations,
  type LanguageCode,
  type Translations,
} from "@/app/lib/i18n";

function isLanguageCode(value: unknown): value is LanguageCode {
  return typeof value === "string" && ["fr", "en", "de", "es"].includes(value);
}

function getStoredLanguage(): LanguageCode {
  if (typeof window === "undefined") return defaultLanguage;
  const stored = window.localStorage.getItem(localStorageLanguageKey);
  return isLanguageCode(stored) ? stored : defaultLanguage;
}

export function useLanguage() {
  const [language, setLanguageState] = useState<LanguageCode>(() => getStoredLanguage());

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
    window.localStorage.setItem(localStorageLanguageKey, lang);
    window.location.reload();
  }, []);

  const currentLanguage =
    languageOptions.find((item) => item.code === language) ?? languageOptions[0];

  return {
    language,
    setLanguage,
    currentLanguage,
    languageOptions,
    currencyOptions,
    currency: currencyOptions[0].label,
    labels: translations[language],
  } as {
    language: LanguageCode;
    setLanguage: (lang: LanguageCode) => void;
    currentLanguage: (typeof languageOptions)[number];
    languageOptions: readonly (typeof languageOptions)[number][];
    currencyOptions: readonly (typeof currencyOptions)[number][];
    currency: string;
    labels: Translations;
  };
}
