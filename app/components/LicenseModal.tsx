"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useCheckout } from "../context/CheckoutContext";
import { useLanguage } from "@/app/hooks/useLanguage";
import {
  formatPriceEUR,
  licenses,
  type License,
  type LicenseId,
} from "../data/licenses";

export function LicenseModal() {
  const { selectedBeat, isModalOpen, closeBuyModal } = useCheckout();
  const { labels } = useLanguage();
  const [selectedLicense, setSelectedLicense] = useState<LicenseId>("mp3-lease");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refundAccepted, setRefundAccepted] = useState(false);

  const activeLicense = licenses.find((l) => l.id === selectedLicense)!;

  const handleCheckout = async () => {
    if (!selectedBeat) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          beatId: selectedBeat.id,
          licenseId: selectedLicense,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Checkout failed");
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && selectedBeat && (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBuyModal}
          />

          <motion.div
            className="fixed inset-0 top-auto bottom-0 sm:top-1/2 sm:bottom-auto z-[101] mx-auto max-h-[90vh] sm:max-h-[90vh] max-w-lg w-full sm:w-auto -translate-y-0 sm:-translate-y-1/2 overflow-y-auto rounded-t-3xl sm:rounded-3xl glass-strong neon-glow"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="license-modal-title"
          >
            <div className="relative p-4 sm:p-6 md:p-8">
              <button
                type="button"
                onClick={closeBuyModal}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:border-neon/40 hover:text-foreground"
                aria-label={labels.licenseModal.close}
              >
                ✕
              </button>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 pr-8 sm:pr-0">
                <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-xl ring-1 ring-neon/30">
                  <Image
                    src={selectedBeat.coverImage}
                    alt=""
                    fill
                    className="object-cover"
                    unoptimized={selectedBeat.coverImage.endsWith(".svg")}
                  />
                </div>
                <div className="min-w-0">
                  <p className="label-mono text-xs sm:text-sm text-neon">{labels.licenseModal.select}</p>
                  <h2
                    id="license-modal-title"
                    className="font-display text-lg sm:text-xl font-bold truncate"
                  >
                    {selectedBeat.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted truncate">{selectedBeat.producer}</p>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 space-y-3">
                {licenses.map((license) => (
                  <LicenseOption
                    key={license.id}
                    license={license}
                    selected={selectedLicense === license.id}
                    onSelect={() => setSelectedLicense(license.id)}
                  />
                ))}
              </div>

              <label className="mt-5 sm:mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 sm:p-4 hover:border-white/20 transition-colors">
                <input
                  type="checkbox"
                  checked={refundAccepted}
                  onChange={(e) => setRefundAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-orange-500"
                />
                <span className="text-[10px] sm:text-xs leading-relaxed text-muted">
                  {labels.licenseModal.refundNotice}{" "}
                  <a
                    href="/legal/cgv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon underline underline-offset-2 hover:text-neon-bright"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {labels.licenseModal.cgvLink}
                  </a>
                </span>
              </label>

              {error && (
                <p className="mt-4 rounded-xl border border-neon-red/30 bg-neon-red/10 px-4 py-3 text-xs sm:text-sm text-neon-red">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={handleCheckout}
                disabled={loading || !refundAccepted}
                className="mt-5 sm:mt-6 w-full rounded-xl bg-gradient-to-r from-neon via-neon-bright to-neon-red py-3 sm:py-4 font-display text-xs sm:text-sm font-bold tracking-widest text-black transition-all hover:scale-[1.01] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 neon-glow-strong min-h-11 sm:min-h-12"
              >
                {loading
                  ? labels.licenseModal.redirecting
                  : labels.licenseModal.checkout.replace("{price}", formatPriceEUR(activeLicense.price))}
              </button>

              <p className="mt-3 sm:mt-4 text-center text-[9px] sm:text-[10px] text-muted">
                {labels.licenseModal.secure}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function LicenseOption({
  license,
  selected,
  onSelect,
}: {
  license: License;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-2xl border p-3 sm:p-4 text-left transition-all min-h-16 sm:min-h-auto ${
        selected
          ? "border-neon/50 bg-neon/10 neon-glow"
          : "border-white/10 bg-white/[0.02] hover:border-white/20"
      }`}
    >
      <div className="flex items-start sm:items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-sm sm:text-base font-bold">{license.name}</p>
          <p className="mt-0.5 text-xs text-muted truncate">{license.description}</p>
        </div>
        <span className="shrink-0 font-display text-base sm:text-lg font-bold neon-text whitespace-nowrap ml-2">
          {formatPriceEUR(license.price)}
        </span>
      </div>
      <ul className="mt-2 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2">
        {license.features.map((f) => (
          <li
            key={f}
            className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] sm:text-[10px] text-muted"
          >
            {f}
          </li>
        ))}
      </ul>
    </button>
  );
}
