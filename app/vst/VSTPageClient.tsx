"use client";

import Image from "next/image";
import { type FormEvent, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PremiumHeader } from "../components/PremiumHeader";
import { PremiumFooter } from "../components/PremiumFooter";
import { CheckoutProvider } from "../context/CheckoutContext";
import { PlayerProvider } from "../context/PlayerContext";
import { useLanguage } from "../hooks/useLanguage";
import { contactEmail, contactMailto } from "@/app/lib/contact";

const ORANGE = "#e05c20";

const PLACEHOLDER_PLUGINS = [
  { title: "TRAFIK Synth", tags: ["Synthé", "Trap", "Wavetable"], type: "VST3 / AU" },
];

type FormStatus = "idle" | "loading" | "success" | "error";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function VSTPageClient() {
  const { labels } = useLanguage();
  const vst = labels.vstPage;
  const [email, setEmail] = useState("");
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formMessage, setFormMessage] = useState("");
  const waitlistRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const focusWaitlist = () => {
    waitlistRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => emailInputRef.current?.focus(), 350);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setFormStatus("error");
      setFormMessage(vst.errorRequired);
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setFormStatus("error");
      setFormMessage(vst.errorInvalid);
      return;
    }

    setFormStatus("loading");
    setFormMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, source: "vst-trafik-synth" }),
      });

      if (!response.ok) {
        throw new Error("Waitlist request failed");
      }

      setEmail("");
      setFormStatus("success");
      setFormMessage(vst.success);
    } catch {
      setFormStatus("error");
      setFormMessage(vst.errorGeneric);
    }
  };

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
                  {vst.eyebrow}
                </p>

                <h1 className="heading-luxury mt-4 text-4xl font-bold md:text-6xl">
                  {vst.titlePrefix}{" "}
                  <span className="neon-text">{vst.titleHighlight}</span>
                </h1>

                <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted">
                  {vst.description}
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
                      {vst.comingSoon}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {vst.comingSoonDescription}
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Product preview */}
              <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
                {PLACEHOLDER_PLUGINS.map((plugin, i) => (
                  <motion.article
                    key={plugin.title}
                    className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-colors hover:border-white/10 sm:p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.5 }}
                  >
                    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40">
                      <Image
                        src="/plugins/trafik-synth-placeholder.svg"
                        width={960}
                        height={540}
                        alt={vst.visualAlt}
                        className="h-auto w-full"
                        priority
                      />
                      <div className="absolute inset-x-4 bottom-4 rounded-lg border border-white/10 bg-black/65 px-4 py-3 backdrop-blur">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-neon">
                          {vst.visualLabel}
                        </p>
                        <p className="mt-1 text-xs text-white/60">{vst.visualPlaceholder}</p>
                      </div>
                    </div>

                    <div className="mt-5 flex items-start justify-between gap-3">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                        style={{ background: `${ORANGE}15`, border: `1px solid ${ORANGE}30` }}
                      >
                        <span className="text-xl">🎛️</span>
                      </div>
                      <div className="text-right">
                        <span className="block font-mono text-xs text-muted">{vst.productType}</span>
                        <span className="label-mono mt-1 block text-[10px] tracking-widest" style={{ color: ORANGE }}>
                          {vst.productStatus}
                        </span>
                      </div>
                    </div>

                    <h3 className="mt-4 font-display text-xl font-bold">{vst.productTitle}</h3>

                    <div className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                      {vst.productDescription.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>

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
                      onClick={focusWaitlist}
                      className="mt-5 w-full rounded-xl border border-neon/30 px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-neon transition hover:border-neon hover:bg-neon/10 focus:outline-none focus:ring-2 focus:ring-neon/60"
                    >
                      {vst.notifyCta}
                    </button>
                  </motion.article>
                ))}

                <motion.div
                  ref={waitlistRef}
                  className="rounded-2xl border border-neon/15 bg-neon/[0.04] p-5 sm:p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <p className="label-mono text-xs tracking-widest" style={{ color: ORANGE }}>
                    {vst.waitlistEyebrow}
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-bold">{vst.waitlistTitle}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {vst.waitlistDescription}
                  </p>

                  <form className="mt-6 space-y-3" onSubmit={handleSubmit} noValidate>
                    <div>
                      <label htmlFor="vst-waitlist-email" className="sr-only">
                        {vst.emailLabel}
                      </label>
                      <input
                        ref={emailInputRef}
                        id="vst-waitlist-email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          if (formStatus !== "loading") {
                            setFormStatus("idle");
                            setFormMessage("");
                          }
                        }}
                        aria-describedby="vst-waitlist-help vst-waitlist-status"
                        aria-invalid={formStatus === "error"}
                        placeholder={vst.emailPlaceholder}
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/60 focus:border-neon focus:ring-2 focus:ring-neon/30"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formStatus === "loading"}
                      className="w-full rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-widest text-black transition hover:scale-[1.01] disabled:cursor-wait disabled:opacity-70"
                      style={{ background: ORANGE }}
                    >
                      {formStatus === "loading" ? vst.submitting : vst.submit}
                    </button>
                  </form>

                  <p id="vst-waitlist-help" className="mt-3 text-xs leading-relaxed text-muted">
                    {vst.privacyNote}
                  </p>
                  <p
                    id="vst-waitlist-status"
                    role="status"
                    aria-live="polite"
                    className={`mt-3 min-h-5 text-xs ${
                      formStatus === "success"
                        ? "text-neon"
                        : formStatus === "error"
                          ? "text-neon-red"
                          : "text-muted"
                    }`}
                  >
                    {formMessage}
                  </p>
                </motion.div>
              </div>

              {/* Notify CTA */}
              <motion.div
                className="mx-auto mt-20 max-w-lg text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <p className="text-sm text-muted">
                  {vst.contactPrefix}{" "}
                  <a
                    href={contactMailto}
                    className="font-medium underline underline-offset-2 transition-colors hover:text-foreground"
                    style={{ color: ORANGE }}
                  >
                    {contactEmail}
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
