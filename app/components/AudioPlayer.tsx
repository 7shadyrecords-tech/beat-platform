"use client";

import Image from "next/image";
import { usePlayer } from "../context/PlayerContext";

function formatTime(seconds: number) {
  if (!seconds || !isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function AudioPlayer() {
  const {
    currentBeat,
    isPlaying,
    progress,
    duration,
    volume,
    togglePlay,
    seek,
    setVolume,
  } = usePlayer();

  if (!currentBeat) return null;

  const progressPercent = duration ? (progress / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-neon/30 bg-surface/95 backdrop-blur-xl neon-glow">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-6 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-neon/40">
            <Image
              src={currentBeat.coverImage}
              alt=""
              fill
              className="object-cover"
              unoptimized={currentBeat.coverImage.endsWith(".svg")}
            />
          </div>

          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-neon bg-neon/10 transition-colors hover:bg-neon/20"
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-neon">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-4 w-4 text-neon">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-sm font-bold tracking-wide text-foreground">
              {currentBeat.title}
            </p>
            <p className="truncate font-mono text-[10px] uppercase tracking-widest text-muted">
              {currentBeat.producer} · {currentBeat.bpm} BPM · {currentBeat.key}
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center gap-2 sm:max-w-md">
          <span className="hidden font-mono text-[10px] text-muted sm:block">
            {formatTime(progress)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
            className="player-range flex-1"
            style={{
              background: `linear-gradient(to right, var(--neon) ${progressPercent}%, var(--border) ${progressPercent}%)`,
            }}
            aria-label="Seek"
          />
          <span className="hidden font-mono text-[10px] text-muted sm:block">
            {formatTime(duration)}
          </span>
        </div>

        <div className="hidden items-center gap-2 sm:flex sm:w-28">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0 text-muted">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
          </svg>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="player-range flex-1"
            aria-label="Volume"
          />
        </div>

        <a
          href={`#buy-${currentBeat.id}`}
          className="shrink-0 border border-neon bg-neon px-4 py-2 font-display text-[10px] font-bold tracking-widest text-black transition-colors hover:bg-neon-bright sm:text-xs"
        >
          BUY ${currentBeat.price}
        </a>
      </div>
    </div>
  );
}
