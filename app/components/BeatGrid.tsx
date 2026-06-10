"use client";

import { beats } from "../data/beats";
import { PremiumBeatCard } from "./PremiumBeatCard";
import { SectionReveal } from "./ui/SectionReveal";
import { useLanguage } from "@/app/hooks/useLanguage";

export function BeatGrid() {
  const { labels } = useLanguage();
  const c = labels.catalog;

  return (
    <SectionReveal className="relative scroll-mt-32 py-28" id="catalog">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label-mono text-neon">{c.label}</p>
            <h2 className="heading-luxury mt-3 text-4xl md:text-5xl">
              {c.title} <span className="neon-text">{c.titleHighlight}</span>
            </h2>
          </div>
          <p className="max-w-sm text-muted">{c.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {beats.map((beat, i) => (
            <PremiumBeatCard key={beat.id} beat={beat} index={i} />
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
