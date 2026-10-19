import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { AuthProvider } from "@/app/context/AuthContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FundForward — Crowdfunding for Changemakers",
    template: "%s | FundForward",
  },
  description:
    "FundForward connects passionate creators with supporters who believe in real change. Back campaigns, earn rewards, and bring ideas to life.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakartaSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#fff",
              color: "#111827",
              border: "1px solid #e5e7eb",
              fontFamily: "Inter, sans-serif",
            },
          }}
          richColors
        />
      </body>
    </html>
  );
}

