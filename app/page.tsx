import ScrollProgress from "@/components/ScrollProgress";
import RevealOnScroll from "@/components/RevealOnScroll";
import Header from "@/components/Header";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import BackToTop from "@/components/BackToTop";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <RevealOnScroll />
      <Header />
      <About />
      <Services />
      <Portfolio />
      <Contact />
      <WhatsAppFloat />
      <BackToTop />
    </>
  );
}
