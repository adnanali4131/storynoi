import Image from "next/image";
import Logo from "@/assets/logo.png";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="flex items-center h-[100px]">
      <div className="custom_container mx-auto">
        <div className="flex items-center justify-between">
          <div className="logo">
            <Link href={"/"}>
              {" "}
              <Image src={Logo} alt="logo" width={100} />
            </Link>
          </div>
          <div className="nav-items">
            <ul className="flex items-center justify-center gap-12">
              <li className="text-base font-medium">
                <Link href={"/"}>About Us</Link>
              </li>
              <li className="text-base font-medium">
                <Link href={"/"}>Why StoryNoi</Link>
              </li>
              <li className="text-base font-medium">
                <Link href={"/"}>Idea</Link>
              </li>
              <li className="text-base font-medium">
                <Link
                  href={"/"}
                  className="py-2 border-2 border-black px-7 rounded-xl "
                >
                  Log In
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
