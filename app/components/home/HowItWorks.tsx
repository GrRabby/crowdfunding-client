"use client";

/**
 * HowItWorks — 3-step explainer section with animated step cards
 */

import { motion, type Variants } from "framer-motion";
import { UserPlus, Search, Handshake } from "lucide-react";

const STEPS = [
  {
    number: "01",
    Icon: UserPlus,
    title: "Create your account",
    description:
      "Sign up as a Creator or Supporter in seconds. Choose your role, set up your profile, and you're ready to go.",
    gradient: "from-brand-500 to-brand-700",
    glow: "shadow-brand-500/20",
  },
  {
    number: "02",
    Icon: Search,
    title: "Discover or launch campaigns",
    description:
      "Browse hundreds of live campaigns across every category — or pitch your own idea and start raising in minutes.",
    gradient: "from-accent-500 to-blue-600",
    glow: "shadow-accent-500/20",
  },
  {
    number: "03",
    Icon: Handshake,
    title: "Back it & watch it grow",
    description:
      "Use credits to back campaigns you believe in. Track impact in real time and get notified on every milestone.",
    gradient: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/20",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-brand-600 text-sm font-semibold uppercase tracking-widest mb-2">
            Simple by design
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f0a1e] tracking-tight">
            How FundForward works
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            From sign-up to funded — three steps that take less than five minutes to start.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-gradient-to-r from-brand-200 via-accent-300 to-emerald-200" />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              className="relative flex flex-col items-center md:items-start text-center md:text-left gap-4"
            >
              {/* Icon bubble */}
              <div
                className={`relative z-10 flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} shadow-xl ${step.glow} shrink-0`}
              >
                <step.Icon className="w-9 h-9 text-white" strokeWidth={1.6} />
                {/* Step number */}
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-[10px] font-extrabold text-gray-400 shadow-sm">
                  {step.number}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
