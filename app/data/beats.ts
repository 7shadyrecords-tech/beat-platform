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
};

export const beats: Beat[] = [
  {
    id: "1",
    title: "TRAP HAMZA",
    producer: "ARULO",
    bpm: 145,
    key: "F#m",
    genre: "Trap",
    price: 49,
    previewUrl: "/beats/audio/01-trap-hamza.mp3",
    coverImage: "/beats/covers/01.jpg",
    tag: "HOT",
    tags: ["Hard", "808", "Dark"],
    featured: true,
    plays: 12400,
    trending: 1,
  },
  {
    id: "2",
    title: "G EAZY TYPE",
    producer: "ARULO",
    bpm: 140,
    key: "Cm",
    genre: "Trap",
    price: 55,
    previewUrl: "/beats/audio/02-g-eazy-type.mp3",
    coverImage: "/beats/covers/02.jpg",
    tag: "EXCLUSIVE",
    tags: ["West Coast", "Bouncy", "Melodic"],
    featured: true,
    plays: 9800,
    trending: 2,
  },
  {
    id: "3",
    title: "YOUNG TRIZZY",
    producer: "ARULO",
    bpm: 150,
    key: "Gm",
    genre: "Trap",
    price: 59,
    previewUrl: "/beats/audio/03-young-trizzy.mp3",
    coverImage: "/beats/covers/03.svg",
    tag: "NEW",
    tags: ["Aggressive", "Hi-Hats", "Street"],
    featured: true,
    plays: 15200,
    trending: 3,
  },
  {
    id: "4",
    title: "C.B.P.D",
    producer: "ARULO",
    bpm: 138,
    key: "Am",
    genre: "Trap",
    price: 45,
    previewUrl: "/beats/audio/04-cbpd.mp3",
    coverImage: "/beats/covers/04.jpg",
    tag: "TRENDING",
    tags: ["Atmospheric", "Dark", "Spacey"],
    plays: 7600,
    trending: 4,
  },
  {
    id: "5",
    title: "COMPLICATED",
    producer: "ARULO",
    bpm: 142,
    key: "Dm",
    genre: "Trap",
    price: 39,
    previewUrl: "/beats/audio/05-complicated.mp3",
    coverImage: "/beats/covers/05.jpg",
    tag: "HOT",
    tags: ["Emotional", "Piano", "Melodic"],
    plays: 11300,
    trending: 5,
  },
  {
    id: "6",
    title: "PRAISE THE LORD",
    producer: "ARULO",
    bpm: 148,
    key: "Em",
    genre: "Trap",
    price: 52,
    previewUrl: "/beats/audio/06-praise-lord.mp3",
    coverImage: "/beats/covers/06.svg",
    tag: "CLASSIC",
    tags: ["Energetic", "Club", "Hard"],
    plays: 18900,
    trending: 6,
  },
];

export const featuredBeats = beats.filter((b) => b.featured);
export const trendingBeats = [...beats].sort(
  (a, b) => (a.trending ?? 99) - (b.trending ?? 99)
);
