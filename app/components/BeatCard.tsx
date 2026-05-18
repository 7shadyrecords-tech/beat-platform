"use client";

import Image from "next/image";
import type { Beat } from "../data/beats";
import { usePlayer } from "../context/PlayerContext";
import { useLanguage } from "@/app/hooks/useLanguage";

type BeatCardProps = {
  beat: Beat;
};

export function BeatCard({ beat }: BeatCardProps) {
  const { currentBeat, isPlaying, playBeat } = usePlayer();
  const { labels } = useLanguage();
  const isActive = currentBeat?.id === beat.id;
  const playing = isActive && isPlaying;

  return (
    <article className="group relative flex flex-col overflow-hidden border border-border bg-surface transition-all duration-300 hover:border-neon/60 hover:neon-glow">
      <div className="relative aspect-square overflow-hidden bg-black">
        <Image
          src={beat.coverImage}
          alt={`${beat.title} cover art`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized={beat.coverImage.endsWith(".svg")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,92,0,0.2),transparent_55%)]" />

        <span className="absolute left-3 top-3 border border-neon/60 bg-black/70 px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest text-neon backdrop-blur-sm">
          {beat.tag}
        </span>

        <button
          type="button"
          onClick={() => playBeat(beat)}
          aria-label={playing ? `${labels.beatCard.pause} ${beat.title}` : `${labels.beatCard.preview} ${beat.title}`}
          className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/50"
        >
          <span
            className={`flex h-14 w-14 items-center justify-center border-2 border-neon bg-neon/20 backdrop-blur-sm transition-all group-hover:scale-110 group-hover:bg-neon/30 ${playing ? "animate-pulse-neon bg-neon/40" : "opacity-0 group-hover:opacity-100"} ${isActive ? "opacity-100" : ""}`}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </span>
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="font-display text-lg font-bold tracking-wide text-foreground drop-shadow-lg">
                {beat.title}
              </h3>
              <p className="font-mono text-xs text-foreground/70">{beat.producer}</p>
            </div>
            <span className="font-display text-xl font-bold text-neon drop-shadow-[0_0_8px_rgba(255,92,0,0.6)]">
              ${beat.price}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-wrap gap-2">
          <Tag label={`${beat.bpm} BPM`} highlight />
          <Tag label={beat.key} highlight />
          {beat.tags.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>

        <div className="mt-auto flex gap-2">
          <button
            type="button"
            onClick={() => playBeat(beat)}
            className="flex flex-1 items-center justify-center gap-2 border border-border py-2.5 font-display text-xs font-bold tracking-widest text-foreground transition-colors hover:border-neon hover:text-neon"
          >
            {playing ? labels.beatCard.pause : labels.beatCard.preview}
          </button>
          <a
            href={`#buy-${beat.id}`}
            className="flex flex-1 items-center justify-center bg-neon py-2.5 font-display text-xs font-bold tracking-widest text-black transition-all hover:bg-neon-bright neon-glow"
          >
            {labels.beatCard.buy}
          </a>
        </div>
      </div>

      {isActive && (
        <div className="absolute left-0 top-0 h-full w-0.5 bg-neon neon-glow" />
      )}
    </article>
  );
}

function Tag({ label, highlight }: { label: string; highlight?: boolean }) {
  return (
    <span
      className={`border px-2 py-1 font-mono text-[10px] uppercase tracking-wider ${
        highlight
          ? "border-neon/50 bg-neon/10 text-neon"
          : "border-border bg-surface-elevated text-muted"
      }`}
    >
      {label}
    </span>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-5 w-5 text-neon">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-neon">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}
