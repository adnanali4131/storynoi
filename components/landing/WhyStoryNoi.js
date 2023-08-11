import Image from "next/image";
import girl4 from "@/assets/landing/girl-4.svg";
import girl5 from "@/assets/landing/girl-5.svg";
import check from "@/assets/landing/icon/check.svg";
import bgOverlay1 from "@/assets/landing/creative-vibrant-grunge-watercolor-background-1.png";
import bgOverlay3 from "@/assets/landing/creative-vibrant-grunge-watercolor-background-7.png";
import bgOverlay2 from "@/assets/landing/creative-vibrant-grunge-watercolor-background-8.png";
const WhyStoryNoi = () => {
  return (
    <section className="relative overflow-hidden all-one-need-section bg-mustard">
      <Image
        src={bgOverlay1}
        alt={"bg-overlay-1-why-storynoi"}
        width={80}
        className="absolute top-0 right-0 z-10"
      />
      <Image
        src={bgOverlay2}
        alt={"bg-overlay-2-why-storynoi"}
        width={350}
        className="absolute top-0 left-[15%] z-10 opacity-50"
      />
      <Image
        src={bgOverlay3}
        alt={"bg-overlay-3-why-storynoi"}
        width={120}
        className="absolute bottom-20 left-0 z-10"
      />
      <div className="relative z-10 py-20">
        <div className="custom_container mx-auto">
          <div className="flex items-start justify-between flex-row-reverse">
            <div className="flex flex-col items-baseline justify-center flex-1 w-[50%] ">
              <p className="text-xl font-normal">Why</p>
              <h2 className="text-[42px] font-extrabold">StoryNoi</h2>
              <div className="flex flex-col gap-5 mt-5">
                <p className="leading-7 tex-sm">
                  Create Stories About Anything You Can Imagine. Create & Share
                  Your Stories With Friends And Family Through Social Media.
                  Publish Your Stories Online Or Turn Your Stories Into Books.
                  It Is The Perfect Tool For Anyone Who Loves To Create Stories.
                  It's Easy To Use, Affordable, And Fun. So What Are You Waiting
                  For? Start Creating Your Own Stories Today!
                </p>
                <p className="leading-7 tex-sm font-semibold">
                  Here Are Some Additional Benefits Of Using Storynoi:
                </p>
                <ul className="flex items-start gap-5 flex-col">
                  <li className="flex items-start gap-4">
                    <Image src={check} alt="check-1" className="mt-2" />
                    <p className="leading-7 tex-sm">
                      It's A Great Way To Relax And Have Fun.
                    </p>
                  </li>
                  <li className="flex items-start gap-4">
                    <Image src={check} alt="check-1" className="mt-2" />
                    <p className="leading-7 tex-sm">
                      It's A Great Way To Express Your Creativity.
                    </p>
                  </li>
                  <li className="flex items-start gap-4">
                    <Image src={check} alt="check-1" className="mt-2" />
                    <p className="leading-7 tex-sm">
                      It's A Great Way To Learn About Different Cultures And
                      Perspectives.
                    </p>
                  </li>
                  <li className="flex items-start gap-4">
                    <Image src={check} alt="check-1" className="mt-2" />
                    <p className="leading-7 tex-sm">
                      It's A Great Way To Connect With Other People Who Love To
                      Create Stories.
                    </p>
                  </li>
                  <li className="flex items-start gap-4">
                    <Image src={check} alt="check-1" className="mt-2" />
                    <p className="leading-7 tex-sm">
                      If You're Looking For A Way To Unleash Your Creativity,
                      Connect With Other People, Or Learn
                    </p>
                  </li>
                  <li className="flex items-start gap-4">
                    <Image src={check} alt="check-1" className="mt-2" />
                    <p className="leading-7 tex-sm">
                      About Different Cultures, Then Storynoi Is The Perfect
                      Tool For You.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex-1 flex justify-start gap-10 items-end">
              <Image src={girl4} alt="girl-4" width={150} className="mb-20" />
              <Image src={girl5} alt="girl-5" width={300} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyStoryNoi;
