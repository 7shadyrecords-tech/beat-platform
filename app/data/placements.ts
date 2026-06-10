export type Placement = {
  id: string;
  artist: string;
  title: string;
  image: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
  streams?: number;
};

export const placements: Placement[] = [
  {
    id: "booba-walabok",
    artist: "Booba",
    title: "Walabok",
    image: "/collabs/booba.jpg",
  },
  {
    id: "13-block-vrai-negro",
    artist: "13 Block",
    title: "Vrai Negro",
    image: "/collabs/13block.jpg",
  },
  {
    id: "13-block-lkteb",
    artist: "13 Block",
    title: "L.K.T.E.B",
    image: "/collabs/13block.jpg",
  },
  {
    id: "13-block-hors-la-loi",
    artist: "13 Block",
    title: "Hors la loi",
    image: "/collabs/13block.jpg",
  },
  {
    id: "13-block-vers-l-enfer",
    artist: "13 Block",
    title: "Vers l'enfer",
    image: "/collabs/13block.jpg",
  },
  {
    id: "hds-dans-la-rue",
    artist: "HDS",
    title: "Dans la rue",
    image: "/collabs/hds.jpg",
  },
  {
    id: "douma-kalash-igo-5",
    artist: "Douma Kalash",
    title: "IGO #5",
    image: "/collabs/douma-kalash.jpg",
  },
  {
    id: "ndx-denie-fwa",
    artist: "NDX",
    title: "Denie Fwa",
    image: "/collabs/ndx.jpg",
  },
  {
    id: "oldpee-dur",
    artist: "Oldpee",
    title: "Dur",
    image: "/collabs/oldpee.jpg",
  },
  {
    id: "xelo-go-hard",
    artist: "XELO",
    title: "Go Hard",
    image: "/collabs/xelo.jpg",
  },
  {
    id: "xelo-yizimi-2",
    artist: "XELO",
    title: "YIZIMI 2.0",
    image: "/collabs/xelo.jpg",
  },
  {
    id: "meiji-sai-vol-a-l-etalage",
    artist: "MEIJI SAI",
    title: "Vol à l'étalage",
    image: "/collabs/meiji-sai.jpg",
  },
];

export const placementArtists = [...new Set(placements.map((placement) => placement.artist))];
