/**
 * A single configured axios instance used for ALL API calls in this app.
 */

import axios, { AxiosError } from "axios";

const TOKEN_KEY = "cf_token";
const USER_KEY = "cf_user";

// ── Create the instance ───────────────────────────────────────────────────────
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
  timeout: 15_000, // 15 s — fail fast on network issues
});

// ── REQUEST interceptor ───────────────────────────────────────────────────────
// Runs before every outgoing request.
// Reads the token fresh from localStorage each time (handles token updates).
api.interceptors.request.use(
  (config) => {
    // Only run in the browser (not during Next.js server-side rendering)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── RESPONSE interceptor ──────────────────────────────────────────────────────
// Runs after every response (success or error).
api.interceptors.response.use(
  // ✅ Success (2xx) — pass through unchanged
  (response) => response,

  // ❌ Error — handle globally
  (error: AxiosError<{ ok: boolean; error: string }>) => {
    if (typeof window !== "undefined" && error.response?.status === 401) {
      // Token expired or invalid → clear everything + send to login
      // Don't redirect if we're already on an auth page (avoids redirect loop)
      const isAuthPage =
        window.location.pathname === "/login" ||
        window.location.pathname === "/register";

      if (!isAuthPage) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        window.location.href = "/login";
      }
    }

    // Extract the server's error message so callers get a clean Error object
    const serverMessage =
      error.response?.data?.error ??
      error.message ??
      "Something went wrong";

    return Promise.reject(new Error(serverMessage));
  }
);

export default api;
