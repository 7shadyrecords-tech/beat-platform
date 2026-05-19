export type Beat = {
  id: string;
  title: string;
  producer: string;
  bpm: number;
  key: string;
  genre: string;
  price: number;
  previewUrl: string;
  coverImage: string;
  tag: string;
  tags: string[];
  featured?: boolean;
  plays?: number;
  trending?: number;
  audioFile?: string; // filename in storage/beats/ — defaults to {id}.mp3
};

export const beats: Beat[] = [
  {
    id: "1",
    title: "AMA",
    producer: "ZewOneBeats",
    bpm: 110,
    key: "Gm",
    genre: "Trap",
    price: 49,
    previewUrl: "/beats/audio/ama.mp3",
    coverImage: "/beats/covers/01.jpg",
    tag: "HOT",
    tags: ["Dark", "Melodic", "808"],
    featured: true,
    plays: 12400,
    trending: 1,
    audioFile: "1. AMA (#key G Minor 6A ) BPM110 ZewOneBeats .mp3",
  },
  {
    id: "2",
    title: "DGRT",
    producer: "ZewOneBeats",
    bpm: 136,
    key: "A#m",
    genre: "Trap",
    price: 55,
    previewUrl: "/beats/audio/dgrt.mp3",
    coverImage: "/beats/covers/02.jpg",
    tag: "NEW",
    tags: ["Hard", "Street", "Aggressive"],
    featured: true,
    plays: 9800,
    trending: 2,
    audioFile: "2. DGRT ( #key A# minor 3A ) BPM136 - ZewOneBeats.mp3",
  },
  {
    id: "3",
    title: "DOPE MACHINE",
    producer: "ZewOneBeats",
    bpm: 135,
    key: "Dm",
    genre: "Trap",
    price: 59,
    previewUrl: "/beats/audio/dope-machine.mp3",
    coverImage: "/beats/covers/03-dope-machine.jpg",
    tag: "TRENDING",
    tags: ["Energetic", "Club", "Hard"],
    featured: true,
    plays: 15200,
    trending: 3,
    audioFile: "3. dope machine ( #key D minor 7A ) BPM135 - ZewOneBeats.mp3",
  },
];

export const featuredBeats = beats.filter((b) => b.featured);
export const trendingBeats = [...beats].sort(
  (a, b) => (a.trending ?? 99) - (b.trending ?? 99)
);
