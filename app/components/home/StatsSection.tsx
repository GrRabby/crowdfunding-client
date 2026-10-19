"use client";

/**
 * StatsSection — animated counter row on a gradient background
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { DollarSign, Target, Smile, Star } from "lucide-react";

const STATS = [
  {
    Icon: Target,
    end: 3240,
    suffix: "+",
    label: "Campaigns Funded",
    format: (n: number) => n.toLocaleString(),
  },
  {
    Icon: DollarSign,
    end: 8.6,
    suffix: "M+",
    label: "Total Raised",
    format: (n: number) => `$${n.toFixed(1)}`,
  },
  {
    Icon: Smile,
    end: 48000,
    suffix: "+",
    label: "Active Backers",
    format: (n: number) =>
      n >= 1000 ? `${(n / 1000).toFixed(0)}K` : n.toString(),
  },
  {
    Icon: Star,
    end: 94,
    suffix: "%",
    label: "Success Rate",
    format: (n: number) => n.toFixed(0),
  },
];

function useCounter(end: number, duration = 1800, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * end);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, end, duration]);
  return value;
}

function StatCard({
  Icon,
  end,
  suffix,
  label,
  format,
  delay,
  active,
}: (typeof STATS)[0] & { delay: number; active: boolean }) {
  const value = useCounter(end, 1600, active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center gap-3 text-center"
    >
      <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
        <Icon className="w-7 h-7 text-white" strokeWidth={1.6} />
      </div>
      <div>
        <p className="text-4xl font-extrabold text-white tracking-tight">
          {format(value)}
          <span>{suffix}</span>
        </p>
        <p className="text-white/70 text-sm font-medium mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.06)_0%,_transparent_60%)]" />
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The numbers speak for themselves
          </h2>
          <p className="text-white/60 mt-3 max-w-md mx-auto text-sm">
            Every credit invested becomes real-world change. Here's what the FundForward community has accomplished together.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} {...stat} delay={i * 0.1} active={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
