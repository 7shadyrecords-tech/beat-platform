import type { Metadata } from "next";
import { LegalPageLayout } from "../_components/LegalPageLayout";

export const metadata: Metadata = {
  title: "CGV — Conditions Générales de Vente | ZewOne Beats",
  description: "Conditions générales de vente de ZewOne Beats — licences de beats numériques.",
};

export default function CGVPage() {
  return <LegalPageLayout pageKey="cgv" />;
}
