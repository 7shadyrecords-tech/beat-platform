export type LicenseId = "mp3-lease" | "wav-lease" | "premium-lease" | "exclusive" | "test";

export type License = {
  id: LicenseId;
  name: string;
  price: number;
  priceCents: number;
  description: string;
  features: string[];
};

export const licenses: License[] = [
  {
    id: "test",
    name: "Test License",
    price: 1,
    priceCents: 100,
    description: "Stripe test only — do not use in production.",
    features: ["Test only"],
  },
  {
    id: "mp3-lease",
    name: "MP3 Lease",
    price: 29,
    priceCents: 2900,
    description: "Standard MP3 lease for independent releases.",
    features: ["MP3 file", "5K streams", "1 music video", "Non-exclusive"],
  },
  {
    id: "wav-lease",
    name: "WAV Lease",
    price: 79,
    priceCents: 7900,
    description: "High-quality WAV for serious releases.",
    features: ["WAV file", "50K streams", "2 music videos", "Non-exclusive"],
  },
  {
    id: "premium-lease",
    name: "Premium Lease",
    price: 149,
    priceCents: 14900,
    description: "Full stems and extended rights.",
    features: ["WAV + stems", "Unlimited streams", "Broadcast ready", "Non-exclusive"],
  },
  {
    id: "exclusive",
    name: "Exclusive",
    price: 499,
    priceCents: 49900,
    description: "Full ownership. Beat removed from store.",
    features: ["All files + stems", "Unlimited use", "Full ownership", "Beat removed"],
  },
];

export function getLicense(id: string): License | undefined {
  return licenses.find((l) => l.id === id);
}

export function formatPriceEUR(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(price);
}
