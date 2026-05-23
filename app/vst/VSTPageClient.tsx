"use client";

import { motion } from "framer-motion";
import { PremiumHeader } from "../components/PremiumHeader";
import { PremiumFooter } from "../components/PremiumFooter";
import { CheckoutProvider } from "../context/CheckoutContext";
import { PlayerProvider } from "../context/PlayerContext";

const ORANGE = "#e05c20";

const PLACEHOLDER_PLUGINS = [
  { title: "TRAFIK Synth", tags: ["Synthé", "Trap", "Wavetable"], type: "VST3 / AU" },
];

export function VSTPageClient() {
  return (
    <PlayerProvider>
      <CheckoutProvider>
        <div className="min-h-screen bg-background text-foreground">
          <PremiumHeader />

          <main className="pt-32 pb-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

              {/* Hero */}
              <motion.div
                className="mb-20 text-center"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <p className="label-mono text-xs tracking-widest" style={{ color: ORANGE }}>
                  PLUGINS VST / AU
                </p>

                <h1 className="heading-luxury mt-4 text-4xl font-bold md:text-6xl">
                  Des outils qui{" "}
                  <span className="neon-text">définissent le son</span>
                </h1>

                <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted">
                  Synthés, effets et samplers conçus pour la production trap & cinématique.
                  Compatible macOS et Windows — VST3, AU.
                </p>

                {/* Coming soon badge */}
                <div className="mt-10 flex justify-center">
                  <motion.div
                    className="relative overflow-hidden rounded-2xl border px-8 py-5"
                    style={{
                      borderColor: `${ORANGE}50`,
                      background: `${ORANGE}0d`,
                    }}
                    animate={{
                      boxShadow: [
                        `0 0 20px ${ORANGE}20`,
                        `0 0 40px ${ORANGE}40`,
                        `0 0 20px ${ORANGE}20`,
                      ],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <p className="font-display text-lg font-bold tracking-widest" style={{ color: ORANGE }}>
                      BIENTÔT DISPONIBLE
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      Les plugins arrivent prochainement — reste connecté.
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Placeholder plugin grid */}
              <div className="flex justify-center">
                {PLACEHOLDER_PLUGINS.map((plugin, i) => (
                  <motion.article
                    key={plugin.title}
                    className="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-colors hover:border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.5 }}
                  >
                    {/* Blur overlay — locked */}
                    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-2xl bg-black/70 backdrop-blur-[2px]">
                      <span className="text-xl">🔒</span>
                      <span className="label-mono text-[10px] tracking-widest" style={{ color: ORANGE }}>
                        BIENTÔT
                      </span>
                    </div>

                    {/* Card content (blurred behind overlay) */}
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                        style={{ background: `${ORANGE}15`, border: `1px solid ${ORANGE}30` }}
                      >
                        <span className="text-xl">🎛️</span>
                      </div>
                      <span className="font-mono text-xs text-muted">{plugin.type}</span>
                    </div>

                    <h3 className="mt-3 font-display text-sm font-bold">{plugin.title}</h3>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {plugin.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      disabled
                      className="mt-4 w-full rounded-xl py-2.5 text-[10px] font-bold tracking-widest text-white/20 border border-white/5 cursor-not-allowed"
                    >
                      TÉLÉCHARGER
                    </button>
                  </motion.article>
                ))}
              </div>

              {/* Notify CTA */}
              <motion.div
                className="mx-auto mt-20 max-w-lg text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <p className="text-sm text-muted">
                  Des questions ?{" "}
                  <a
                    href="mailto:Zewone.music@gmail.com"
                    className="font-medium underline underline-offset-2 transition-colors hover:text-foreground"
                    style={{ color: ORANGE }}
                  >
                    Zewone.music@gmail.com
                  </a>
                </p>
              </motion.div>

            </div>
          </main>

          <PremiumFooter />
        </div>
      </CheckoutProvider>
    </PlayerProvider>
  );
}
