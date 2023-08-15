import Image from "next/image";
import "@/styles/landing/index.css";
import HeroSection from "@/components/landing/HeroSection";
import overlay1 from "@/assets/landing/creative-vibrant-grunge-watercolor-background-2.png";
import overlay2 from "@/assets/landing/creative-vibrant-grunge-watercolor-background-1.png";
import overlay3 from "@/assets/landing/creative-vibrant-grunge-watercolor-background-3.png";
import overlay5 from "@/assets/landing/creative-vibrant-grunge-watercolor-background-5.png";

import Header from "@/components/layout/Header";
import AboutusSection from "@/components/landing/AboutusSection";
import AllNeedSection from "@/components/landing/AllNeedSection";
import WhyStoryNoi from "@/components/landing/WhyStoryNoi";
import CreateEbook from "@/components/landing/CreateEbook";
import Footer from "@/components/layout/Footer";
export default function Home() {
  return (
    <div>
      <section className="relative hero-section bg-mustard">
        <div className="bg-overlay-net"></div>
        <Image
          src={overlay1}
          alt={"bg-overlay-1"}
          width={80}
          className="absolute top-0 left-0 z-10"
        />
        <Image
          src={overlay2}
          alt={"bg-overlay-1"}
          width={80}
          className="absolute top-0 right-0 z-10"
        />
        <Image
          src={overlay3}
          alt={"bg-overlay-1"}
          width={80}
          className="absolute bottom-0 left-0 z-10"
        />
        <Image
          src={overlay5}
          alt={"bg-overlay-1"}
          width={400}
          className="absolute bottom-0 z-10 right-12"
        />
        <div className="relative z-10">
          <Header />
          <HeroSection />
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <AboutusSection />
      {/* ABOUT US SECTION */}
      {/* ALL ONE NEED SECTION */}
      <AllNeedSection />
      {/* ALL ONE NEED SECTION */}

      {/* WHY STORYNOI SECTION */}
      <WhyStoryNoi />
      {/* WHY STORYNOI SECTION */}
      {/* CREATE EBOOK SECTION */}
      <CreateEbook />
      {/* CREATE EBOOK SECTION */}
      {/* FOOTER SECTION */}
      <Footer />
      {/* FOOTER SECTION */}
    </div>
  );
}
