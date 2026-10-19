"use client";

/**
 * Navbar — FundForward public layout header
 *
 * States:
 *  - Logged-out  → Login + Sign Up buttons
 *  - Logged-in   → Credits chip, avatar dropdown (Dashboard / Logout)
 *
 * Features:
 *  - Scroll-aware: adds backdrop-blur + shadow after 16 px scroll
 *  - Mobile drawer (hamburger) for < md breakpoint
 *  - Active link highlight via usePathname
 *  - Click-outside closes avatar menu & mobile drawer
 *  - framer-motion micro-animations on mount and dropdown
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Coins,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Sparkles,
  X,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

// ─── Nav links shown to everyone ──────────────────────────────────────────────
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/campaigns", label: "Explore" },
];

// ─── Role → dashboard root ─────────────────────────────────────────────────────
const DASHBOARD_PATH: Record<string, string> = {
  creator: "/dashboard/creator",
  supporter: "/dashboard/supporter",
  admin: "/dashboard/admin",
};

export default function Navbar() {
  const { user, isLoading, logout } = useAuth();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const avatarRef = useRef<HTMLDivElement>(null);

  // ── Scroll listener ──────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close avatar menu on outside click ──────────────────────────────────────
  useEffect(() => {
    if (!avatarOpen) return;
    function handleClick(e: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [avatarOpen]);

  // ── Close drawer on route change ─────────────────────────────────────────────
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  const dashboardHref = user ? (DASHBOARD_PATH[user.role] ?? "/dashboard") : "/dashboard";

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <>
      {/* ── Main bar ──────────────────────────────────────────────────────────── */}
      <header
        className={[
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-[0_1px_24px_0_rgba(109,40,217,0.08)]"
            : "bg-white/70 backdrop-blur-sm",
        ].join(" ")}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0"
            aria-label="FundForward home"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 shadow-sm group-hover:shadow-brand-500/40 group-hover:scale-105 transition-all duration-200">
              <Sparkles className="w-4 h-4 text-white" strokeWidth={2.2} />
            </span>
            <span
              className="font-extrabold text-[1.1rem] tracking-tight text-[#0f0a1e]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Fund<span className="text-brand-600">Forward</span>
            </span>
          </Link>

          {/* Centre links — desktop only */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-150",
                  isActive(link.href)
                    ? "text-brand-700 bg-brand-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                ].join(" ")}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-brand-50 -z-10"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search icon */}
            <Link
              href="/campaigns"
              aria-label="Search campaigns"
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:text-brand-600 hover:bg-brand-50 transition-colors duration-150"
            >
              <Search className="w-4.5 h-4.5" />
            </Link>

            {/* Auth skeleton while loading */}
            {isLoading ? (
              <div className="flex gap-2">
                <div className="h-9 w-20 rounded-lg bg-gray-100 animate-pulse" />
                <div className="h-9 w-24 rounded-lg bg-gray-100 animate-pulse" />
              </div>
            ) : user ? (
              /* ── Logged-in ── */
              <div className="flex items-center gap-2">
                {/* Credits chip */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-sm font-semibold select-none">
                  <Coins className="w-3.5 h-3.5 text-brand-500" />
                  {user.credits.toLocaleString()}
                </div>

                {/* Avatar button */}
                <div ref={avatarRef} className="relative">
                  <button
                    id="navbar-avatar-btn"
                    onClick={() => setAvatarOpen((v) => !v)}
                    className="flex items-center gap-1.5 rounded-xl p-0.5 pr-2 border border-transparent hover:border-brand-200 hover:bg-brand-50/60 transition-all duration-150 group"
                    aria-expanded={avatarOpen}
                    aria-haspopup="true"
                  >
                    {/* Avatar */}
                    {user.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.photoUrl}
                        alt={user.name}
                        className="w-8 h-8 rounded-lg object-cover ring-2 ring-white"
                      />
                    ) : (
                      <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white">
                        {initials}
                      </span>
                    )}
                    <div className="hidden sm:flex flex-col items-start leading-tight">
                      <span className="text-xs font-semibold text-gray-800 max-w-[96px] truncate">
                        {user.name}
                      </span>
                      <span className="text-[10px] font-medium text-brand-500 capitalize">
                        {user.role}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${avatarOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {avatarOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.13 }}
                        className="absolute right-0 mt-2 w-52 rounded-2xl bg-white shadow-xl shadow-gray-200/80 border border-gray-100 overflow-hidden"
                        role="menu"
                      >
                        {/* User info header */}
                        <div className="px-4 py-3 border-b border-gray-50">
                          <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                          <p className="text-xs text-gray-400 truncate">{user.email}</p>
                        </div>

                        {/* Credits (mobile) */}
                        <div className="sm:hidden flex items-center gap-2 px-4 py-2.5 border-b border-gray-50">
                          <Coins className="w-4 h-4 text-brand-500" />
                          <span className="text-sm font-medium text-gray-700">
                            {user.credits.toLocaleString()} credits
                          </span>
                        </div>

                        <Link
                          href={dashboardHref}
                          role="menuitem"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700 transition-colors duration-100"
                          onClick={() => setAvatarOpen(false)}
                        >
                          <LayoutDashboard className="w-4 h-4 shrink-0" />
                          Dashboard
                        </Link>

                        <button
                          role="menuitem"
                          onClick={logout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-100"
                        >
                          <LogOut className="w-4 h-4 shrink-0" />
                          Sign out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              /* ── Logged-out ── */
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/login"
                  id="navbar-login-btn"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-50 hover:text-brand-700 transition-colors duration-150"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  id="navbar-register-btn"
                  className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 shadow-sm hover:shadow-brand-500/30 hover:shadow-md transition-all duration-200"
                >
                  Get started
                </Link>
              </div>
            )}

            {/* Hamburger — mobile */}
            <button
              id="navbar-menu-toggle"
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors duration-150"
              onClick={() => setDrawerOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={drawerOpen}
            >
              {drawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Spacer so content doesn't hide under fixed bar ────────────────────── */}
      <div className="h-16" aria-hidden />

      {/* ── Mobile drawer ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer panel */}
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl flex flex-col md:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
                <span
                  className="font-extrabold text-base text-[#0f0a1e]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Fund<span className="text-brand-600">Forward</span>
                </span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-1 p-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={[
                      "px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150",
                      isActive(link.href)
                        ? "bg-brand-50 text-brand-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-50",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Bottom auth section */}
              <div className="mt-auto p-4 border-t border-gray-100">
                {!isLoading && !user && (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/login"
                      className="w-full text-center px-4 py-2.5 text-sm font-semibold text-gray-700 rounded-xl border border-gray-200 hover:border-brand-200 hover:text-brand-700 transition-colors duration-150"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/register"
                      className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 shadow-sm transition-all duration-200"
                    >
                      Get started
                    </Link>
                  </div>
                )}

                {!isLoading && user && (
                  <div className="flex flex-col gap-2">
                    {/* Credits */}
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-50">
                      <Coins className="w-4 h-4 text-brand-500" />
                      <span className="text-sm font-semibold text-brand-700">
                        {user.credits.toLocaleString()} credits
                      </span>
                    </div>
                    <Link
                      href={dashboardHref}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-150 w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
