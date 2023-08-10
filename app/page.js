import Image from "next/image";
import "@/styles/landing/index.css";
import HeroSection from "@/component/landing/HeroSection";
import overlay1 from "@/assets/landing/creative-vibrant-grunge-watercolor-background-2.png";
import overlay2 from "@/assets/landing/creative-vibrant-grunge-watercolor-background-1.png";
import overlay3 from "@/assets/landing/creative-vibrant-grunge-watercolor-background-3.png";
import overlay5 from "@/assets/landing/creative-vibrant-grunge-watercolor-background-5.png";

import Header from "@/component/layout/Header";
import AboutusSection from "@/component/landing/AboutusSection";
import AllNeedSection from "@/component/landing/AllNeedSection";
export default function Home() {
  return (
    <div>
      <section className="relative hero-section">
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
      {/* ALL ONE NEED */}
      <AllNeedSection />
      {/* ALL ONE NEED */}

      {/*  */}
    </div>
  );
}
