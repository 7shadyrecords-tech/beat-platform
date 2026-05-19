"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { featuredBeats } from "../data/beats";
import { usePlayer } from "../context/PlayerContext";
import { SectionReveal } from "./ui/SectionReveal";
import { BuyNowButton } from "./BuyNowButton";

const ORANGE = "#e05c20";
const CARD_BG = "#111111";
const CARD_BORDER = "#1e1e1e";

export function FeaturedBeats() {
  const { currentBeat, isPlaying, playBeat } = usePlayer();

  const [hero, ...rest] = featuredBeats;
  const heroPlaying = currentBeat?.id === hero?.id && isPlaying;

  return (
    <SectionReveal className="relative py-24" id="featured">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label-mono" style={{ color: ORANGE }}>
              Curated selection
            </p>
            <h2 className="heading-luxury mt-2 text-3xl md:text-4xl">
              Featured <span className="neon-text">beats</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted">
            Hand-picked exclusives. Limited licenses available.
          </p>
        </div>

        {/* Model C grid */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* ── Large card (hero beat) ── */}
          {hero && (
            <motion.article
              className="flex flex-col overflow-hidden rounded-2xl"
              style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Cover image */}
              <div className="relative h-52 w-full shrink-0 overflow-hidden">
                <Image
                  src={hero.coverImage}
                  alt={hero.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  unoptimized={hero.coverImage.endsWith(".svg")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {/* #1 Pick badge */}
                <span
                  className="absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white"
                  style={{ background: ORANGE }}
                >
                  #1 Pick
                </span>
                {/* Tag badge */}
                <span className="glass absolute right-3 top-3 rounded-full px-3 py-1 label-mono text-neon">
                  {hero.tag}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-4 p-5">
                {/* Title + meta */}
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-white">
                    {hero.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{hero.producer}</p>
                  <p className="mt-2 text-xs text-white/50">
                    {hero.bpm} BPM · {hero.key} · {hero.genre}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {hero.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Price + buttons */}
                <div className="mt-auto flex items-center justify-between gap-3">
                  <span
                    className="font-display text-xl font-bold"
                    style={{ color: ORANGE }}
                  >
                    from €{hero.price}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => playBeat(hero)}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold tracking-widest text-white transition-colors hover:border-white/30"
                    >
                      {heroPlaying ? "PAUSE" : "PREVIEW"}
                    </button>
                    <BuyNowButton
                      beat={hero}
                      showFromPrice={false}
                      className="rounded-xl px-5 py-2.5 text-xs font-bold tracking-widest text-white transition-transform hover:scale-[1.02] hover:opacity-90"
                      style={{ background: ORANGE } as React.CSSProperties}
                    />
                  </div>
                </div>
              </div>
            </motion.article>
          )}

          {/* ── Small cards stack ── */}
          <div className="flex flex-col gap-4">
            {rest.map((beat, i) => {
              const playing = currentBeat?.id === beat.id && isPlaying;
              return (
                <motion.article
                  key={beat.id}
                  className="flex items-center gap-4 overflow-hidden rounded-2xl p-4"
                  style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                >
                  {/* Thumbnail 44×44 */}
                  <button
                    type="button"
                    onClick={() => playBeat(beat)}
                    className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg"
                    aria-label={playing ? "Pause" : "Play preview"}
                  >
                    <Image
                      src={beat.coverImage}
                      alt={beat.title}
                      fill
                      className="object-cover"
                      unoptimized={beat.coverImage.endsWith(".svg")}
                    />
                    {playing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: ORANGE }} />
                      </div>
                    )}
                  </button>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-bold text-white">
                      {beat.title}
                    </p>
                    <p className="text-xs text-white/40">
                      {beat.bpm} BPM · {beat.key}
                    </p>
                  </div>

                  {/* Price + buy */}
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <span
                      className="font-display text-sm font-bold"
                      style={{ color: ORANGE }}
                    >
                      from €{beat.price}
                    </span>
                    <BuyNowButton
                      beat={beat}
                      showFromPrice={false}
                      className="rounded-lg px-3 py-1.5 text-[10px] font-bold tracking-widest text-white transition-opacity hover:opacity-80"
                      style={{ background: ORANGE } as React.CSSProperties}
                    />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
