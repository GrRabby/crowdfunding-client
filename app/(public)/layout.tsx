import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

// Public route group: /, /campaigns, /campaigns/[id]
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
