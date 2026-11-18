import ScrollProgress from "@/components/ScrollProgress";
import RevealOnScroll from "@/components/RevealOnScroll";
import Header from "@/components/Header";
import About from "@/components/About";
import Resume from "@/components/Resume";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Credits from "@/components/Credits";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <RevealOnScroll />
      <Header />
      <About />
      <Resume />
      <Services />
      <Portfolio />
      <Contact />
      <Credits />
      <WhatsAppFloat />
    </>
  );
}
