"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Beat } from "../data/beats";
import { usePlayer } from "../context/PlayerContext";
import { BuyNowButton } from "./BuyNowButton";
import { Waveform } from "./ui/Waveform";
import { formatPriceEUR } from "../data/licenses";

type PremiumBeatCardProps = {
  beat: Beat;
  index?: number;
};

export function PremiumBeatCard({ beat, index = 0 }: PremiumBeatCardProps) {
  const { currentBeat, isPlaying, playBeat } = usePlayer();
  const isActive = currentBeat?.id === beat.id;
  const playing = isActive && isPlaying;

  return (
    <motion.article
      className="spotlight-card glass-card group relative flex flex-col overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      whileHover={{ y: -6 }}
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
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={beat.coverImage}
          alt={`${beat.title} cover`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          unoptimized={beat.coverImage.endsWith(".svg")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,30%),rgba(255,77,0,0.15),transparent_50%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <span className="absolute left-3 top-3 glass rounded-full px-2.5 py-1 label-mono text-neon">
          {beat.tag}
        </span>

        <button
          type="button"
          onClick={() => playBeat(beat)}
          className="absolute inset-0 flex items-center justify-center"
          aria-label={playing ? "Pause" : "Play preview"}
        >
          <motion.span
            className="flex h-16 w-16 items-center justify-center rounded-full border border-neon/50 bg-black/40 backdrop-blur-md"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            animate={
              playing
                ? {
                    boxShadow: [
                      "0 0 20px rgba(255,77,0,0.4)",
                      "0 0 40px rgba(255,77,0,0.6)",
                      "0 0 20px rgba(255,77,0,0.4)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </motion.span>
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="font-display text-lg font-bold">{beat.title}</h3>
              <p className="text-xs text-muted">{beat.producer}</p>
            </div>
            <span className="font-display text-sm font-bold neon-text">
              from {formatPriceEUR(29)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap gap-1.5">
          <Tag label={`${beat.bpm} BPM`} highlight />
          <Tag label={beat.key} highlight />
          {beat.tags.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>

        <Waveform active={playing} bars={20} height={24} />

        <div className="mt-auto flex gap-2">
          <button
            type="button"
            onClick={() => playBeat(beat)}
            className="glass flex-1 rounded-xl py-2.5 text-[10px] font-bold tracking-widest transition-colors hover:text-neon"
          >
            {playing ? "PAUSE" : "PREVIEW"}
          </button>
          <BuyNowButton beat={beat} showFromPrice={false} />
        </div>
      </div>

      {isActive && (
        <motion.div
          layoutId="active-indicator"
          className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-neon via-neon-bright to-neon-red"
        />
      )}
    </motion.article>
  );
}

function Tag({ label, highlight }: { label: string; highlight?: boolean }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${
        highlight
          ? "border border-neon/40 bg-neon/10 text-neon"
          : "border border-white/10 text-muted"
      }`}
    >
      {label}
    </span>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-6 w-6 text-neon">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-neon">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}
