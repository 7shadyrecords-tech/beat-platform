"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { featuredBeats } from "../data/beats";
import { usePlayer } from "../context/PlayerContext";
import { SectionReveal } from "./ui/SectionReveal";
import { BuyNowButton } from "./BuyNowButton";
import { Waveform } from "./ui/Waveform";
import { formatPriceEUR } from "../data/licenses";

export function FeaturedBeats() {
  const { currentBeat, isPlaying, playBeat } = usePlayer();

  return (
    <SectionReveal className="relative py-28" id="featured">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label-mono text-neon">Curated selection</p>
            <h2 className="heading-luxury mt-3 text-4xl md:text-5xl">
              Featured <span className="neon-text">beats</span>
            </h2>
          </div>
          <p className="max-w-sm text-muted">
            Hand-picked exclusives from top producers. Limited licenses available.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredBeats.map((beat, i) => {
            const active = currentBeat?.id === beat.id;
            const playing = active && isPlaying;

            return (
              <motion.article
                key={beat.id}
                className="spotlight-card glass-card group relative overflow-hidden rounded-3xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7 }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty(
                    "--mouse-x",
                    `${e.clientX - rect.left}px`
                  );
                  e.currentTarget.style.setProperty(
                    "--mouse-y",
                    `${e.clientY - rect.top}px`
                  );
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={beat.coverImage}
                    alt={beat.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized={beat.coverImage.endsWith(".svg")}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <span className="absolute left-4 top-4 glass rounded-full px-3 py-1 label-mono text-neon">
                    {beat.tag}
                  </span>
                  {i === 0 && (
                    <span className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-neon to-neon-red px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
                      #1 Pick
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-bold tracking-tight">
                        {beat.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted">{beat.producer}</p>
                    </div>
                    <span className="font-display text-lg font-bold neon-text">
                      from {formatPriceEUR(29)}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-neon/30 bg-neon/10 px-2.5 py-0.5 text-[10px] font-medium text-neon">
                      {beat.bpm} BPM
                    </span>
                    <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] text-muted">
                      {beat.key}
                    </span>
                    {beat.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5">
                    <Waveform active={playing} bars={24} height={28} />
                  </div>

                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={() => playBeat(beat)}
                      className="glass flex-1 rounded-xl py-3 text-xs font-bold tracking-widest transition-all hover:border-neon/40 hover:text-neon"
                    >
                      {playing ? "PAUSE" : "PREVIEW"}
                    </button>
                    <BuyNowButton
                      beat={beat}
                      showFromPrice={false}
                      className="flex-1 rounded-xl bg-gradient-to-r from-neon to-neon-red py-3 text-center text-xs font-bold tracking-widest text-black transition-transform hover:scale-[1.02]"
                    />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
}
