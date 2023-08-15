import Image from "next/image";
import kidEbook from "@/assets/landing/kid-ebook.svg";

const CreateEbook = () => {
  return (
    <section className="relative overflow-hidden text-black create-ebook-section bg-crayola-sky-blue">
      <div className="bg-overlay-net"></div>
      <div className="relative z-10 py-20 ">
        <div className="mx-auto custom_container">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center justify-center flex-1">
              <h2 className="text-[42px] font-extrabold">
                Go Live! Create Your Ebook or Print It!
              </h2>
              <div className="flex flex-col gap-5 mt-5">
                <p className="leading-7 tex-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
            <div className="flex-[1.5] flex justify-end ">
              <Image src={kidEbook} alt="girl3" width={600} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateEbook;
