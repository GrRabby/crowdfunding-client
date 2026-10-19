"use client";

/**
 * JoinCTA — Split "Creator vs Supporter" call-to-action section
 * Two cards side by side, each with role-specific benefits and CTA button.
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { Lightbulb, Heart, Check } from "lucide-react";

const ROLES = [
  {
    id: "creator",
    Icon: Lightbulb,
    label: "I'm a Creator",
    headline: "Turn your idea into a funded reality",
    description:
      "Submit your campaign, set a funding goal, and let thousands of believers back your vision — from concept to launch.",
    perks: [
      "20 starter credits on signup",
      "Full campaign management dashboard",
      "Real-time contribution tracking",
      "Withdraw earnings anytime (≥200 credits)",
      "Dedicated campaign analytics",
    ],
    cta: "Start your campaign",
    href: "/register?role=creator",
    gradient: "from-brand-600 to-accent-600",
    cardBg: "bg-gradient-to-br from-brand-50 to-white",
    border: "border-brand-200",
    iconBg: "bg-gradient-to-br from-brand-500 to-brand-700",
    ctaClass:
      "bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white shadow-brand-500/25 hover:shadow-brand-500/40",
  },
  {
    id: "supporter",
    Icon: Heart,
    label: "I'm a Supporter",
    headline: "Back ideas you believe in",
    description:
      "Discover campaigns that match your values, contribute credits, and watch real change happen — campaign by campaign.",
    perks: [
      "50 starter credits on signup",
      "Browse all live campaigns",
      "Instant contribution confirmation",
      "Full contribution history & tracking",
      "Get refunded if a campaign fails",
    ],
    cta: "Start supporting",
    href: "/register?role=supporter",
    gradient: "from-rose-500 to-pink-600",
    cardBg: "bg-gradient-to-br from-rose-50 to-white",
    border: "border-rose-200",
    iconBg: "bg-gradient-to-br from-rose-500 to-pink-600",
    ctaClass:
      "bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white shadow-rose-500/25 hover:shadow-rose-500/40",
  },
];

export default function JoinCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-brand-600 text-sm font-semibold uppercase tracking-widest mb-2">
            Join FundForward
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f0a1e] tracking-tight">
            Choose your role
          </h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            Whether you have a bold idea or want to fund one — there's a place for you here.
          </p>
        </div>

        {/* Role cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {ROLES.map((role, i) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              className={`flex flex-col gap-6 rounded-3xl border ${role.border} ${role.cardBg} p-8 hover:shadow-lg transition-all duration-300`}
            >
              {/* Icon + label */}
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl ${role.iconBg} flex items-center justify-center shadow-lg`}>
                  <role.Icon className="w-6 h-6 text-white" strokeWidth={1.8} />
                </div>
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  {role.label}
                </span>
              </div>

              {/* Headline + description */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{role.headline}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{role.description}</p>
              </div>

              {/* Perks */}
              <ul className="flex flex-col gap-2.5">
                {role.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                    {perk}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={role.href}
                id={`join-cta-${role.id}`}
                className={`mt-auto w-full text-center px-6 py-3 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 ${role.ctaClass}`}
              >
                {role.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
