"use client";

import { useState } from "react";

const navLinks = [
  { label: "Beats", href: "#beats" },
  { label: "About", href: "#about" },
  { label: "Licenses", href: "#licenses" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="group flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center border border-neon bg-neon/10 font-display text-xs font-bold text-neon neon-glow">
            BP
          </span>
          <span className="font-display text-sm font-bold tracking-[0.25em] text-foreground sm:text-base">
            BEAT<span className="neon-text">PLATFORM</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm font-semibold uppercase tracking-widest text-muted transition-colors hover:text-neon"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#beats"
            className="border border-neon bg-neon/10 px-5 py-2 font-display text-xs font-bold tracking-widest text-neon transition-all hover:bg-neon hover:text-black neon-glow"
          >
            SHOP NOW
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          className="flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span
            className={`block h-0.5 w-6 bg-neon transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-neon transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-neon transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-border bg-surface px-4 py-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-3 font-body text-sm font-semibold uppercase tracking-widest text-muted transition-colors hover:text-neon"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#beats"
            className="mt-2 block border border-neon bg-neon/10 px-5 py-3 text-center font-display text-xs font-bold tracking-widest text-neon"
            onClick={() => setMenuOpen(false)}
          >
            SHOP NOW
          </a>
        </nav>
      )}
    </header>
  );
}
