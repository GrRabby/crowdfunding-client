"use client";

/**
 * HeroSection — animated hero with rotating campaign card carousel
 * Left: headline + CTAs + trust badges
 * Right: 4-second auto-rotating featured campaign card
 */

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Leaf,
  Heart,
  BookOpen,
  Zap,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react";

// ─── Featured campaigns (mock — replaced by API in Phase 6) ───────────────────
const FEATURED = [
  {
    id: 1,
    title: "Solar Panels for Rural Schools",
    creator: "Green Future NGO",
    category: "Environment",
    raised: 18450,
    goal: 25000,
    days: 12,
    backers: 214,
    Icon: Leaf,
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    badge: "text-emerald-700 bg-emerald-100",
  },
  {
    id: 2,
    title: "Free Medical Clinic for Underserved Communities",
    creator: "HealthBridge Foundation",
    category: "Healthcare",
    raised: 41200,
    goal: 60000,
    days: 8,
    backers: 503,
    Icon: Heart,
    gradient: "from-rose-500 to-pink-600",
    bg: "bg-rose-50",
    badge: "text-rose-700 bg-rose-100",
  },
  {
    id: 3,
    title: "Youth Coding Bootcamp — 200 Seats",
    creator: "Code Tomorrow",
    category: "Education",
    raised: 9800,
    goal: 15000,
    days: 21,
    backers: 136,
    Icon: BookOpen,
    gradient: "from-violet-500 to-brand-600",
    bg: "bg-brand-50",
    badge: "text-brand-700 bg-brand-100",
  },
  {
    id: 4,
    title: "Ocean Cleanup Micro-Drone Fleet",
    creator: "BlueWave Tech",
    category: "Innovation",
    raised: 72500,
    goal: 100000,
    days: 5,
    backers: 891,
    Icon: Zap,
    gradient: "from-sky-500 to-blue-600",
    bg: "bg-sky-50",
    badge: "text-sky-700 bg-sky-100",
  },
];

const TRUST_STATS = [
  { label: "Campaigns Funded", value: "3,200+", Icon: TrendingUp },
  { label: "Total Backers", value: "48K+", Icon: Users },
  { label: "Avg. Days to Fund", value: "14", Icon: Clock },
];

function pct(raised: number, goal: number) {
  return Math.min(100, Math.round((raised / goal) * 100));
}
function fmt(n: number) {
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n}`;
}

export default function HeroSection() {
  const [idx, setIdx] = useState(0);

  // Auto-rotate every 4 s
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % FEATURED.length), 4000);
    return () => clearInterval(t);
  }, []);

  const camp = FEATURED[idx];

  return (
    <section className="relative overflow-hidden bg-white pt-6 pb-20 lg:pb-28">
      {/* Soft background blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[640px] h-[640px] rounded-full bg-brand-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[480px] h-[480px] rounded-full bg-accent-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* ── Left column ─────────────────────────────────────────────────── */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-200 bg-brand-50 text-brand-700 text-xs font-semibold mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              Empowering changemakers worldwide
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#0f0a1e] leading-[1.1] mb-5"
            >
              Back ideas that{" "}
              <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">
                change the world
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
            >
              FundForward connects passionate creators with supporters who
              believe in real change. Back campaigns, earn credits, and help
              bring bold ideas to life.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link
                href="/campaigns"
                id="hero-explore-btn"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all duration-200 text-sm"
              >
                Explore campaigns
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/register"
                id="hero-start-btn"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-brand-700 bg-brand-50 border border-brand-200 hover:bg-brand-100 hover:-translate-y-0.5 transition-all duration-200 text-sm"
              >
                Start a campaign
              </Link>
            </motion.div>

            {/* Trust stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start"
            >
              {TRUST_STATS.map(({ label, value, Icon }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-brand-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{value}</p>
                    <p className="text-xs text-gray-400">{label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right column — rotating campaign card ────────────────────────── */}
          <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md">
            {/* Dots */}
            <div className="flex gap-1.5 justify-center mb-4">
              {FEATURED.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === idx ? "w-6 bg-brand-500" : "w-1.5 bg-gray-200 hover:bg-gray-300"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="relative h-[340px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={camp.id}
                  initial={{ opacity: 0, x: 40, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -40, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 rounded-3xl bg-white shadow-2xl shadow-gray-200/60 border border-gray-100 overflow-hidden flex flex-col"
                >
                  {/* Card header gradient */}
                  <div className={`h-36 bg-gradient-to-br ${camp.gradient} relative flex items-end p-5`}>
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold">
                      <Clock className="w-3 h-3" />
                      {camp.days}d left
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <camp.Icon className="w-6 h-6 text-white" strokeWidth={1.8} />
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="flex-1 p-5 flex flex-col gap-3">
                    <div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${camp.badge}`}>
                        {camp.category}
                      </span>
                      <h3 className="mt-2 font-bold text-gray-900 text-base leading-snug line-clamp-2">
                        {camp.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">by {camp.creator}</p>
                    </div>

                    {/* Progress */}
                    <div className="mt-auto">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-bold text-gray-900">{fmt(camp.raised)} raised</span>
                        <span className="text-gray-400">of {fmt(camp.goal)}</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct(camp.raised, camp.goal)}%` }}
                          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                          className={`h-full rounded-full bg-gradient-to-r ${camp.gradient}`}
                        />
                      </div>
                      <div className="flex justify-between text-xs mt-1.5">
                        <span className="text-brand-600 font-semibold">{pct(camp.raised, camp.goal)}% funded</span>
                        <span className="text-gray-400">{camp.backers} backers</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
