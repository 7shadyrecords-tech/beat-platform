import { beats, type Beat } from "../data/beats";

export function getBeatById(id: string): Beat | undefined {
  return beats.find((b) => b.id === id);
}
