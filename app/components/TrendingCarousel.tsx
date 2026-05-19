"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { trendingBeats } from "../data/beats";
import { usePlayer } from "../context/PlayerContext";
import { useLanguage } from "@/app/hooks/useLanguage";
import { SectionReveal } from "./ui/SectionReveal";

function formatPlays(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export function TrendingCarousel() {
  const { playBeat, currentBeat, isPlaying } = usePlayer();
  const { labels } = useLanguage();
  const tr = labels.trending;
  const doubled = [...trendingBeats, ...trendingBeats];

  return (
    <SectionReveal className="relative overflow-hidden py-20" id="trending">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <motion.div>
            <p className="label-mono text-neon-red">{tr.label}</p>
            <h2 className="heading-luxury mt-2 text-3xl md:text-4xl">
              {tr.title} <span className="neon-text">{tr.titleHighlight}</span>
            </h2>
          </motion.div>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
        <motion.div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="flex animate-scroll gap-5">
          {doubled.map((beat, i) => {
            const active = currentBeat?.id === beat.id && isPlaying;
            return (
              <button
                key={`${beat.id}-${i}`}
                type="button"
                onClick={() => playBeat(beat)}
                className="glass-card group flex w-[280px] shrink-0 items-center gap-4 rounded-2xl p-4 text-left transition-all hover:neon-glow"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={beat.coverImage}
                    alt=""
                    fill
                    className="object-cover"
                    unoptimized={beat.coverImage.endsWith(".svg")}
                  />
                  {active && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-neon" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-bold">
                    {beat.title}
                  </p>
                  <p className="text-xs text-muted">
                    {beat.bpm} BPM · {beat.key}
                  </p>
                  <p className="mt-1 text-[10px] text-neon">
                    {formatPlays(beat.plays ?? 0)} plays
                  </p>
                </div>
                <span className="font-display text-lg font-bold text-neon">
                  #{beat.trending}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
}
