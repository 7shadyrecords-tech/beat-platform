"use client";

import Link from "next/link";
import { useLanguage } from "@/app/hooks/useLanguage";
import { AnimatedBackground } from "@/app/components/ui/AnimatedBackground";

export const dynamic = "force-dynamic";

export default function CheckoutCancelPage() {
  const { labels } = useLanguage();
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <div className="glass-strong max-w-md rounded-3xl p-10 text-center neon-glow">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-neon-red/40 bg-neon-red/10">
            <svg
              className="h-8 w-8 text-neon-red"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <p className="label-mono text-neon-red">{labels.checkout.cancelled}</p>
          <h1 className="heading-luxury mt-3 text-3xl">{labels.checkout.noCharge}</h1>
          <p className="mt-4 text-sm text-muted">
            {labels.checkout.cancelHelp}
          </p>

          <Link
            href="/"
            className="mt-8 inline-block w-full rounded-xl border border-neon/40 bg-neon/10 py-4 font-display text-sm font-bold tracking-widest text-neon transition-all hover:bg-neon/20"
          >
            {labels.checkout.returnToMarketplace}
          </Link>
        </div>
      </main>
    </div>
  );
}
