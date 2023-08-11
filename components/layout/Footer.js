import Image from "next/image";
import logo from "@/assets/white-logo.svg";
import footerShape1 from "@/assets/landing/footer-shape-1.png";
const Footer = () => {
  return (
    <footer className="bg-black relative">
      <Image
        src={footerShape1}
        className="absolute top-[50%] -translate-y-[50%] left-14"
        width={100}
      />
      <Image
        src={footerShape1}
        width={50}
        className="absolute top-[40%] -translate-y-[50%] right-[10%]"
      />
      <div className="custom_container mx-auto">
        <div className="py-20 flex justify-center items-center flex-col text-white gap-5">
          <Image src={logo} alt="white-logo" />
          <p className="text-lg font-light">
            Storynoi © 2023. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
