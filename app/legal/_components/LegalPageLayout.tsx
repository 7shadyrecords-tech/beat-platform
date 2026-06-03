"use client";

import Link from "next/link";
import { useLanguage } from "@/app/hooks/useLanguage";
import type { LegalPageKey } from "@/app/lib/i18n";

const ORANGE = "#e05c20";

type LegalPageLayoutProps = {
  pageKey: LegalPageKey;
};

export function LegalPageLayout({ pageKey }: LegalPageLayoutProps) {
  const { labels } = useLanguage();
  const legal = labels.legalPages;
  const page = legal.pages[pageKey];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-xs tracking-widest text-white/40 transition-colors hover:text-white/70"
        >
          {legal.back}
        </Link>

        <header className="mb-12">
          <p className="font-mono text-xs uppercase tracking-widest" style={{ color: ORANGE }}>
            {legal.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {page.title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/50">{page.description}</p>
          <p className="mt-2 text-sm text-white/40">
            {legal.updatedAtLabel} : {page.updatedAt}
          </p>
        </header>

        <div className="space-y-10 text-sm leading-relaxed text-white/70">
          {page.sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-3 font-display text-base font-bold text-white">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-bold tracking-widest text-black transition-transform hover:scale-[1.02]"
            style={{ background: ORANGE }}
          >
            {legal.backToCatalog}
          </Link>
        </div>
      </div>
    </div>
  );
}
