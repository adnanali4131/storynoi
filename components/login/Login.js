"use client";
import { useState, useContext } from "react";
import Image from "next/image";
import Lock from "@/assets/auth/icons/lock.svg";
import Hidden from "@/assets/auth/icons/hidden.svg";
import User from "@/assets/auth/icons/user.svg";
import Google from "@/assets/auth/icons/google.svg";
import Show from "@/assets/auth/icons/show.svg";
import LocalStorage from "@/lib/integration/localstorage";
import jwt_decode from "jwt-decode";
import { AuthContext } from "../contexts/Auth";
import Link from "next/link";

const Login = ({ width, callback, signUp }) => {
  const { state, dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidden, setHidden] = useState(true);
  const storage = new LocalStorage();

  const handleLogin = async (event) => {
    event.preventDefault();
    const res = await (
      await fetch("/api/signin", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      })
    ).json();

    if (res) {
      storage.set("jwtToken", res.token);

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
        } else {
          if (callback) await callback();
        }
      }
    }
  };

  return (
    <div className="px-10 py-8 bg-white login rounded-xl" style={{ width }}>
      <div className="text-[30px] font-medium">
        <h1 className="mb-[20px]">Login</h1>
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-3 px-4 overflow-hidden bg-white border rounded-xl custom-input">
            <div className="flex w-[90%] gap-3">
              <Image src={User} width={15} alt="user-icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                className="py-3 outline-none text-[16px] w-full"
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 px-4 overflow-hidden bg-white border rounded-xl custom-input">
            <div className="flex w-[90%] gap-3">
              <Image src={Lock} width={15} alt="user-icon" />
              <input
                type={hidden ? "password" : "text"}
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
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
          <div className="w-full">
            <Link
              href={"/forgot-password"}
              className="float-right text-[16px] text-dark-orange"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            className="text-white bg-dark-orange rounded-xl text-[16px] p-3"
            onClick={handleLogin}
          >
            Login
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
          <div className="flex justify-center mt-20">
            <p className="text-[15px]">
              Don’t have an account?{" "}
              <span
                className="cursor-pointer text-dark-orange"
                onClick={() => {
                  if (signUp) {
                    signUp();
                  }
                }}
              >
                Signup
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
