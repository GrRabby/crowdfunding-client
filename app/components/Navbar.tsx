"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Rocket, Menu, X, Coins, LogOut,
  LayoutDashboard, Bell, ChevronDown, User, Settings,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "creator" | "supporter" | "admin";
  credits: number;
  photoUrl: string | null;
}

const NAV_LINKS = [
  { href: "/",          label: "Home"    },
  { href: "/campaigns", label: "Explore" },
];

const ROLE_META: Record<string, { label: string; bg: string; color: string }> = {
  creator:   { label: "Creator",   bg: "#ede9fe", color: "#6d28d9" },
  supporter: { label: "Supporter", bg: "#dcfce7", color: "#16a34a" },
  admin:     { label: "Admin",     bg: "#fef9c3", color: "#a16207" },
};

// ─────────────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const pathname = usePathname();
  const dropRef  = useRef<HTMLDivElement>(null);

  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [dropOpen,  setDropOpen]  = useState(false);
  const [user,      setUser]      = useState<AuthUser | null>(null);

  /* ── Effects ──────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setDropOpen(false); }, [pathname]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cf_user");
      if (stored) setUser(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  /* ── Helpers ──────────────────────────────────────────────────────────────── */
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  function handleLogout() {
    localStorage.removeItem("cf_token");
    localStorage.removeItem("cf_user");
    setUser(null);
    window.location.href = "/";
  }

  const roleMeta = user ? (ROLE_META[user.role] ?? ROLE_META.supporter) : null;

  /* ── Render ───────────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ── Scoped CSS ────────────────────────────────────────────────────── */}
      <style>{`
        /* Nav links */
        .nv-link {
          padding: 0.4rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #4b5563;
          transition: color .15s ease, background .15s ease;
          white-space: nowrap;
        }
        .nv-link:hover { color: #111827; background: #f3f4f6; }
        .nv-link.active {
          background: linear-gradient(135deg, #6d28d9, #4f46e5);
          color: #fff !important;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(109,40,217,0.35);
        }

        /* Ghost button (Log in) */
        .nv-ghost {
          padding: 0.45rem 1.15rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          transition: color .15s, background .15s;
          white-space: nowrap;
        }
        .nv-ghost:hover { color: #111827; background: #f3f4f6; }

        /* Primary CTA (Get Started) */
        .nv-cta {
          padding: 0.48rem 1.3rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 700;
          color: #fff;
          background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
          box-shadow: 0 4px 14px rgba(109,40,217,0.4);
          transition: box-shadow .2s ease, transform .15s ease;
          white-space: nowrap;
        }
        .nv-cta:hover {
          box-shadow: 0 6px 20px rgba(109,40,217,0.55);
          transform: translateY(-1px);
        }

        /* User avatar trigger */
        .nv-avatar-btn {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.3rem 0.65rem 0.3rem 0.3rem;
          border-radius: 9999px;
          border: 1.5px solid #e5e7eb;
          background: #fff;
          cursor: pointer;
          transition: border-color .15s, box-shadow .15s;
        }
        .nv-avatar-btn:hover {
          border-color: #c4b5fd;
          box-shadow: 0 2px 8px rgba(109,40,217,0.12);
        }

        /* Icon button (bell) */
        .nv-icon-btn {
          width: 36px; height: 36px;
          border-radius: 9999px;
          display: flex; align-items: center; justify-content: center;
          color: #6b7280;
          border: 1.5px solid #e5e7eb;
          background: #fff;
          transition: all .15s;
        }
        .nv-icon-btn:hover {
          color: #6d28d9;
          border-color: #c4b5fd;
          background: #f5f3ff;
        }

        /* Dropdown panel */
        .nv-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 240px;
          background: #fff;
          border: 1.5px solid #e5e7eb;
          border-radius: 16px;
          padding: 0.4rem;
          box-shadow: 0 16px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06);
          animation: nv-drop-in .15s ease;
          z-index: 200;
        }
        @keyframes nv-drop-in {
          from { opacity: 0; transform: translateY(-6px) scale(.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .nv-drop-item {
          display: flex; align-items: center; gap: 0.6rem;
          width: 100%;
          padding: 0.6rem 0.75rem;
          border-radius: 10px;
          font-size: 0.86rem;
          font-weight: 500;
          color: #374151;
          transition: background .12s, color .12s;
          text-align: left;
        }
        .nv-drop-item:hover { background: #f9fafb; color: #111827; }
        .nv-drop-item.danger { color: #dc2626; }
        .nv-drop-item.danger:hover { background: #fef2f2; }
        .nv-drop-divider { height: 1px; background: #f3f4f6; margin: 0.35rem 0.5rem; }

        /* Mobile */
        .nv-mobile-panel {
          display: none;
          flex-direction: column;
          padding: 0.5rem 1rem 1.25rem;
          gap: 0.2rem;
          border-top: 1px solid #f3f4f6;
          background: #fff;
          animation: nv-slide-down .18s ease;
        }
        @keyframes nv-slide-down {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nv-mob-link {
          display: flex; align-items: center; gap: 0.55rem;
          padding: 0.7rem 0.9rem;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 500;
          color: #374151;
          transition: background .12s, color .12s;
        }
        .nv-mob-link:hover, .nv-mob-link.active {
          background: #f5f3ff;
          color: #6d28d9;
        }

        @media (max-width: 680px) {
          .nv-desktop { display: none !important; }
          .nv-hamburger { display: flex !important; }
          .nv-mobile-panel { display: flex !important; }
        }
        @media (min-width: 681px) {
          .nv-hamburger { display: none !important; }
        }
      `}</style>

      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#fff",
        borderBottom: scrolled ? "1px solid #e5e7eb" : "1px solid #f3f4f6",
        boxShadow: scrolled
          ? "0 4px 24px rgba(0,0,0,0.07)"
          : "0 1px 0 #f3f4f6",
        transition: "box-shadow .25s ease, border-color .25s ease",
      }}>
        {/* ── Main row ─────────────────────────────────────────────────── */}
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1.5rem",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.55rem", flexShrink: 0, textDecoration: "none" }}>
            <div style={{
              width: 36, height: 36,
              borderRadius: 11,
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(109,40,217,0.35)",
              flexShrink: 0,
            }}>
              <Rocket size={17} color="#fff" />
            </div>
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "1.15rem",
              letterSpacing: "-0.03em",
              color: "#0f0a1e",
            }}>
              FundForward
            </span>
          </Link>

          {/* Center nav — pill container */}
          <nav
            className="nv-desktop"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.1rem",
              padding: "0.25rem",
              borderRadius: 9999,
              background: "#f3f4f6",
            }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nv-link${isActive(link.href) ? " active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexShrink: 0 }}>
            {user ? (
              /* ── Logged In ─────────────────────────────────────────────── */
              <>
                {/* Credits chip */}
                <div
                  className="nv-desktop"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    padding: "0.35rem 0.85rem",
                    borderRadius: 9999,
                    background: "#fef9c3",
                    border: "1.5px solid #fde68a",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "#92400e",
                  }}
                >
                  <Coins size={13} />
                  {user.credits.toLocaleString()}
                </div>

                {/* Notification bell */}
                <button className="nv-icon-btn nv-desktop" title="Notifications" aria-label="Notifications">
                  <Bell size={15} />
                </button>

                {/* User dropdown */}
                <div ref={dropRef} style={{ position: "relative" }}>
                  <button
                    className="nv-avatar-btn"
                    onClick={() => setDropOpen((o) => !o)}
                    aria-expanded={dropOpen}
                    aria-haspopup="true"
                  >
                    {/* Avatar */}
                    <div style={{
                      width: 28, height: 28,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontSize: "0.78rem", color: "#fff",
                      overflow: "hidden", flexShrink: 0,
                    }}>
                      {user.photoUrl
                        ? <img src={user.photoUrl} alt={user.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        : user.name.charAt(0).toUpperCase()
                      }
                    </div>
                    <span
                      className="nv-desktop"
                      style={{ fontSize: "0.85rem", fontWeight: 600, color: "#111827", maxWidth: 90, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    >
                      {user.name.split(" ")[0]}
                    </span>
                    <ChevronDown
                      size={14}
                      className="nv-desktop"
                      style={{
                        color: "#9ca3af",
                        transition: "transform .2s",
                        transform: dropOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>

                  {dropOpen && (
                    <div className="nv-dropdown">
                      {/* User info */}
                      <div style={{ padding: "0.6rem 0.75rem 0.5rem", marginBottom: "0.2rem" }}>
                        <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "#111827" }}>{user.name}</p>
                        <p style={{ fontSize: "0.76rem", color: "#9ca3af", marginBottom: "0.45rem" }}>{user.email}</p>
                        <span style={{
                          display: "inline-flex", alignItems: "center",
                          padding: "2px 9px", borderRadius: 9999,
                          fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em",
                          background: roleMeta!.bg, color: roleMeta!.color,
                        }}>
                          {roleMeta!.label}
                        </span>
                      </div>
                      <div className="nv-drop-divider" />

                      <Link href="/dashboard" className="nv-drop-item">
                        <LayoutDashboard size={14} /> Dashboard
                      </Link>
                      <Link href="/dashboard/profile" className="nv-drop-item">
                        <User size={14} /> Profile
                      </Link>
                      <Link href="/dashboard/settings" className="nv-drop-item">
                        <Settings size={14} /> Settings
                      </Link>

                      <div className="nv-drop-divider" />

                      {/* Credits row */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.45rem 0.75rem", marginBottom: "0.2rem", borderRadius: 10, background: "#fffbeb" }}>
                        <span style={{ fontSize: "0.8rem", color: "#92400e" }}>Credits</span>
                        <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#d97706", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                          <Coins size={12} /> {user.credits.toLocaleString()}
                        </span>
                      </div>

                      <div className="nv-drop-divider" />

                      <button onClick={handleLogout} className="nv-drop-item danger" style={{ width: "100%" }}>
                        <LogOut size={14} /> Log out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* ── Logged Out ────────────────────────────────────────────── */
              <>
                <Link href="/login" className="nv-ghost nv-desktop">Log in</Link>
                <Link href="/register" className="nv-cta">Get Started</Link>
              </>
            )}

            {/* Hamburger */}
            <button
              className="nv-icon-btn nv-hamburger"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              style={{ display: "none" }}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* ── Mobile panel ──────────────────────────────────────────────── */}
        {menuOpen && (
          <div className="nv-mobile-panel">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nv-mob-link${isActive(link.href) ? " active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ height: 1, background: "#f3f4f6", margin: "0.4rem 0" }} />
            {user ? (
              <>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.5rem 0.9rem" }}>
                  <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>Credits</span>
                  <span style={{ fontWeight: 700, color: "#d97706", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <Coins size={13} /> {user.credits.toLocaleString()}
                  </span>
                </div>
                <Link href="/dashboard" className="nv-mob-link"><LayoutDashboard size={15} /> Dashboard</Link>
                <button onClick={handleLogout} className="nv-mob-link" style={{ width: "100%", color: "#dc2626" }}>
                  <LogOut size={15} /> Log out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="nv-mob-link">Log in</Link>
                <Link
                  href="/register"
                  style={{ margin: "0.3rem 0 0", padding: "0.75rem", borderRadius: 12, fontWeight: 700, fontSize: "0.9rem", color: "#fff", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", textAlign: "center" }}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
      </header>
    </>
  );
}
