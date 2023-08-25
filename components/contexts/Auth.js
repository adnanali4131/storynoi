"use client";

import { createContext, useEffect, useReducer } from "react";
import isEmpty from "@/lib/helper/isEmpty";
import LocalStorage from "@/lib/integration/localstorage";
import jwt_decode from "jwt-decode";
const initialState = {
  isAuthenticated: false,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case "LOGOUT":
      return {
        isAuthenticated: false,
        user: null,
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
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
