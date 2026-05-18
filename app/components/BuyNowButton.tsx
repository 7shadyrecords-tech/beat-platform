"use client";

import type { Beat } from "../data/beats";
import { useCheckout } from "../context/CheckoutContext";
import { formatPriceEUR } from "../data/licenses";

type BuyNowButtonProps = {
  beat: Beat;
  className?: string;
  showFromPrice?: boolean;
};

export function BuyNowButton({
  beat,
  className = "",
  showFromPrice = true,
}: BuyNowButtonProps) {
  const { openBuyModal } = useCheckout();

  return (
    <button
      type="button"
      onClick={() => openBuyModal(beat)}
      className={
        className ||
        "flex-1 rounded-xl bg-gradient-to-r from-neon to-neon-red py-2.5 text-center text-[10px] font-bold tracking-widest text-black transition-transform hover:scale-[1.02]"
      }
    >
      {showFromPrice ? `BUY — ${formatPriceEUR(29)}` : "BUY NOW"}
    </button>
  );
}
