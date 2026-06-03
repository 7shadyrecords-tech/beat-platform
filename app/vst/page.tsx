import type { Metadata } from "next";
import { VSTPageClient } from "./VSTPageClient";

const title = "Plugins VST/AU pour trap, drill et cinéma — ZewOne Beats";
const description =
  "Découvre TRAFIK Synth, le futur plugin VST3/AU macOS de ZewOne Beats pour productions trap, drill et cinématiques.";
const url = "https://zewonebeats.com/vst";
const ogImage = "/og/vst.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://zewonebeats.com"),
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    siteName: "ZewOne Beats",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "TRAFIK Synth — plugin VST/AU ZewOne Beats",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

export default function VSTPage() {
  return <VSTPageClient />;
}
