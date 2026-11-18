import type { Metadata } from "next";
import PortfolioDetailsContent from "@/components/PortfolioDetailsContent";
import Credits from "@/components/Credits";

export const metadata: Metadata = {
  title: "Portfolio Details - Personal Bootstrap Template",
};

export default function PortfolioDetailsPage() {
  return (
    <>
      <PortfolioDetailsContent />
      <Credits />
    </>
  );
}
