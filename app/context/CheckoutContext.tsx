"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Beat } from "../data/beats";

type CheckoutContextValue = {
  selectedBeat: Beat | null;
  isModalOpen: boolean;
  openBuyModal: (beat: Beat) => void;
  closeBuyModal: () => void;
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [selectedBeat, setSelectedBeat] = useState<Beat | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openBuyModal = useCallback((beat: Beat) => {
    setSelectedBeat(beat);
    setIsModalOpen(true);
  }, []);

  const closeBuyModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBeat(null), 300);
  }, []);

  return (
    <CheckoutContext.Provider
      value={{ selectedBeat, isModalOpen, openBuyModal, closeBuyModal }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }
  return ctx;
}
