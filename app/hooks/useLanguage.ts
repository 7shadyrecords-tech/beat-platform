"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
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

const languageChangeEvent = "bp-language-change";

function getStoredLanguage(): LanguageCode {
  const stored = window.localStorage.getItem(localStorageLanguageKey);
  return isLanguageCode(stored) ? stored : defaultLanguage;
}

function subscribeToLanguage(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(languageChangeEvent, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(languageChangeEvent, callback);
  };
}

export function useLanguage() {
  const language = useSyncExternalStore(
    subscribeToLanguage,
    getStoredLanguage,
    () => defaultLanguage
  );

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: LanguageCode) => {
    window.localStorage.setItem(localStorageLanguageKey, lang);
    document.documentElement.lang = lang;
    window.dispatchEvent(new Event(languageChangeEvent));
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
