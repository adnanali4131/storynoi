import React from "react";
import Image from "next/image";

import overlay1 from "@/assets/stories/creative-vibrant-grunge-watercolor-background-1.png";
import overlay2 from "@/assets/landing/creative-vibrant-grunge-watercolor-background-1.png";
import overlay3 from "@/assets/landing/creative-vibrant-grunge-watercolor-background-3.png";
import overlay4 from "@/assets/auth/forgot/leftcenter.svg";
import overlay5 from "@/assets/auth/signup/lower-cushions.svg";
import overlay6 from "@/assets/auth/forgot/rightcenter.svg";
import overlay7 from "@/assets/auth/forgot/upper.png";

import Logo from "@/assets/logo.png";
import Link from "next/link";
import Forgot from "@/components/forgot/Forgot";


const Page = () => {
  return (
    <div className="relative">
      <section className="relative overflow-hidden hero-section h-[100vh] bg-mustard">
        <Image
          src={overlay1}
          alt={"bg-overlay-1"}
          width={90}
          className="absolute top-[40%] left-0 z-20"
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

        <Image
          src={overlay7}
          alt={"bg-overlay-1"}
          width={200}
          className="absolute top-0 z-10 right-12"
        />
        <Image
          src={overlay6}
          alt={"bg-overlay-1"}
          width={200}
          className="absolute top-[370px] z-10 left-[310px]"
        />
        <Image
          src={overlay4}
          alt={"bg-overlay-1"}
          width={100}
          className="absolute top-[200px] z-10 right-[300px]"
        />
      </section>

      <div className="absolute top-0 left-0 w-[100vw] h-[100vh] z-30 ">
        <div className="py-10 custom_container mx-auto">
          <div className="flex items-center justify-between">
            <div className="logo">
              <Link href={"/"}>
                {" "}
                <Image src={Logo} alt="logo" width={100} />
              </Link>
            </div>

          </div>
        </div>
        <div className="flex justify-center">
          <div className="  ">
            <Forgot width="540px" />
          </div>
        </div>

      </div>
    </div >
  );
};

export default Page;
