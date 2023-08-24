"use client";

import { createContext, useEffect, useReducer } from "react";
import isEmpty from "@/lib/helper/isEmpty";
import LocalStorage from "@/lib/integration/localstorage";
import jwt_decode from "jwt-decode";
const initialState = {
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        isAuthenticated: !isEmpty(action.payload),
      };
    case "USER_LOGOUT":
      return {
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext({
  state: initialState,
  dispatch: () => null,
});

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // useEffect(() => {
  //   // Check for token
  //   const storage = new LocalStorage();
  //   if (storage.get("jwtToken")) {
  //     // Set auth token header auth
  //     // setAuthToken(localStorage.jwtToken);
  //     // Decode token and get user info and exp
  //     const decoded = jwt_decode(storage.get("jwtToken"));
  //     // Set user and isAuthenticated
  //     dispatch({ type: "SET_CURRENT_USER", payload: decoded });

  //     // Check for expired token
  //     const currentTime = Date.now() / 1000;
  //     if (decoded.exp < currentTime) {
  //       dispatch({ type: "USER_LOGOUT" });
  //     }
  //   }
  // }, []);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
