"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Beat } from "../data/beats";

const PREVIEW_LIMIT = 30; // seconds
const DEFAULT_VOLUME = 0.8;

type PlayerContextValue = {
  currentBeat: Beat | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  previewEnded: boolean;
  playBeat: (beat: Beat) => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (vol: number) => void;
  dismissPreviewEnded: () => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentBeat, setCurrentBeat] = useState<Beat | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);
  const [previewEnded, setPreviewEnded] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audio.volume = DEFAULT_VOLUME;
    // Disable native download
    audio.setAttribute("controlsList", "nodownload");
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setProgress(audio.currentTime);
      // Enforce 30s preview limit
      if (audio.currentTime >= PREVIEW_LIMIT) {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
        setProgress(0);
        setPreviewEnded(true);
      }
    };

    const onLoadedMetadata = () => {
      // Cap reported duration to PREVIEW_LIMIT so the UI never shows more
      setDuration(Math.min(audio.duration || 0, PREVIEW_LIMIT));
    };

    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setPreviewEnded(true);
    };

    // Block right-click context menu on the hidden audio element
    const onContextMenu = (e: Event) => e.preventDefault();

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("contextmenu", onContextMenu);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("contextmenu", onContextMenu);
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const playBeat = useCallback(
    (beat: Beat) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (currentBeat?.id === beat.id) {
        if (audio.paused) {
          setPreviewEnded(false);
          audio.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
          audio.pause();
          setIsPlaying(false);
        }
        return;
      }

      setPreviewEnded(false);
      audio.src = beat.previewUrl;
      audio.load();
      audio
        .play()
        .then(() => {
          setCurrentBeat(beat);
          setIsPlaying(true);
          setProgress(0);
        })
        .catch(() => {
          setCurrentBeat(beat);
          setIsPlaying(false);
        });
    },
    [currentBeat?.id]
  );

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentBeat) return;
    if (audio.paused) {
      setPreviewEnded(false);
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [currentBeat]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    // Prevent seeking past the preview limit
    const clamped = Math.min(time, PREVIEW_LIMIT - 0.1);
    audio.currentTime = clamped;
    setProgress(clamped);
  }, []);

  const setVolume = useCallback((vol: number) => {
    setVolumeState(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  }, []);

  const dismissPreviewEnded = useCallback(() => setPreviewEnded(false), []);

  return (
    <PlayerContext.Provider
      value={{
        currentBeat,
        isPlaying,
        progress,
        duration,
        volume,
        previewEnded,
        playBeat,
        togglePlay,
        seek,
        setVolume,
        dismissPreviewEnded,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
