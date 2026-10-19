// (public) route group layout
// This wraps: / (home), /campaigns, /campaigns/[id]

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100dvh" }}>
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}
