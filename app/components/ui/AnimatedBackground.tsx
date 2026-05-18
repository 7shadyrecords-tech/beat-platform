"use client";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#030303]" />

      <div
        className="animate-mesh absolute -left-1/4 -top-1/4 h-[80vh] w-[80vh] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(255,77,0,0.25) 0%, transparent 70%)",
        }}
      />
      <div
        className="animate-mesh absolute -right-1/4 top-1/3 h-[60vh] w-[60vh] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(255,42,42,0.2) 0%, transparent 70%)",
          animationDelay: "-7s",
        }}
      />
      <div
        className="animate-pulse-glow absolute bottom-0 left-1/2 h-[50vh] w-[90vw] -translate-x-1/2 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,77,0,0.15) 0%, transparent 60%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,77,0,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,77,0,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030303]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030303_75%)]" />

      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay">
        <svg className="h-full w-full">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
    </div>
  );
}
