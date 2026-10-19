"use client";

/**
 * Testimonials — 3 user quote cards with avatar initials and star ratings
 */

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "I launched my solar school project here after being turned down by three banks. Within 12 days I had 214 backers and fully funded the campaign. The platform just works.",
    name: "Arjun Mehta",
    role: "Campaign Creator",
    initials: "AM",
    gradient: "from-emerald-500 to-teal-600",
    stars: 5,
  },
  {
    quote:
      "I love that I can see exactly where my credits go. The progress bar updates in real time and I got a notification the moment my campaign hit the goal. Incredible transparency.",
    name: "Sofia Reyes",
    role: "Campaign Supporter",
    initials: "SR",
    gradient: "from-rose-500 to-pink-600",
    stars: 5,
  },
  {
    quote:
      "As an admin I can manage approvals, handle reports, and oversee withdrawals all from one clean dashboard. The role-based system is exactly what a platform like this needs.",
    name: "David Kimani",
    role: "Platform Administrator",
    initials: "DK",
    gradient: "from-brand-500 to-accent-600",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-brand-600 text-sm font-semibold uppercase tracking-widest mb-2">
            Real stories
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f0a1e] tracking-tight">
            Loved by creators and supporters
          </h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            Hear directly from the people who use FundForward every day to create impact.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="flex flex-col gap-5 rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-brand-100 transition-all duration-250"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
