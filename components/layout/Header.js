"use client";
import { useContext, useEffect } from "react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import Link from "next/link";
import jwt_decode from "jwt-decode";
import { AuthContext } from "@/components/contexts/Auth";
import LocalStorage from "@/lib/integration/localstorage";
const Header = () => {
  const { state, dispatch } = useContext(AuthContext);
  const storage = new LocalStorage();
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
  }, [dispatch]);
  return (
    <nav className="flex items-center h-[100px]">
      <div className="mx-auto custom_container">
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
                <Link href={"/signup"}>Idea</Link>
              </li>
              <li className="text-base font-medium">
                {state.isAuthenticated !== true ? (
                  <Link
                    href={"/login"}
                    className="py-2 border-2 border-black px-7 rounded-xl "
                  >
                    Log In
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="py-2 border-2 border-black px-7 rounded-xl "
                    onClick={() => {
                      dispatch({ type: "LOGOUT" });
                      storage.remove("jwtToken");
                    }}
                  >
                    Logout
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
