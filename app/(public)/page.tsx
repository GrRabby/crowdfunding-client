// Home page — url: /
export default function HomePage() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "80dvh",
      flexDirection: "column",
      gap: "1rem",
    }}>
      <h1 style={{ fontSize: "2.5rem" }}>
        <span className="gradient-text">FundForward</span>
      </h1>
      <p style={{ color: "var(--text-secondary)" }}>
        Design system loaded ✅ — Navbar coming next
      </p>
    </div>
  );
}
