"use client";
import { useContext, useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Lottie from "react-lottie";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

import "@/styles/stories/index.css";
import LocalStorage from "@/lib/integration/localstorage";

import overlay1 from "@/assets/stories/creative-vibrant-grunge-watercolor-background-1.png";
import overlay2 from "@/assets/landing/creative-vibrant-grunge-watercolor-background-1.png";
import overlay4 from "@/assets/stories/creative-vibrant-grunge-watercolor-background-5.png";
import overlay5 from "@/assets/landing/creative-vibrant-grunge-watercolor-background-2.png";
import Header from "@/components/layout/Header";
import SendIcon from "@/assets/stories/icons/send.svg";

import * as animationData from "@/assets/stories/book-loader.json";
import { SUMMARY } from "@/constants/index";
import downloadImage from "@/assets/stories/download.svg";

import Modal from "@/components/global/modal/Modal";
import Select from "@/components/global/select/Select";
import Cartoon from "@/assets/stories/icons/cartoon.svg";
import Anime from "@/assets/stories/icons/anime.svg";
import Art from "@/assets/stories/icons/art.svg";
import Fantasy from "@/assets/stories/icons/fantasy.svg";
import Close from "@/assets/stories/icons/close.svg";
import Login from "@/components/login/Login";
import { AuthContext } from "@/components/contexts/Auth";
import jwt_decode from "jwt-decode";
const selectList = [
  {
    id: 1,
    name: "Fantasy",
    value: "fantasy-art",
    avatar: Fantasy,
  },
  {
    id: 2,
    name: "Art",
    value: "digital-art",
    avatar: Art,
  },
  {
    id: 3,
    name: "Anime",
    value: "anime",
    avatar: Anime,
  },
  {
    id: 4,
    name: "Cartoon",
    value: "comic-book",
    avatar: Cartoon,
  },
];
const Page = ({ params }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [prefChangesModal, setPrefChangesModal] = useState(false);
  const [storyUpdates, setStoryUpdates] = useState("");
  const [printModal, setPrintModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(selectList[3]);
  const [downloadModal, setDownloadModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [conversation, setConversation] = useState([]);
  const { state, dispatch } = useContext(AuthContext);
  const storage = new LocalStorage();
  const toggleDownloadModal = () => {
    setDownloadModal(!downloadModal);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const toggleLoginModal = () => {
    setLoginModal(!loginModal);
  };

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
      const formattedState = res.data.map((el) => {
        let url =
          (res.story.imageUrl &&
            res.story.imageUrl.length > 0 &&
            res.story.imageUrl?.find(
              (storyData) => storyData.heading === el.heading
            )) ||
          "";
        if (!state.isAuthenticated) {
          const fetchStorageImage = storage.get("img");
          if (fetchStorageImage) {
            if (
              fetchStorageImage.heading === el.heading &&
              params.title === fetchStorageImage.title
            )
              url = fetchStorageImage;
          }
        }
        return {
          heading: el.heading,
          description: el.description,
          image: url.url,
          imageText: "No image generated yet!",
        };
      });
      if (res.story && res.story.imageUrl && res.story.imageUrl.length > 6) {
        setPrintModal(true);
      }
      setData(formattedState);
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
    if (!state.isAuthenticated) {
      if (!storage.get("userId")) {
        const userId = uuidv4();
        storage.set("userId", userId);
      }
    }
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
    const length = state.isAuthenticated ? storyData?.length : 1;
    stories.forEach((story, index) => {
      story.imageText = "Generating illustration...";
    });
    setData([...stories]);
    for (let i = 0; i < length; i++) {
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
                style: selectedGenre.value,
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
            storeImgToS3(
              stories[i],
              res.images.artifacts[0].base64,
              updateImageUrl
            );
            setData([...stories]);
            setLoginModal(true);
            if (
              res.story &&
              res.story.imageUrl &&
              res.story.imageUrl.length > 6
            ) {
              setPrintModal(true);
            }
          }
        } catch (err) {
          stories[i].imageText = "Failed to generate illustration";
          setData([...stories]);
        }
      }
    }
    setLoading(false);
  };
  function storeImgToS3(storyObj, base64, updateImageUrl) {
    fetch("/api/storage", {
      method: "POST",
      body: JSON.stringify({
        heading: storyObj.heading,
        base64,
        id: searchParams.get("id"),
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((res) => {
        updateImageUrl(storyObj, res);
      });
  }

  function updateImageUrl(storyObj, res) {
    let storyState = [...data];
    storyState = storyState.map((story) => {
      if (story.heading === storyObj.heading) {
        story.image = res.url;
        return story;
      } else return story;
    });
    if (!state.isAuthenticated) {
      storage.set("img", {
        heading: storyObj.heading,
        url: res.url,
        title: params.title,
      });
    }

    setData(storyState);
  }
  async function generateAndDownloadPDF() {
    const response = await fetch("/api/generate-pdf", {
      method: "POST",
      body: JSON.stringify({
        storyContent: data,
      }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "story.pdf";
      link.click();
      setDownloadModal(false);
    }
  }
  useEffect(() => {
    // Check for token
    if (storage.get("jwtToken")) {
      // Set auth token header auth
      // setAuthToken(localStorage.jwtToken);
      // Decode token and get user info and exp
      const decoded = jwt_decode(storage.get("jwtToken"));
      // Set user and isAuthenticated
      dispatch({ type: "SET_CURRENT_USER", payload: decoded });

      // Check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        dispatch({ type: "USER_LOGOUT" });
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      const length = data
        .map((story) => story.image)
        .filter(
          (img) => img !== null && img !== "" && img !== undefined
        ).length;
      if (length > 5) {
        setPrintModal(true);
      }
    }
  }, [data]);

  const handleLoginCb = async () => {
    const token = storage.get("jwtToken");
    if (token) {
      const res = await (
        await fetch("/api/story", {
          method: "POST",
          body: JSON.stringify({
            title: params.title,
          }),
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
      ).json();
      if (res) {
        router.push(`${pathname}?id=${res.id}`);
      }
    }
  };

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
                                    {["Title", "Moral"].includes(el.heading) ? (
                                      <h2 className="text-[24px] font-semibold">
                                        {el.heading}
                                      </h2>
                                    ) : null}
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
                  {!printModal ? (
                    <div className="bg-white p-2 w-[100%] rounded-lg flex gap-2 justify-between">
                      <div className="flex flex-1">
                        {!prefChangesModal && (
                          <button
                            className="w-full p-2 rounded-lg bg-crayola-sky-blue"
                            onClick={() => {
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
                              onBlur={() => setPrefChangesModal(false)}
                              onChange={(e) => setStoryUpdates(e.target.value)}
                            />
                            <button
                              className="p-[10px] rounded-lg bg-crayola-sky-blue"
                              onClick={async () =>
                                await createStory(storyUpdates)
                              }
                            >
                              <Image
                                src={SendIcon}
                                alt={"send-icon"}
                                onClick={async () =>
                                  await createStory(storyUpdates)
                                }
                              />
                            </button>
                          </div>
                        )}
                      </div>
                      <button
                        className={` p-2 text-white rounded-lg bg-dark-orange ${
                          !prefChangesModal && "flex-1"
                        }`}
                        onClick={() => (data.length > 0 ? toggleModal() : null)}
                      >
                        Generate pics
                      </button>
                    </div>
                  ) : (
                    <div className="bg-white p-2 w-[100%] rounded-lg flex gap-2 justify-between">
                      <div className="flex flex-1">
                        <button
                          className="w-full p-2 rounded-lg bg-crayola-sky-blue"
                          onClick={() => setDownloadModal(true)}
                        >
                          Download ebook
                        </button>
                      </div>
                      <button
                        className={` p-2 text-white rounded-lg bg-dark-orange ${
                          !prefChangesModal && "flex-1"
                        }`}
                      >
                        Print the book
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal
        toggleModal={toggleModal}
        isModalOpen={isModalOpen}
        background="bg-black"
        width="400px"
        padding="p-6"
        id="genreModal"
      >
        <div className="flex flex-col items-center justify-center w-full gap-5">
          <Select
            selected={selectedGenre}
            setSelected={setSelectedGenre}
            list={selectList}
          />
          <button
            type="button"
            onClick={async () => {
              toggleModal();
              await fetchImages(data);
            }}
            className="py-2 text-sm font-medium text-white rounded-lg shadow outline-none px-7 bg-dark-orange"
          >
            Generate
          </button>
        </div>
      </Modal>
      <Modal
        toggleModal={toggleDownloadModal}
        isModalOpen={downloadModal}
        background="bg-[#FF8E00CC]"
        width="60%"
        padding="p-6"
        id="downloadModal"
      >
        <Image
          src={Close}
          alt="cross"
          width={15}
          className="absolute cursor-pointer right-6 top-6"
          onClick={() => setDownloadModal(false)}
        />
        <Image
          src={overlay2}
          alt={"bg-overlay-modal-2"}
          width={80}
          className="absolute right-0 z-10 m-0 bottom-5"
        />
        <Image
          src={overlay5}
          alt={"bg-overlay-modal-5"}
          width={80}
          className="absolute top-0 z-10 m-[0] left-5"
        />
        <div className="flex flex-col items-center justify-center w-full gap-10 py-24">
          <h1 className="text-3xl font-normal">
            Are you sure to download ebook
          </h1>
          <div className="flex justify-between gap-3">
            <button
              className="px-5 py-2 text-sm font-medium text-black rounded-lg shadow outline-none bg-crayola-sky-blue"
              onClick={async () => await generateAndDownloadPDF()}
            >
              Download with watermark
            </button>
            <button className="px-5 py-2 text-sm font-medium text-white rounded-lg shadow outline-none bg-dark-orange">
              Download without Watermark
            </button>
          </div>
        </div>
      </Modal>
      {state.isAuthenticated !== true ? (
        <Modal
          toggleModal={() => setLoginModal(true)}
          isModalOpen={loginModal}
          background="bg-black"
          width="30%"
          padding="p-0"
          id="loginModal"
        >
          <Login callback={handleLoginCb} />
        </Modal>
      ) : null}
    </div>
  );
};

export default Page;
