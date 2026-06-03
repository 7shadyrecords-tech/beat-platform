import type { Metadata } from "next";
import { LegalPageLayout } from "../_components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Confidentialité — ZewOne Beats",
  description: "Politique de confidentialité placeholder de ZewOne Beats.",
};

export default function ConfidentialitePage() {
  return <LegalPageLayout pageKey="confidentialite" />;
}
