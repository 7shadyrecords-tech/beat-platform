"use client";

import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { SectionReveal } from "./ui/SectionReveal";
import { useLanguage } from "@/app/hooks/useLanguage";
import { placements } from "@/app/data/placements";

const ACCENT = "#e05c20";

export function CollaborationsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const { labels } = useLanguage();
  const cl = labels.collabs;

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
    setTimeout(updateArrows, 350);
  };

  return (
    <SectionReveal className="scroll-mt-32 py-20" id="collabs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="label-mono" style={{ color: ACCENT }}>
              {cl.label}
            </p>
            <h2 className="heading-luxury mt-2 text-3xl md:text-4xl">
              {cl.title}
              <span className="neon-text">{cl.titleHighlight}</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              {cl.description}
            </p>
          </div>

          {/* Arrow controls */}
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scroll("left")}
              disabled={!canLeft}
              aria-label="Précédent"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-white/30 hover:bg-white/10 disabled:opacity-30"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canRight}
              aria-label="Suivant"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-white/30 hover:bg-white/10 disabled:opacity-30"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div className="relative">
          {/* Left fade */}
          {canLeft && (
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-background to-transparent" />
          )}
          {/* Right fade */}
          {canRight && (
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-background to-transparent" />
          )}

          <div
            ref={trackRef}
            onScroll={updateArrows}
            className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {placements.map((placement, i) => {
              const listenUrl = placement.spotifyUrl ?? placement.youtubeUrl;

              return (
                <motion.article
                  key={placement.id}
                  className="glass-card w-[240px] shrink-0 overflow-hidden rounded-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={placement.image}
                      alt={`${placement.title} — ${placement.artist}`}
                      fill
                      sizes="240px"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <span
                      className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest"
                      style={{ color: ACCENT }}
                    >
                      {cl.itemLabel}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="font-display text-base font-bold text-white">
                      {placement.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-widest text-white/45">
                      {placement.artist}
                    </p>

                    {listenUrl ? (
                      <a
                        href={listenUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex min-h-10 items-center rounded-lg border border-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:border-neon/50 hover:text-neon"
                      >
                        {cl.listen}
                      </a>
                    ) : null}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Mobile arrows */}
        <div className="mt-6 flex justify-center gap-3 sm:hidden">
          <button
            onClick={() => scroll("left")}
            disabled={!canLeft}
            aria-label="Précédent"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white disabled:opacity-30"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canRight}
            aria-label="Suivant"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white disabled:opacity-30"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </SectionReveal>
  );
}
