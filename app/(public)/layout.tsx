// (public) route group layout
// This wraps: / (home), /campaigns, /campaigns/[id]
import Navbar from "@/app/components/Navbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100dvh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}
