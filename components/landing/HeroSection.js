"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Star from "@/assets/landing/icon/star.svg";
import overlay6 from "@/assets/landing/creative-vibrant-grunge-watercolor-background-6.png";
import girl1 from "@/assets/landing/baby-girl-1.svg";
import handIcon from "@/assets/landing/icon/hand.svg";
import botIcon from "@/assets/landing/icon/bot.svg";
import downloadIcon from "@/assets/landing/icon/download.svg";
import userIcon from "@/assets/landing/icon/user.svg";
import overlay4 from "@/assets/landing/creative-vibrant-grunge-watercolor-background-4.png";
const HeroSection = () => {
  const router = useRouter();
  const [storyTitle, setStoryTitle] = useState("");
  const handleCreateStory = () => {
    router.push(`/story/${storyTitle}`);
  };
  return (
    <div className="py-20">
      <div className="custom_container mx-auto">
        <div className="flex justify-between">
          <div className="relative flex items-center flex-1 text-content">
            <Image
              src={overlay6}
              alt={"bg-overlay-1"}
              width={80}
              className="absolute top-0 z-10 left-[50%]"
            />
            <div className="relative w-3/4">
              <Image
                src={overlay4}
                alt="overlay-4"
                width={80}
                className="absolute top-[63%] left-[30%] z-10"
              />
              <h2 className="text-[42px] font-extrabold">
                Let Gen - AI Turn Your Idea to a{" "}
                <span className="text-dark-orange">kid’s Book!</span>{" "}
              </h2>
              <p className="mt-10 text-xl font-normal">
                Express your idea in a few words!
              </p>
              <div className="relative z-20 flex items-center justify-between gap-1 p-2 mt-5 bg-white shadow-sm rounded-2xl">
                <input
                  className="flex-1 p-3 text-xs rounded-lg outline-none"
                  placeholder="Share your idea to start the book creation"
                  type="text"
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleCreateStory}
                  className="px-5 py-3 text-sm font-medium outline-none text-white rounded-lg bg-dark-orange"
                >
                  Create Story
                </button>
              </div>
              <div className="flex justify-between mt-10 numbers">
                <div className="flex-1 downloads">
                  <p className="font-bold text-md">Downloads</p>
                  <h2 className="text-[42px] font-extrabold">12 000</h2>
                </div>
                <div className="flex-1 assessment">
                  <p className="font-bold text-md">Assessment</p>
                  <h2 className="text-[42px] font-extrabold flex items-baseline gap-2">
                    4.8{" "}
                    <span>
                      <Image src={Star} width={25} alt="assesment" />
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex justify-end flex-1 image-content w-100">
            <div className="relative w-[100%]">
              <div className="absolute -right-10 flex flex-col items-center gap-3 top-[50%] -translate-y-[50%] ">
                <div className="flex items-center justify-center w-12 h-12 rotate-45 bg-white rounded-lg shadow-sm bot-icon">
                  <Image
                    src={botIcon}
                    alt="bot-icon"
                    width={25}
                    className="-rotate-45"
                  />
                </div>
                <div className="w-[2px] h-[35px] rounded-xl opacity-10 bg-black line-bar"></div>
                <div className="p-4 bg-alice-blue rounded-2xl shadow-sm flex-col gap-4 chat-box w-[250px] flex justify-end items-end">
                  <div className="flex items-center gap-2  shadow-sm rounded-xl p-3 bg-crayola-sky-blue w-[100%]">
                    <Image src={handIcon} width={15} alt="hand-icon" />
                    <p className="text-xs">AI - “Hello! Share your Idea”</p>
                  </div>
                  <div className="flex items-start gap-2 p-3  rounded-xl bg-white shadow-sm w-[80%]">
                    <Image src={userIcon} width={15} alt="hand-icon" />
                    <p className="text-xs">
                      User - “Ethan is afraid of the dark””
                    </p>
                  </div>
                  <div className="flex items-center shadow-sm gap-2  rounded-xl p-3 bg-crayola-sky-blue w-[100%]">
                    <p className="text-xs">Sure! - “Here is your story!</p>
                  </div>
                </div>
                <div className="w-[2px] h-[35px] rounded-xl opacity-10 bg-black line-bar"></div>
                <div className="flex items-center justify-center w-12 h-12 rotate-45 bg-white rounded-lg shadow-sm bot-icon">
                  <Image
                    src={downloadIcon}
                    alt="bot-icon"
                    width={25}
                    className="-rotate-45"
                  />
                </div>
              </div>
            </div>
            <Image
              src={girl1}
              alt="baby-girl-1"
              className="mr-10"
              width={370}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
