"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/app/hooks/useLanguage";

const nav = [
  { id: "featured", href: "/#featured" },
  { id: "trending", href: "/#trending" },
  { id: "catalog", href: "/#catalog" },
  { id: "analytics", href: "/#analytics" },
  { id: "drums", href: "/drums" },
] as const;

export function PremiumHeader() {
  const { labels, currentLanguage, languageOptions, currencyOptions, currency, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectorOpen, setSelectorOpen] = useState<"currency" | "language" | null>(null);

  const toggleSelector = (type: "currency" | "language") => {
    setSelectorOpen((current) => (current === type ? null : type));
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="border-b border-white/5 bg-[#080404]/95 px-4 py-2 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-2 text-xs text-muted sm:gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleSelector("currency")}
              className="rounded-full border border-neon/15 bg-[#140606] px-4 py-2 text-xs font-semibold text-neon transition hover:border-neon"
            >
              {currency}
            </button>
            {selectorOpen === "currency" && (
              <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-3xl border border-white/10 bg-[#0d0606]/95 p-2 shadow-[0_24px_80px_-32px_rgba(255,77,0,0.75)]">
                {currencyOptions.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    className="block w-full rounded-2xl px-3 py-2 text-left text-sm font-medium text-foreground transition hover:bg-neon/10"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => toggleSelector("language")}
              className="rounded-full border border-neon/15 bg-[#140606] px-4 py-2 text-xs font-semibold text-neon transition hover:border-neon"
            >
              <span className="mr-2">{currentLanguage.flag}</span>
              {currentLanguage.label}
              <span className="ml-2 text-[0.65rem]">▾</span>
            </button>
            {selectorOpen === "language" && (
              <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-3xl border border-white/10 bg-[#0d0606]/95 p-2 shadow-[0_24px_80px_-32px_rgba(255,77,0,0.75)]">
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    onClick={() => {
                      setLanguage(option.code);
                      setSelectorOpen(null);
                    }}
                    className="flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-left text-sm font-medium text-foreground transition hover:bg-neon/10"
                  >
                    <span>{option.flag}</span>
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-500 ${
          scrolled ? "glass-strong shadow-lg shadow-black/20" : "bg-transparent"
        }`}
      >
        <div
          className={`border-b transition-colors duration-500 ${
            scrolled ? "border-neon/15" : "border-transparent"
          }`}
        >
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <a href="/" className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-neon to-neon-red neon-glow">
                <span className="font-display text-xs font-black text-black">ZB</span>
              </div>
              <span className="hidden font-display text-sm font-bold tracking-[0.2em] sm:block">
                ZewOne <span className="neon-text">Beats</span>
              </span>
            </a>

            <nav className="hidden items-center gap-8 md:flex">
              {nav.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted transition-colors hover:text-foreground"
                >
                  {labels.header.nav[link.id]}
                </a>
              ))}
            </nav>

            <button
              type="button"
              className="p-2 md:hidden"
              onClick={() => {
                setOpen(!open);
                setSelectorOpen(null);
              }}
              aria-label="Menu"
            >
              <div className="flex w-6 flex-col gap-1.5">
                <span className={`block h-0.5 bg-neon transition-all ${open ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`block h-0.5 bg-neon transition-all ${open ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 bg-neon transition-all ${open ? "-translate-y-2 -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {open && (
          <nav className="glass border-b border-white/5 px-4 py-4 md:hidden">
            {nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-sm font-medium text-muted"
                onClick={() => setOpen(false)}
              >
                {labels.header.nav[link.id]}
              </a>
            ))}
            <div className="mt-4 space-y-2 border-t border-white/5 pt-4">
              <button
                type="button"
                onClick={() => toggleSelector("currency")}
                className="w-full rounded-full border border-neon/15 bg-[#140606] px-4 py-2 text-left text-sm font-semibold text-neon"
              >
                {currency}
              </button>
              <button
                type="button"
                onClick={() => toggleSelector("language")}
                className="w-full rounded-full border border-neon/15 bg-[#140606] px-4 py-2 text-left text-sm font-semibold text-neon"
              >
                <span className="mr-2">{currentLanguage.flag}</span>
                {currentLanguage.label}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
