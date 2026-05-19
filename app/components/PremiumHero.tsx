"use client";

import { motion } from "framer-motion";
import { Waveform } from "./ui/Waveform";
import { useLanguage } from "@/app/hooks/useLanguage";
import { beats } from "@/app/data/beats";

const featuredBeat = beats.reduce((a, b) => ((b.plays ?? 0) > (a.plays ?? 0) ? b : a), beats[0]);

export function PremiumHero() {
  const { labels } = useLanguage();
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="label-mono text-neon">{labels.hero.tagline}</p>
        </motion.div>

        <motion.h1
          className="heading-luxury mt-6 max-w-5xl text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block text-foreground/90">{labels.hero.titleLine1}</span>
          <span className="block shimmer-text">{labels.hero.titleLine2}</span>
          <span className="block text-foreground/70">{labels.hero.titleLine3}</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed text-muted"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {labels.hero.description}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#featured"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-neon via-neon-bright to-neon-red px-6 sm:px-10 py-3 sm:py-4 text-center font-display text-xs sm:text-sm font-bold tracking-widest text-black neon-glow-strong transition-transform hover:scale-[1.02]"
          >
            <span className="relative z-10">{labels.hero.exploreCollection}</span>
            <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
          <a
            href="#catalog"
            className="glass rounded-full px-6 sm:px-10 py-3 sm:py-4 text-center font-display text-xs sm:text-sm font-bold tracking-widest text-foreground transition-all hover:border-neon/40 hover:text-neon"
          >
            {labels.hero.viewCatalog}
          </a>
        </motion.div>

        <motion.div
          className="mt-12 sm:mt-16 glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col gap-4 md:gap-6 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <p className="label-mono text-xs sm:text-sm text-muted">{labels.hero.playingNow}</p>
              <p className="mt-2 font-display text-lg sm:text-2xl font-bold truncate">{featuredBeat.title}</p>
              <p className="text-xs sm:text-sm text-muted truncate">{featuredBeat.producer} · {featuredBeat.bpm} BPM · {featuredBeat.key}</p>
            </div>
            <Waveform active height={48} bars={40} className="md:max-w-md md:flex-1 min-w-0" />
          </div>
        </motion.div>

        <motion.div
          className="mt-10 sm:mt-14 md:mt-16 grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 border-t border-white/5 pt-8 sm:pt-10 md:pt-12 sm:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          {labels.hero.stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-lg sm:text-2xl md:text-3xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="label-mono mt-1 text-xs sm:text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div className="h-12 w-px bg-gradient-to-b from-neon/60 to-transparent" />
      </motion.div>
    </section>
  );
}
