"use client";

import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { SectionReveal } from "./ui/SectionReveal";

const ACCENT = "#e05c20";

const collabs = [
  { key: "booba", name: "Booba", tracks: ["Walabok"] },
  {
    key: "13block",
    name: "13 Block",
    tracks: ["Vrai Negro", "L.K.T.E.B", "Hors la loi", "Vers l'enfer"],
  },
  { key: "hds", name: "HDS", tracks: ["Dans la rue"] },
  { key: "douma-kalash", name: "Douma Kalash", tracks: ["IGO #5"] },
  { key: "ndx", name: "NDX", tracks: ["Denie Fwa"] },
  { key: "oldpee", name: "Oldpee", tracks: ["Dur"] },
  { key: "xelo", name: "XELO", tracks: ["Go Hard", "YIZIMI 2.0"] },
  { key: "meiji-sai", name: "MEIJI SAI", tracks: ["Vol à l'étalage"] },
];

export function CollaborationsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

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
    <SectionReveal className="py-20" id="collabs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="label-mono" style={{ color: ACCENT }}>
              Featured on
            </p>
            <h2 className="heading-luxury mt-2 text-3xl md:text-4xl">
              Collabo<span className="neon-text">rations</span>
            </h2>
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
            {collabs.map((artist, i) => (
              <motion.div
                key={artist.key}
                className="glass-card flex w-[200px] shrink-0 flex-col items-center rounded-2xl px-4 py-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
              >
                {/* Photo */}
                <div className="relative mb-4 h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-white/10">
                  <Image
                    src={`/collabs/${artist.key}.jpg`}
                    alt={artist.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Name */}
                <p className="font-display text-sm font-bold leading-tight text-white">
                  {artist.name}
                </p>

                {/* Track counter */}
                <p
                  className="mt-1 font-display text-xs font-bold tracking-widest uppercase"
                  style={{ color: ACCENT }}
                >
                  {artist.tracks.length}{" "}
                  {artist.tracks.length > 1 ? "morceaux" : "morceau"}
                </p>

                {/* Track list */}
                <ul className="mt-3 w-full space-y-1">
                  {artist.tracks.map((t) => (
                    <li
                      key={t}
                      className="truncate text-[11px] text-white/40"
                      title={t}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
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
