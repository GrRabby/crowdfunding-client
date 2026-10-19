import type { Metadata } from "next";
import HeroSection from "@/app/components/home/HeroSection";
import TopCampaigns from "@/app/components/home/TopCampaigns";
import HowItWorks from "@/app/components/home/HowItWorks";
import StatsSection from "@/app/components/home/StatsSection";
import Testimonials from "@/app/components/home/Testimonials";
import JoinCTA from "@/app/components/home/JoinCTA";

export const metadata: Metadata = {
  title: "FundForward — Crowdfunding for Changemakers",
  description:
    "Discover and back campaigns that create real change. FundForward connects creators with supporters through a transparent, credit-based crowdfunding platform.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TopCampaigns />
      <HowItWorks />
      <StatsSection />
      <Testimonials />
      <JoinCTA />
    </>
  );
}
