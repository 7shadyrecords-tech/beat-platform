"use client";

import { motion } from "framer-motion";
import { CheckoutProvider } from "../context/CheckoutContext";
import { PlayerProvider } from "../context/PlayerContext";
import { LicenseModal } from "./LicenseModal";
import { AnimatedBackground } from "./ui/AnimatedBackground";
import { FloatingElements } from "./ui/FloatingElements";
import { BeatGrid } from "./BeatGrid";
import { FeaturedBeats } from "./FeaturedBeats";
import { PremiumAudioPlayer } from "./PremiumAudioPlayer";
import { PremiumFooter } from "./PremiumFooter";
import { PremiumHeader } from "./PremiumHeader";
import { PremiumHero } from "./PremiumHero";
import { ProducerAnalytics } from "./ProducerAnalytics";
import { Testimonials } from "./Testimonials";
import { TrendingCarousel } from "./TrendingCarousel";

export function HomePage() {
  return (
    <PlayerProvider>
      <CheckoutProvider>
      <AnimatedBackground />
      <FloatingElements />
      <PremiumHeader />

      <motion.main
        className="relative z-10 pb-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <PremiumHero />
        <FeaturedBeats />
        <div id="trending">
          <TrendingCarousel />
        </div>
        <ProducerAnalytics />
        <BeatGrid />
        <Testimonials />
        <PremiumFooter />
      </motion.main>

      <PremiumAudioPlayer />
      <LicenseModal />
      </CheckoutProvider>
    </PlayerProvider>
  );
}
