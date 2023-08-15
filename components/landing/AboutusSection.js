import Image from "next/image";
import girl2 from "@/assets/landing/baby-girl-2.svg";
const AboutusSection = () => {
  return (
    <section className="relative overflow-hidden aboutus-section bg-crayola-sky-blue">
      <div className="bg-overlay-net"></div>
      <div className="relative z-10 py-20">
        <div className="custom_container  mx-auto">
          <div className="flex items-end justify-between">
            <div className="flex-1 image-content">
              <p className="text-xl font-normal">About Us</p>
              <h2 className="text-[42px] font-extrabold">
                The Perfect Storyteller
              </h2>
              <Image
                src={girl2}
                width={470}
                alt="baby-girl-2"
                className="mt-5"
              />
            </div>
            <div className="flex flex-col items-baseline justify-center flex-1 gap-5 w-[50%] mb-10">
              <p className="leading-7 tex-sm">
                Is A Genai Powered App That Lets You Create And Share Your Own
                Stories. With The Help Of Genai, The App Can Generate Stories
                Based On Your Prompts And Ideas. You Can Then Turn Your Stories
                Into Books.
              </p>
              <p className="leading-7 tex-sm">
                Once You've Created A Story, You Can Share It With Friends And
                Family Through The App's Social Media Integration.
              </p>

              <p className="leading-7 text-left tex-sm">
                You Can Also Publish Your Stories Online Through The App's
                Publishing Pla tform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutusSection;
