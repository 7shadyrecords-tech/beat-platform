"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/app/hooks/useLanguage";
import { AnimatedBackground } from "@/app/components/ui/AnimatedBackground";

function SuccessContent() {
  const { labels } = useLanguage();
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get("session_id");

  const [beatTitle, setBeatTitle] = useState("");
  const [licenseName, setLicenseName] = useState("");

  useEffect(() => {
    async function fetchSession() {
      if (!sessionId) return;
      try {
        const res = await fetch(`/api/checkout/session?session_id=${encodeURIComponent(
          sessionId
        )}`);
        if (!res.ok) return;
        const data = await res.json();
        const metadata = data.metadata ?? {};
        setBeatTitle(metadata.beatTitle ?? "");
        setLicenseName(metadata.licenseName ?? "");
      } catch {
        // ignore fetch errors — show generic success UI
      }
    }

    fetchSession();
  }, [sessionId]);

  return (
    <div className="glass-strong max-w-md rounded-3xl p-10 text-center neon-glow">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-neon to-neon-red">
        <svg
          className="h-8 w-8 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <p className="label-mono text-neon">{labels.checkout.success}</p>
      <h1 className="heading-luxury mt-3 text-3xl">{labels.checkout.heading}</h1>

      {(beatTitle || licenseName) && (
        <div className="mt-6 rounded-2xl border border-neon/20 bg-neon/5 p-4">
          <p className="label-mono text-neon/80">{labels.checkout.yourPurchase}</p>
          <p className="mt-2 font-display text-lg font-bold">{beatTitle}</p>
          {licenseName && <p className="mt-1 text-xs text-muted">{labels.checkout.license} : {licenseName}</p>}
        </div>
      )}

      <p className="mt-6 text-sm text-muted">
        ✉️ {labels.checkout.summary}
      </p>

      <div className="mt-2 rounded-lg border border-neon-red/20 bg-neon-red/5 p-3">
        <p className="label-mono text-[11px] text-neon-red">{labels.checkout.expiry}</p>
      </div>

      <Link
        href="/"
        className="mt-8 inline-block w-full rounded-xl bg-gradient-to-r from-neon to-neon-red py-4 font-display text-sm font-bold tracking-widest text-black transition-transform hover:scale-[1.02]"
      >
        {labels.checkout.backToMarketplace}
      </Link>
    </div>
  );
}

export default function CheckoutSuccessPage() {

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <Suspense fallback={<div className="text-foreground">Chargement...</div>}>
          <SuccessContent />
        </Suspense>
      </main>
    </div>
  );
}
