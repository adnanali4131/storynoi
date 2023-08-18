"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import "@/styles/stories/index.css";
import overlay1 from "@/assets/stories/creative-vibrant-grunge-watercolor-background-1.png";
import overlay2 from "@/assets/landing/creative-vibrant-grunge-watercolor-background-1.png";
import overlay4 from "@/assets/stories/creative-vibrant-grunge-watercolor-background-5.png";
import Header from "@/components/layout/Header";
import SendIcon from "@/assets/stories/icons/send.svg";
import Lottie from "react-lottie";
import * as animationData from "@/assets/stories/book-loader.json";
import { SUMMARY } from "@/constants/index";
import downloadImage from "@/assets/stories/download.svg";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const Page = ({ params }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [prefChangesModal, setPrefChangesModal] = useState(false);
  const [storyUpdates, setStoryUpdates] = useState("");
  const [conversation, setConversation] = useState([]);

  const createStory = async (content) => {
    setData([]);
    setLoading(true);
    setLoadingText("Gathering Fairy Tale for Stories... ✨📜");
    setConversation((curr) => [...curr, { role: "user", content }]);

    const res = await (
      await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({
          messages: [...conversation, { role: "user", content }],
          id: searchParams.get("id"),
        }),
      })
    ).json();

    if (res) {
      console.log(res, "res");
      setData(
        res.data.map((el) => {
          return {
            heading: el.heading,
            description: el.description,
            image: el.image || "",
            imageText: "No image generated yet!",
          };
        })
      );
      setConversation((curr) => [
        ...curr,
        { role: "assistant", content: JSON.stringify(res) },
      ]);
      setLoading(false);
      router.push(`${pathname}?id=${res.id}`);
    }
  };

  useEffect(() => {
    createStory(params.title);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const fetchImages = async (storyData) => {
    const stories = [...storyData];
    const length = storyData?.length;
    stories.forEach((story) => {
      story.imageText = "Generating Pic...";
    });
    setData([...stories]);
    for (let i = 0; i < 1; i++) {
      if (stories[i].heading !== SUMMARY) {
        try {
          setData([...stories]);
          const res = await (
            await fetch("/api/imageGenerate", {
              method: "POST",
              body: JSON.stringify({
                summary: storyData.find((el) => el.heading === SUMMARY)
                  .description,
                description: stories[i].description,
              }),
            })
          ).json();
          if (res) {
            const imageBuffer = Buffer.from(
              res.images.artifacts[0].base64,
              "base64"
            );
            const generateImageURL = URL.createObjectURL(
              new Blob([imageBuffer])
            );

            stories[i].image = generateImageURL;
            stories[i].imageText = "";
            storeImgToS3(stories[i], res.images.artifacts[0].base64);
            setData([...stories]);
          }
        } catch (err) {
          stories[i].imageText = "Failed to generate pic";
          setData([...stories]);
        }
      }
    }
  };
  function storeImgToS3(storyObj, base64) {
    console.log(base64);
    fetch("/api/storage", {
      method: "POST",
      body: JSON.stringify({
        heading: storyObj.heading,
        base64,
        id: searchParams.get("id"),
      }),
    }).then((res) => {
      console.log(res, "res");
    });
  }
  return (
    <div>
      <section className="relative overflow-hidden hero-section h-[100vh] bg-mustard">
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
          className="absolute right-0 z-10 opacity-50 bottom-20"
        />
        <div className="relative z-10">
          <Header />
          {/* <HeroSection /> */}
          <div className="relative overflow-hidden">
            <div className="mx-auto custom_container ">
              <div className="h-[100vh] w-[90%] mx-auto flex flex-col z-20  rounded-xl bg-cultured shadow-sm">
                <div className="h-[80vh]  py-10 px-5 ">
                  <div className="flex flex-col h-full px-5 py-2 overflow-auto content-container gap-9">
                    {data.length > 0 &&
                      !loading &&
                      data.map(
                        (el) =>
                          el.heading !== SUMMARY && (
                            <>
                              <div
                                key={el.heading}
                                className="flex items-center gap-5 text-black bg-white shadow-sm rounded-xl"
                              >
                                <div className="w-full flex-1 h-[500px] flex overflow-hidden  justify-center items-center flex-col shadow-[10px 4px 12px 0px #0000001F]">
                                  {el.image ? (
                                    <Image
                                      src={el.image}
                                      alt={el.heading}
                                      width={100}
                                      height={100}
                                      className="w-[100%]"
                                    />
                                  ) : (
                                    <div className="flex items-center justify-center gap-4 flex-col w-full h-[100%]">
                                      <Image
                                        src={downloadImage}
                                        alt="download"
                                      />
                                      {el.imageText.length > 0 ? (
                                        <p className="text-lg leading-7 text-center ">
                                          {el.imageText}
                                        </p>
                                      ) : null}
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="h-[500px] items-center p-4 flex justify-center flex-col">
                                    <h2 className="text-[24px] font-semibold">
                                      {el.heading}
                                    </h2>
                                    <p className="text-lg leading-7 text-center">
                                      {el.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </>
                          )
                      )}
                    {loading && !data.length && (
                      <div className="flex flex-col w-full h-[100%]">
                        <Lottie
                          options={defaultOptions}
                          isPaused={false}
                          isStopped={false}
                          width={400}
                        />
                        <p className="-mt-[150px] text-lg leading-7 text-center">
                          {loadingText}
                        </p>
                      </div>
                    )}
                    {!loading && <div className="w-full h-[100%]"></div>}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[100%] z-30 h-[90px] bottom-[90px] absolute  bg-crayola-sky-blue">
              <div className="custom_container mx-auto w-[100%] h-[100%] flex  items-center">
                <div className="px-14 w-[100%]">
                  <div className="bg-white p-2 w-[100%] rounded-lg flex gap-2 justify-between">
                    {}
                    <div className="flex flex-1">
                      {!prefChangesModal && (
                        <button
                          className="w-full p-2 rounded-lg bg-crayola-sky-blue"
                          onClick={() => {
                            console.log("trigger");
                            setPrefChangesModal(true);
                          }}
                        >
                          Prefer any changes
                        </button>
                      )}
                      {prefChangesModal && (
                        <div className="flex w-[100%]">
                          <input
                            className="p-3 w-[100%] text-xs rounded-lg outline-none "
                            placeholder="Share your idea to start the book creation"
                            type="text"
                            value={storyUpdates}
                            onChange={(e) => setStoryUpdates(e.target.value)}
                          />
                          <button
                            className="p-[10px] rounded-lg bg-crayola-sky-blue"
                            onClick={async () =>
                              await createStory(storyUpdates)
                            }
                          >
                            <Image src={SendIcon} alt={"send-icon"} />
                          </button>
                        </div>
                      )}
                    </div>
                    <button
                      className={` p-2 text-white rounded-lg bg-rose-pink ${
                        !prefChangesModal && "flex-1"
                      }`}
                      onClick={async () => await fetchImages(data)}
                    >
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

export default Page;
