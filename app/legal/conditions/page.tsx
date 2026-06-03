import type { Metadata } from "next";
import { LegalPageLayout } from "../_components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Conditions — ZewOne Beats",
  description: "Conditions générales placeholder du site ZewOne Beats.",
};

export default function ConditionsPage() {
  return <LegalPageLayout pageKey="conditions" />;
}
