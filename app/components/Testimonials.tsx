"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "./ui/SectionReveal";
import { useLanguage } from "@/app/hooks/useLanguage";

const ORANGE = "#e05c20";
const CARD_BG = "#111111";
const CARD_BORDER = "#1e1e1e";

function Stars({ count = 5, size = 14 }: { count?: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width={size} height={size} fill={ORANGE} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const { labels } = useLanguage();
  const t = labels.testimonials;

  return (
    <SectionReveal className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="label-mono text-neon">{t.label}</p>
          <h2 className="heading-luxury mt-2 text-3xl md:text-4xl">
            {t.title} <span className="neon-text">{t.titleHighlight}</span>
          </h2>
        </div>

        {/* Model B — 2 colonnes */}
        <div className="grid gap-4 lg:grid-cols-2">

          {/* ── Colonne gauche : stat centrale ── */}
          <motion.div
            className="flex flex-col items-center justify-center rounded-2xl p-10 text-center"
            style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Note géante */}
            <p
              className="font-display text-8xl font-black leading-none tracking-tight"
              style={{ color: ORANGE }}
            >
              {t.rating}
            </p>

            {/* Étoiles */}
            <div className="mt-4">
              <Stars size={22} />
            </div>

            {/* Label + compteur */}
            <p className="mt-5 text-sm font-medium text-white/60 uppercase tracking-widest">
              {t.ratingLabel}
            </p>
            <p className="mt-1 text-xs text-white/30 tracking-wider">
              {t.reviewCount}
            </p>

            {/* Séparateur décoratif */}
            <div
              className="mt-8 h-px w-16 rounded-full"
              style={{ background: ORANGE, opacity: 0.4 }}
            />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/40 italic">
              &ldquo;{t.items[0]?.quote}&rdquo;
            </p>
          </motion.div>

          {/* ── Colonne droite : 3 avis compacts ── */}
          <div className="flex flex-col gap-4">
            {t.items.map((item, i) => (
              <motion.blockquote
                key={item.name}
                className="flex flex-col gap-3 rounded-2xl p-5"
                style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}` }}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                {/* Étoiles */}
                <Stars size={13} />

                {/* Citation */}
                <p className="text-sm leading-relaxed text-white/80">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Footer : avatar + nom + beat */}
                <footer className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-black"
                      style={{ background: ORANGE }}
                    >
                      {item.avatar}
                    </div>
                    <div>
                      <cite className="not-italic text-xs font-semibold text-white">
                        {item.name}
                      </cite>
                      <p className="text-[10px] text-white/40">{item.role}</p>
                    </div>
                  </div>

                  {/* Beat acheté */}
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      background: `${ORANGE}18`,
                      border: `1px solid ${ORANGE}40`,
                      color: ORANGE,
                    }}
                  >
                    {item.beat}
                  </span>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
