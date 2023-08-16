import Image from "next/image";
import girl3 from "@/assets/landing/baby-girl-3.svg";
import bgOverlay1 from "@/assets/landing/all-need-overlay-1.png";
import bgOverlay2 from "@/assets/landing/all-need-overlay-2.png";
const AllNeedSection = () => {
  return (
    <section className="relative overflow-hidden all-one-need-section bg-rose-pink">
      <div className="bg-overlay-net"></div>
      <Image src={bgOverlay1} className="absolute left-0 top-16" width={70} />
      <div className="relative z-10 ">
        <div className="custom_container mx-auto">
          <div className="flex items-start justify-between">
            <div className="flex py-20 flex-col items-baseline justify-center flex-1 w-[50%] ">
              <p className="text-xl font-normal">All One Needs Is An Idea!</p>
              <h2 className="text-[42px] font-extrabold">
                AI Personalized Stories
              </h2>
              <div className="flex flex-col gap-5 mt-5">
                <p className="leading-7 tex-sm">
                  All You Need To Do Is Start By Giving The App A Few Prompts.
                  These Prompts Can Be Anything From A Simple Setting To A
                  Complex Character. Once You've Given The App Some Prompts, It
                  Will Start Generating A Story. You Can Then Follow Along As
                  The Story Unfolds, Or You Can Even Take Control Of The Story
                  And Make Your Own Choices.
                </p>
                <p className="leading-7 tex-sm">
                  You Can Create Stories About Anything You Can Imagine. You Can
                  Create Stories About Your Favorite Characters, Your Favorite
                  Places, Or Even Your Own Lif.
                </p>
              </div>
            </div>
            <div className="flex-[1.5]">
              <Image
                src={bgOverlay2}
                className="absolute bottom-20 left-[50%] -translate-x-[-50%] "
              />
              <Image
                src={girl3}
                alt="girl3"
                width={600}
                className="mb-14 absolute  top-0 right-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllNeedSection;
