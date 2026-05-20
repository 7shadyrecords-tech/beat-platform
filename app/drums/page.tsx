import type { Metadata } from "next";
import { DrumsPageClient } from "./DrumsPageClient";

export const metadata: Metadata = {
  title: "Drum Kits — ZewOne Beats",
  description:
    "Kits de drums trap, drill & cinématiques par ZewOne. Bientôt disponible.",
};

export default function DrumsPage() {
  return <DrumsPageClient />;
}
