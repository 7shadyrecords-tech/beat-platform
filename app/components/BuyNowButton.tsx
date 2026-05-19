"use client";

import type React from "react";
import type { Beat } from "../data/beats";
import { useCheckout } from "../context/CheckoutContext";
import { useLanguage } from "@/app/hooks/useLanguage";
import { formatPriceEUR } from "../data/licenses";

type BuyNowButtonProps = {
  beat: Beat;
  className?: string;
  style?: React.CSSProperties;
  showFromPrice?: boolean;
};

export function BuyNowButton({
  beat,
  className = "",
  style,
  showFromPrice = true,
}: BuyNowButtonProps) {
  const { openBuyModal } = useCheckout();
  const { labels } = useLanguage();

  const label = showFromPrice
    ? `${labels.beatCard.buy} — ${formatPriceEUR(29)}`
    : labels.beatCard.buyNow;

  return (
    <button
      type="button"
      onClick={() => openBuyModal(beat)}
      style={style}
      className={
        className ||
        "flex-1 rounded-xl bg-gradient-to-r from-neon to-neon-red py-2.5 text-center text-[10px] font-bold tracking-widest text-black transition-transform hover:scale-[1.02]"
      }
    >
      {label}
    </button>
  );
}
