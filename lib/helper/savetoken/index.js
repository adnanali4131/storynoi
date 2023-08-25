import LocalStorage from "@/lib/integration/localstorage";
import jwt_decode from "jwt-decode";
const saveToken = (token, dispatch) => {
  const storage = new LocalStorage();

  storage.set("jwtToken", token);

  // Check for token
  if (storage.get("jwtToken")) {
    // Set auth token header auth
    // setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and exp
    const decoded = jwt_decode(storage.get("jwtToken"));
    console.log("dispatch", decoded);
    // Set user and isAuthenticated
    dispatch({ type: "SET_CURRENT_USER", payload: decoded });

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      dispatch({ type: "LOGOUT" });
    }
  }
};
export default saveToken;
