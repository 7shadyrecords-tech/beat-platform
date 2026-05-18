"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "./ui/SectionReveal";

const stats = [
  { label: "Total plays", value: "2.4M", change: "+24%", color: "from-neon to-neon-bright" },
  { label: "Revenue", value: "$48.2K", change: "+18%", color: "from-neon-bright to-neon-red" },
  { label: "Licenses sold", value: "1,247", change: "+31%", color: "from-neon-red to-neon" },
  { label: "Conversion", value: "8.4%", change: "+5%", color: "from-neon to-neon-red" },
];

const chartBars = [40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100];

export function ProducerAnalytics() {
  return (
    <SectionReveal className="py-28" id="analytics">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-14 text-center md:text-left">
          <p className="label-mono text-neon">For producers</p>
          <h2 className="heading-luxury mt-3 text-4xl md:text-5xl">
            Real-time <span className="neon-text">analytics</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted md:mx-0">
            Track plays, revenue, and conversions with a dashboard built for
            serious creators.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card rounded-3xl p-8">
            <p className="label-mono text-muted">Performance overview</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <p className="text-xs text-muted">{s.label}</p>
                  <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
                  <p className={`mt-1 text-xs font-medium bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>
                    {s.change} this month
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8">
            <p className="label-mono text-muted">Plays — last 12 weeks</p>
            <div className="mt-8 flex h-48 items-end justify-between gap-2">
              {chartBars.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-neon/20 via-neon/60 to-neon-bright"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-6">
              <div>
                <p className="text-sm text-muted">Top beat this week</p>
                <p className="font-display font-bold">PRAISE THE LORD</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted">Peak plays</p>
                <p className="font-display text-xl font-bold neon-text">18.9K</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
