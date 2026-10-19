// (auth) route group layout
// Wraps: /login, /register

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: "100dvh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(ellipse at 30% 20%, rgba(92,110,248,0.12) 0%, transparent 60%), var(--bg-base)",
      padding: "1.5rem",
    }}>
      {children}
    </div>
  );
}
