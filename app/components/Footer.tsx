import Link from "next/link";
import { Sparkles, Globe, X, Link2, Mail } from "lucide-react";

const LINKS = {
  Platform: [
    { label: "Explore Campaigns", href: "/campaigns" },
    { label: "Start a Campaign", href: "/register?role=creator" },
    { label: "How It Works", href: "/#how-it-works" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

const SOCIALS = [
  { Icon: Globe,  href: "https://github.com",   label: "GitHub" },
  { Icon: X,     href: "https://twitter.com",  label: "Twitter" },
  { Icon: Link2, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: Mail,  href: "mailto:hello@fundforward.io", label: "Email" },
];

export default function Footer() {
  const year = 2026;

  return (
    <footer className="bg-[#0f0a1e] text-white">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="col-span-2 flex flex-col gap-5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 shadow-sm group-hover:shadow-brand-500/40 transition-shadow">
                <Sparkles className="w-4 h-4 text-white" strokeWidth={2.2} />
              </span>
              <span
                className="font-extrabold text-[1.1rem] tracking-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Fund<span className="text-brand-400">Forward</span>
              </span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              FundForward connects passionate creators with supporters who
              believe in real change. Back campaigns, earn credits, and bring
              bold ideas to life.
            </p>

            {/* Socials */}
            <div className="flex gap-2 mt-1">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-150"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                {heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            &copy; {year} FundForward. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Built with ❤️ for changemakers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
