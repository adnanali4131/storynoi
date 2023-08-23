"use client";

import { createContext, useReducer } from "react";
import isEmpty from "@/lib/helper/isEmpty";
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

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
