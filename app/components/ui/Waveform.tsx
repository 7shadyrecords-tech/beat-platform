"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type WaveformProps = {
  active?: boolean;
  bars?: number;
  className?: string;
  height?: number;
};

export function Waveform({
  active = false,
  bars = 32,
  className = "",
  height = 32,
}: WaveformProps) {
  const seeds = useMemo(
    () =>
      Array.from({ length: bars }, (_, i) => ({
        h: 0.25 + Math.sin(i * 0.7) * 0.35 + Math.random() * 0.25,
        delay: i * 0.04,
      })),
    [bars]
  );

  return (
    <div
      className={`flex items-end justify-center gap-[2px] ${className}`}
      style={{ height }}
    >
      {seeds.map((s, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-neon-red via-neon to-neon-bright"
          style={{ height: "100%", originY: 1 }}
          animate={
            active
              ? {
                  scaleY: [s.h * 0.4, s.h, s.h * 0.6, s.h * 0.9, s.h * 0.4],
                }
              : { scaleY: s.h * 0.35 }
          }
          transition={
            active
              ? {
                  duration: 0.6 + (i % 5) * 0.08,
                  repeat: Infinity,
                  delay: s.delay,
                  ease: "easeInOut",
                }
              : { duration: 0.3 }
          }
          initial={{ scaleY: 0.2 }}
        />
      ))}
    </div>
  );
}
