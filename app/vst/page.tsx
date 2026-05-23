import type { Metadata } from "next";
import { VSTPageClient } from "./VSTPageClient";

export const metadata: Metadata = {
  title: "Plugins VST — ZewOne Beats",
  description:
    "Synthés et plugins VST/AU produits par ZewOne. Bientôt disponible.",
};

export default function VSTPage() {
  return <VSTPageClient />;
}
