"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCheckout } from "../context/CheckoutContext";
import { usePlayer } from "../context/PlayerContext";
import { Waveform } from "./ui/Waveform";

function formatTime(seconds: number) {
  if (!seconds || !isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function PremiumAudioPlayer() {
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
  const { openBuyModal } = useCheckout();

  const progressPercent = duration ? (progress / duration) * 100 : 0;

  return (
    <AnimatePresence>
      {currentBeat && (
        <motion.div
          className="fixed bottom-4 left-2 right-2 z-50 mx-auto max-w-4xl sm:left-4 sm:right-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
        >
          <div className="glass-strong overflow-hidden rounded-xl sm:rounded-2xl neon-glow">
            <div className="h-0.5 w-full bg-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-neon via-neon-bright to-neon-red"
                style={{ width: `${progressPercent}%` }}
                layout
              />
            </div>

            <div className="flex flex-col gap-3 p-3 sm:gap-4 sm:p-4 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
                <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0 overflow-hidden rounded-lg sm:rounded-xl ring-1 ring-neon/30">
                  <Image
                    src={currentBeat.coverImage}
                    alt=""
                    fill
                    className="object-cover"
                    unoptimized={currentBeat.coverImage.endsWith(".svg")}
                  />
                  {isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-neon" />
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={togglePlay}
                  className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-neon to-neon-red text-black transition-transform hover:scale-105 active:scale-95"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 sm:h-5 sm:w-5">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-4 w-4 sm:h-5 sm:w-5">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-xs sm:text-sm font-bold">
                    {currentBeat.title}
                  </p>
                  <p className="truncate text-[10px] sm:text-xs text-muted">
                    {currentBeat.producer} · {currentBeat.bpm} BPM · {currentBeat.key}
                  </p>
                </div>
              </div>

              <div className="hidden flex-1 sm:block">
                <Waveform active={isPlaying} bars={28} height={32} />
              </div>

              <div className="flex items-center gap-2 sm:gap-3 sm:w-48">
                <span className="hidden font-mono text-[9px] sm:text-[10px] text-muted sm:block whitespace-nowrap">
                  {formatTime(progress)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={progress}
                  onChange={(e) => seek(Number(e.target.value))}
                  className="player-range flex-1 h-1"
                  aria-label="Seek"
                />
                <span className="hidden font-mono text-[9px] sm:text-[10px] text-muted sm:block whitespace-nowrap">
                  {formatTime(duration)}
                </span>
              </div>

              <div className="hidden items-center gap-2 sm:flex sm:w-24">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="player-range flex-1 h-1"
                  aria-label="Volume"
                />
              </div>

              <button
                type="button"
                onClick={() => openBuyModal(currentBeat)}
                className="shrink-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-neon to-neon-red px-4 sm:px-5 py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold tracking-widest text-black transition-transform hover:scale-105 active:scale-95 min-h-10 sm:min-h-11"
              >
                BUY
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
