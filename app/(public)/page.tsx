// Home page placeholder — url: /
// Will be replaced with the full hero + sections in the Home Page step

export default function HomePage() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "1rem",
      minHeight: "80dvh",
      background: "#f9fafb",
    }}>
      <h1 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 800,
        fontSize: "2.5rem",
        letterSpacing: "-0.03em",
        color: "#0f0a1e",
      }}>
        Navbar done ✅
      </h1>
      <p style={{ color: "#6b7280", fontSize: "1rem" }}>
        Building <strong style={{ color: "#6d28d9" }}>Auth Context + Login</strong> next
      </p>
    </div>
  );
}
