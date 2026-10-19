"use client";

/**
 * AuthContext — Production-grade auth state management
 *
 * Improvements over a basic implementation:
 *
 * 1. JWT expiry check (client-side, no network round-trip)
 *    → Reads the `exp` field from the token before calling /me.
 *    → Clears stale tokens instantly without waiting for a 401.
 *
 * 2. /me verification on every app load
 *    → Even if the token isn't expired yet, we verify it with the server.
 *    → This handles: password changes, role changes, account deletion.
 *    → `isLoading` stays true until this resolves — prevents premature redirects.
 *
 * 3. Multi-tab sync
 *    → Listens to the browser `storage` event.
 *    → If the user logs out in Tab A, Tab B detects the token removal
 *      and clears its user state automatically (no refresh needed).
 *
 * 4. Axios interceptor integration
 *    → api.ts handles 401s globally, but AuthContext stays the source of truth
 *      for user state — the two work together, not against each other.
 *
 * Limitations (require backend changes to fix):
 *    → Tokens are in localStorage (XSS risk). Fix: httpOnly cookies on the server.
 *    → No refresh token. Fix: Add POST /api/auth/refresh on the server.
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import api from "@/app/lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "creator" | "supporter" | "admin";
  credits: number;
  photoUrl: string | null;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  /** True during the initial /me check. Wait for false before redirecting. */
  isLoading: boolean;
  /** True once isLoading is false AND user is not null */
  isAuthenticated: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  /** Re-fetches /me — call after any action that changes user data (credits etc.) */
  refreshUser: () => Promise<void>;
}

// ─── Storage keys ─────────────────────────────────────────────────────────────
const TOKEN_KEY = "cf_token";
const USER_KEY = "cf_user";

// ─── Improvement 1: JWT expiry check ─────────────────────────────────────────
/**
 * Decode the JWT payload (middle segment) and check if `exp` is in the past.
 * JWTs are not encrypted — the payload is just base64-encoded JSON.
 * Your server signs with jwt.sign(payload, secret, { expiresIn: "7d" }).
 */
function isTokenExpired(token: string): boolean {
  try {
    // JWT format: header.payload.signature
    const payloadBase64 = token.split(".")[1];
    // atob decodes base64. Replace URL-safe chars first.
    const payload = JSON.parse(atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/")));
    // `exp` is Unix timestamp in SECONDS. Date.now() is in MILLISECONDS.
    // Add a 10-second buffer so we don't use a token that expires in the next second.
    return payload.exp * 1000 < Date.now() + 10_000;
  } catch {
    return true; // malformed token → treat as expired
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ── On app load: restore session ──────────────────────────────────────────
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);

    // No token at all → definitely logged out
    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    // Improvement 1: Check expiry BEFORE hitting the network
    if (isTokenExpired(storedToken)) {
      // Token is expired — clear it immediately, no server call needed
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setIsLoading(false);
      return;
    }

    // Token looks valid — verify with server and get fresh user data
    // (handles cases where user's role changed, account was deleted, etc.)
    setToken(storedToken);

    api
      .get<{ ok: boolean; user: AuthUser }>("/api/auth/me")
      .then(({ data }) => {
        setUser(data.user);
        // Keep localStorage in sync (credits etc. may have changed)
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      })
      .catch(() => {
        // 401 or network error → clear everything
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // ── Improvement 3: Multi-tab sync ─────────────────────────────────────────
  useEffect(() => {
    function onStorageChange(event: StorageEvent) {
      // Another tab removed the token (logged out)
      if (event.key === TOKEN_KEY && !event.newValue) {
        setUser(null);
        setToken(null);
      }
      // Another tab set a new token (logged in from another tab)
      if (event.key === TOKEN_KEY && event.newValue) {
        setToken(event.newValue);
        // Fetch fresh user data for this tab too
        api
          .get<{ ok: boolean; user: AuthUser }>("/api/auth/me")
          .then(({ data }) => setUser(data.user))
          .catch(() => { });
      }
    }

    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  // ── login ─────────────────────────────────────────────────────────────────
  const login = useCallback((newToken: string, newUser: AuthUser) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
    // Note: the `storage` event does NOT fire in the same tab that made the
    // change — it only fires in OTHER tabs. That's why we setUser() here directly.
  }, []);

  // ── logout ────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    // Removing TOKEN_KEY triggers the `storage` event in all OTHER tabs,
    // causing them to clear their user state too (multi-tab sync).
    setToken(null);
    setUser(null);
    window.location.href = "/";
  }, []);

  // ── refreshUser ───────────────────────────────────────────────────────────
  // Call this after any action that changes user data:
  //   - buying credits
  //   - updating profile/photo
  //   - admin changes user's role
  const refreshUser = useCallback(async () => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (!storedToken) return;
    try {
      const { data } = await api.get<{ ok: boolean; user: AuthUser }>("/api/auth/me");
      if (data.ok) {
        setUser(data.user);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      }
    } catch {
      // Network hiccup — keep existing state, don't log out
    }
  }, []);

  const isAuthenticated = !isLoading && user !== null;

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, isAuthenticated, login, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useAuth = (): AuthContextValue => {
  const contextValue = useContext(AuthContext);
  if (!contextValue) {
    throw new Error("useAuth must be called inside an AuthProvider");
  }
  return contextValue;
};