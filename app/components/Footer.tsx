export function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-bold tracking-widest">
              BEAT<span className="neon-text">PLATFORM</span>
            </p>
            <p className="mt-3 max-w-xs font-body text-sm text-muted">
              Predator-grade instrumentals for artists who refuse to blend in.
            </p>
          </div>

          <div id="about">
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-neon">
              About
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-muted">
              Curated beats with instant MP3 & WAV delivery. Exclusive and
              non-exclusive licenses available.
            </p>
          </div>

          <div id="licenses">
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-neon">
              Licenses
            </h3>
            <ul className="mt-3 space-y-2 font-body text-sm text-muted">
              <li>Basic — MP3, 5K streams</li>
              <li>Premium — WAV + stems</li>
              <li>Exclusive — full ownership</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            © {new Date().getFullYear()} ZewOne Beats. All rights reserved.
          </p>
          <p className="font-mono text-[10px] text-neon/60">
            獣性 — BEAST MODE ACTIVATED
          </p>
        </div>
      </div>
    </footer>
  );
}
