import { beats } from "../data/beats";
import { PremiumBeatCard } from "./PremiumBeatCard";
import { SectionReveal } from "./ui/SectionReveal";

export function BeatGrid() {
  return (
    <SectionReveal className="relative py-28" id="catalog">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label-mono text-neon">Full catalog</p>
            <h2 className="heading-luxury mt-3 text-4xl md:text-5xl">
              All <span className="neon-text">beats</span>
            </h2>
          </div>
          <p className="max-w-sm text-muted">
            Six trap instrumentals with full previews. Instant delivery. Stems on
            request.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {beats.map((beat, i) => (
            <PremiumBeatCard key={beat.id} beat={beat} index={i} />
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
