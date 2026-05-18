"use client";

import { motion } from "framer-motion";

const floats = [
  { top: "15%", left: "8%", size: 6, delay: 0 },
  { top: "60%", left: "92%", size: 4, delay: 1 },
  { top: "80%", left: "15%", size: 5, delay: 2 },
  { top: "35%", left: "88%", size: 3, delay: 0.5 },
  { top: "45%", left: "5%", size: 4, delay: 1.5 },
];

export function FloatingElements() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {floats.map((f, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-neon/20 bg-neon/5"
          style={{
            top: f.top,
            left: f.left,
            width: f.size * 4,
            height: f.size * 4,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: f.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="glass absolute right-6 top-28 hidden rounded-2xl px-4 py-3 lg:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <p className="label-mono text-neon">Live</p>
        <p className="mt-1 font-display text-lg font-bold">2.4K</p>
        <p className="text-xs text-muted">listening now</p>
      </motion.div>

      <motion.div
        className="glass absolute bottom-36 left-6 hidden rounded-2xl px-4 py-3 md:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <p className="label-mono text-muted">New drop</p>
        <p className="mt-1 text-sm font-semibold">YOUNG TRIZZY</p>
        <div className="mt-2 h-1 w-20 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-neon to-neon-red"
            animate={{ width: ["0%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}
