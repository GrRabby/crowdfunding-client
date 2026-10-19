"use client";

/**
 * TopCampaigns — Top 6 funded campaigns grid
 * Shows campaign cards with progress bars, category badges, and a "View all" CTA.
 * In Phase 6, replace MOCK_CAMPAIGNS with an API fetch.
 */

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Leaf,
  Heart,
  BookOpen,
  Zap,
  Music,
  Blocks,
  ArrowRight,
  Clock,
  Users,
} from "lucide-react";

// ─── Mock data ────────────────────────────────────────────────────────────────
const CAMPAIGNS = [
  {
    id: 1,
    title: "Solar Panels for Rural Schools",
    creator: "Green Future NGO",
    story: "Bringing clean energy to 12 schools in off-grid communities, powering classrooms and futures.",
    category: "Environment",
    raised: 18450,
    goal: 25000,
    days: 12,
    backers: 214,
    Icon: Leaf,
    gradient: "from-emerald-500 to-teal-600",
    badge: "text-emerald-700 bg-emerald-100",
  },
  {
    id: 2,
    title: "Free Medical Clinic for Underserved Communities",
    creator: "HealthBridge Foundation",
    story: "Funding essential equipment and staff for a free weekly clinic serving 500+ residents.",
    category: "Healthcare",
    raised: 41200,
    goal: 60000,
    days: 8,
    backers: 503,
    Icon: Heart,
    gradient: "from-rose-500 to-pink-600",
    badge: "text-rose-700 bg-rose-100",
  },
  {
    id: 3,
    title: "Youth Coding Bootcamp — 200 Seats",
    creator: "Code Tomorrow",
    story: "Three-month intensive coding program with job placement support for underprivileged youth.",
    category: "Education",
    raised: 9800,
    goal: 15000,
    days: 21,
    backers: 136,
    Icon: BookOpen,
    gradient: "from-violet-500 to-brand-600",
    badge: "text-brand-700 bg-brand-100",
  },
  {
    id: 4,
    title: "Ocean Cleanup Micro-Drone Fleet",
    creator: "BlueWave Tech",
    story: "Deploying 50 autonomous drones to collect plastic waste from coastal shorelines daily.",
    category: "Innovation",
    raised: 72500,
    goal: 100000,
    days: 5,
    backers: 891,
    Icon: Zap,
    gradient: "from-sky-500 to-blue-600",
    badge: "text-sky-700 bg-sky-100",
  },
  {
    id: 5,
    title: "Community Recording Studio — Open to All",
    creator: "Soundwave Collective",
    story: "A free, professional-grade studio for local artists who can't afford commercial rates.",
    category: "Arts & Music",
    raised: 6200,
    goal: 12000,
    days: 30,
    backers: 88,
    Icon: Music,
    gradient: "from-amber-500 to-orange-500",
    badge: "text-amber-700 bg-amber-100",
  },
  {
    id: 6,
    title: "Accessible Playground for Children with Disabilities",
    creator: "Inclusive Play Initiative",
    story: "Building an ADA-compliant sensory playground so every child in the city can play together.",
    category: "Community",
    raised: 33800,
    goal: 45000,
    days: 16,
    backers: 420,
    Icon: Blocks,
    gradient: "from-fuchsia-500 to-purple-600",
    badge: "text-fuchsia-700 bg-fuchsia-100",
  },
];

function pct(raised: number, goal: number) {
  return Math.min(100, Math.round((raised / goal) * 100));
}
function fmt(n: number) {
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n}`;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

export default function TopCampaigns() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-brand-600 text-sm font-semibold uppercase tracking-widest mb-2">
              Trending now
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f0a1e] tracking-tight">
              Top funded campaigns
            </h2>
            <p className="text-gray-500 mt-2 max-w-md">
              These campaigns are making the biggest impact right now. Be part of the story.
            </p>
          </div>
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 group whitespace-nowrap"
          >
            View all campaigns
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAMPAIGNS.map((camp, i) => (
            <motion.div
              key={camp.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
            >
              <Link
                href={`/campaigns/${camp.id}`}
                className="group flex flex-col h-full rounded-2xl bg-white border border-gray-100 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/8 transition-all duration-250 overflow-hidden"
              >
                {/* Card header */}
                <div className={`h-28 bg-gradient-to-br ${camp.gradient} relative flex items-end p-4`}>
                  {/* Days left badge */}
                  <span className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/25 backdrop-blur-sm text-white text-xs font-semibold">
                    <Clock className="w-3 h-3" />
                    {camp.days}d left
                  </span>
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <camp.Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
                  </div>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${camp.badge}`}>
                      {camp.category}
                    </span>
                    <h3 className="mt-2 font-bold text-gray-900 text-base leading-snug group-hover:text-brand-700 transition-colors duration-150 line-clamp-2">
                      {camp.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">by {camp.creator}</p>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                      {camp.story}
                    </p>
                  </div>

                  {/* Progress */}
                  <div className="mt-auto pt-3 border-t border-gray-50">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-bold text-gray-900">{fmt(camp.raised)} raised</span>
                      <span className="text-gray-400">of {fmt(camp.goal)}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${camp.gradient} transition-all duration-700`}
                        style={{ width: `${pct(camp.raised, camp.goal)}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-brand-600 font-semibold text-xs">
                        {pct(camp.raised, camp.goal)}% funded
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Users className="w-3 h-3" />
                        {camp.backers}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
