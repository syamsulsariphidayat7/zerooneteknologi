import type { Metadata } from "next";
import PortfolioDetailsContent from "@/components/PortfolioDetailsContent";

export const metadata: Metadata = {
  title: "Detail Portfolio — PT Zero One Teknologi",
};

export default function PortfolioDetailsPage() {
  return (
    <>
      <PortfolioDetailsContent />
    </>
  );
}
