export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16 scanlines">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-neon/10 blur-[120px] animate-float" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-orange-900/20 blur-[100px]" />

      <div className="absolute top-1/4 left-0 h-px w-full bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
      <div className="absolute top-1/3 right-8 hidden h-32 w-1 manga-stripe opacity-60 lg:block" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-neon">
          // 獣性 — PREDATOR SOUND LAB
        </p>

        <h1 className="max-w-4xl font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="block text-foreground">UNLEASH</span>
          <span className="block shimmer-text">THE BEAST</span>
          <span className="block text-foreground/80">WITHIN</span>
        </h1>

        <p className="mt-6 max-w-xl font-body text-lg font-medium leading-relaxed text-muted sm:text-xl">
          Premium trap, drill & dark R&B instrumentals. Crafted in the shadows.
          Licensed for artists who hunt their sound.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#beats"
            className="group relative inline-flex items-center justify-center overflow-hidden border-2 border-neon bg-neon px-8 py-4 font-display text-sm font-bold tracking-[0.2em] text-black transition-all hover:bg-neon-bright neon-glow-strong"
          >
            <span className="relative z-10">EXPLORE BEATS</span>
          </a>
          <a
            href="#about"
            className="inline-flex items-center justify-center border border-border bg-surface-elevated px-8 py-4 font-display text-sm font-bold tracking-[0.2em] text-foreground transition-all hover:border-neon/50 hover:text-neon"
          >
            HOW IT WORKS
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 border-t border-border pt-10 sm:max-w-lg">
          {[
            { value: "120+", label: "Beats" },
            { value: "2.4K", label: "Artists" },
            { value: "∞", label: "Energy" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-2xl font-bold text-neon sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          Scroll
        </span>
        <div className="h-10 w-px bg-gradient-to-b from-neon to-transparent animate-pulse-neon" />
      </div>
    </section>
  );
}
