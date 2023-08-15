"use client";
import { useEffect, useState } from "react";

import Image from "next/image";
import "@/styles/stories/index.css";
import overlay1 from "@/assets/stories/creative-vibrant-grunge-watercolor-background-1.png";
import overlay2 from "@/assets/landing/creative-vibrant-grunge-watercolor-background-1.png";
import overlay4 from "@/assets/stories/creative-vibrant-grunge-watercolor-background-5.png";
import Header from "@/components/layout/Header";
const page = ({ params }) => {
  const [data, setData] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const [changes, setChanges] = useState("");

  const createStory = async (content) => {
    setConversation((curr) => [...curr, { role: "user", content }]);

    const res = await (
      await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({
          messages: [...conversation, { role: "user", content }],
        }),
      })
    ).json();
    console.log(res);
    if (res) {
      setData([...res]);
      setConversation((curr) => [
        ...curr,
        { role: "assistant", content: JSON.stringify(res) },
      ]);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    createStory(params.title);
  }, []);
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
                    {data.length > 0 &&
                      data.map((el) => (
                        <div className="text-black p-10 bg-white rounded-xl shadow-sm flex flex-col gap-5">
                          <h2 className="text-[24px] font-semibold">
                            {el.heading}
                          </h2>
                          <p className="leading-7 text-lg">{el.description}</p>
                        </div>
                      ))}
                    {loading && (
                      <div className="w-[100%] h-[100%] flex justify-center items-center">
                        <div class="loader"></div>
                      </div>
                    )}
                    <div className="w-full h-[100px]"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[100%] z-30 h-[90px] bottom-[90px] absolute  bg-crayola-sky-blue">
              <div className="custom_container mx-auto w-[100%] h-[100%] flex  items-center">
                <div className="px-14 w-[100%]">
                  <div className="bg-white p-2 w-[100%] rounded-lg flex gap-2 justify-between">
                    <input
                      value={changes}
                      onChange={(event) => setChanges(event.target.value)}
                    />
                    <button
                      onClick={() => createStory(changes)}
                      className="bg-crayola-sky-blue rounded-lg flex-1 p-2 "
                    >
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
