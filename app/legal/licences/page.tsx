import type { Metadata } from "next";
import { LegalPageLayout } from "../_components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Licences — ZewOne Beats",
  description: "Résumé placeholder des licences proposées par ZewOne Beats.",
};

export default function LicencesPage() {
  return <LegalPageLayout pageKey="licences" />;
}
