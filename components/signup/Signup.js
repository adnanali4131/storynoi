"use client";
import { useState } from "react";
import Image from "next/image";
import Hidden from "@/assets/auth/icons/hidden.svg";
import Google from "@/assets/auth/icons/google.svg";
import Show from "@/assets/auth/icons/show.svg";

const Signup = ({ width }) => {
  const [hidden, setHidden] = useState(true);

  return (
    <div className="px-10 py-8 bg-white login rounded-xl" style={{ width }}>
      <div className="text-[30px] font-medium">
        <h1 className="mb-[20px]">Sign Up</h1>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-3 px-4 overflow-hidden bg-white border rounded-xl custom-input">
            <div className="flex w-[90%] gap-3">
              <input
                type="text"
                placeholder="First Name"
                className="py-3 outline-none text-[16px] w-full"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 px-4 overflow-hidden bg-white border rounded-xl custom-input">
            <div className="flex w-[90%] gap-3">
              <input
                type="text"
                placeholder="Last Name"
                className="py-3 outline-none text-[16px] w-full"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 px-4 overflow-hidden bg-white border rounded-xl custom-input">
            <div className="flex w-[90%] gap-3">
              <input
                type="text"
                placeholder="Email"
                className="py-3 outline-none text-[16px] w-full"
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 px-4 overflow-hidden bg-white border rounded-xl custom-input">
            <div className="flex w-[90%] gap-3">
              <input
                type={hidden ? "password" : "text"}
                placeholder="Password"
                id="password"
                className="py-3 outline-none text-[16px] w-full"
              />
            </div>
            <Image
              src={hidden ? Hidden : Show}
              width={15}
              alt="hidden-icon"
              onClick={() => setHidden(!hidden)}
              className="cursor-pointer"
            />
          </div>

          <button className="text-white bg-dark-orange rounded-xl text-[16px] p-3">
            Create Account
          </button>
          <div className="flex items-center justify-between">
            <div className="h-[1px] w-[45%] bg-[#ABABAB]"></div>
            <p className="text-[16px] text-[#ABABAB]">or</p>
            <div className="h-[1px] w-[45%]  bg-[#ABABAB]"></div>
          </div>
          <button className="bg-white flex gap-3 border justify-center items-center  rounded-xl text-[16px] p-3">
            <Image src={Google} width={20} alt="google-icon" />{" "}
            <p className="tex-[16px] text-[#ABABAB]">Continue with Google</p>
          </button>
          <div className="flex justify-center mt-10">
            <p className="text-[15px]">
              Already have an account?{" "}
              <span className="text-dark-orange">Login</span>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
