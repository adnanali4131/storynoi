import Image from "next/image";
import "@/styles/landing/index.css";
import overlay1 from "@/assets/stories/creative-vibrant-grunge-watercolor-background-1.png";
import overlay2 from "@/assets/landing/creative-vibrant-grunge-watercolor-background-1.png";
import overlay4 from "@/assets/stories/creative-vibrant-grunge-watercolor-background-5.png";
import Header from "@/components/layout/Header";
const page = () => {
  return (
    <div>
      <section className="relative hero-section h-[100vh] bg-mustard">
        <div className="bg-overlay-net"></div>
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
          src={overlay4}
          alt={"bg-overlay-1"}
          width={150}
          className="absolute bottom-20 z-10 right-0 opacity-50"
        />
        <div className="relative z-10">
          <Header />
          {/* <HeroSection /> */}
          <div className="relative">
            <div className="custom_container mx-auto ">
              <div className="h-[100vh] flex flex-col z-20 w-full rounded-xl bg-cultured shadow-sm">
                <div className="h-[80vh] py-10 px-5 ">
                  <div className="h-full overflow-auto px-5 py-2 content-container flex gap-9 flex-col">
                    {[1].map((el) => (
                      <div className="text-black p-10 bg-white rounded-xl shadow-sm flex flex-col gap-5">
                        <h2 className="text-[24px] font-semibold">
                          Mama Get New Skates: A Heartwarming Story About
                          Parenthood
                        </h2>
                        <p className="leading-7 text-lg">
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </div>
                    ))}
                    <div className="w-full h-[100px]"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[100%] z-30 h-[90px] bottom-[90px] absolute  bg-crayola-sky-blue">
              <div className="custom_container mx-auto w-[100%] h-[100%] flex  items-center">
                <div className="px-14 w-[100%]">
                  <div className="bg-white p-2 w-[100%] rounded-lg flex gap-2 justify-between">
                    <button className="bg-crayola-sky-blue rounded-lg flex-1 p-2 ">
                      Prefer any changes
                    </button>
                    <button className="text-white text-sm flex-1 p-2 bg-dark-orange rounded-lg">
                      Generate pics
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
