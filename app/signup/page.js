"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";

import overlay1 from "@/assets/stories/creative-vibrant-grunge-watercolor-background-1.png";
import overlay2 from "@/assets/landing/creative-vibrant-grunge-watercolor-background-1.png";
import overlay3 from "@/assets/landing/creative-vibrant-grunge-watercolor-background-3.png";
import overlay5 from "@/assets/auth/signup/lower-cushions.svg";
import signup1 from "@/assets/auth/signup/signup1.png";
import signup2 from "@/assets/auth/signup/signup2.png";
import vector from "@/assets/auth/signup/Vector.svg";
import wave from "@/assets/auth/signup/wave.svg";
import dots from "@/assets/auth/signup/dots.svg";
import glasses from "@/assets/auth/signup/glasses.svg";
import bear from "@/assets/auth/signup/bear.svg";
import Logo from "@/assets/logo.png";
import frame from "@/assets/auth/signup/Frame.svg";

import Signup from "@/components/signup/Signup";
import Link from "next/link";

const Page = () => {

  return (
    <div className="relative">
      <section className="relative overflow-hidden hero-section h-[100vh] bg-crayola-sky-blue">
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
          src={dots}
          alt={"bg-overlay-1"}
          width={200}
          className="absolute bottom-0 z-10 left-[350px] top-[160px] "
        />
        <Image
          src={bear}
          alt={"bg-overlay-1"}
          width={80}
          className="absolute bottom-0 z-10 left-[240px] bottom-[110px] "
        />
        <Image
          src={glasses}
          alt={"bg-overlay-1"}
          width={40}
          className="absolute bottom-0 z-10 left-[100px] top-[110px] "
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
        <div className=" flex justify-between items-center">
          <div className="flex-1 justify-between items-center">
            <div className="flex ml-[100px]">
              <div>
                <div className="rounded-lg">
                  <Image src={signup2} alt="Signup Image 2" width={320} height={320} className="rounded-lg" />
                </div>
                <div className="relative">
                  <div className="mt-[-25px] ml-[-19px] bg-white w-20 h-20 absolute top-0 left-0 transform rotate-45 rounded-lg"></div>
                  <div className="absolute mt-[-25px] ml-[-20px] top-0 left-0 w-20 h-20 flex items-center justify-center">
                    <Image src={frame} alt="Frame" width={50} height={50} />
                  </div>
                </div>
              </div>
              <div>
                <div className="ml-4 my-6 mb-12 rounded-lg">
                  <Image src={signup1} alt="Signup Image 1" width={160} height={160} className="rounded-lg" />
                </div>
                <div className="relative mt-[-40px] ml-[-14px]">
                  <div className=" bg-gray w-[250px] mt-3 h-[140px] rounded-lg ml-[-25px]">
                    <div className="absolute bg-crayola-sky-blue mx-5 mt-4 py-3 px-4 rounded-lg">
                      <div className="flex">
                        <Image src={wave} alt="Frame" width={10} height={10} /> <span className="text-[12px] ml-1"> I - “Hello! Share your Idea”</span>
                      </div>
                    </div>
                    <div className="absolute mt-20 py-1 px-2 rounded-lg ml-12">
                      <div className="bg-white py-4 px-2 rounded-lg flex">
                        < Image src={vector} alt="Frame" width={10} height={10} /> <span className="text-[10px] ml-1">User - “Bella loves fairy- tales”</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1  ml-[280px] mt-[-50px]">
            <Signup
              width="440px"
            />
          </div>
        </div>

      </div>
    </div >
  );
};

export default Page;
