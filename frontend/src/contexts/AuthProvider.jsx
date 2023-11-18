import React, { useEffect, createContext, useContext, useState } from "react";
import { useCookies } from "react-cookie";
// import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  // console.log("user:  ", user);

  useEffect(() => {
    // const _user = localStorage.getItem("user");
    const CookieValue = cookies.jwt;
    if (CookieValue) {
      const decodedCookie = jwtDecode(CookieValue);
      const username = decodedCookie.username;
      const role = decodedCookie.role;
      setUser({ username, role });
    }
  }, [cookies]);

  const login = (jwt_authorizationToken) => {
    const DecodedToken = jwtDecode(jwt_authorizationToken);
    const role = DecodedToken.role;
    const username = DecodedToken.username;
    setUser({ username, role });

    setCookie("jwt", jwt_authorizationToken, { path: "/", maxAge: 3600 });

    // localStorage.setItem(
    //   "user",
    //   JSON.stringify({ username: username, role: role })
    // );
    return setLoading(false);
  };

  const logOut = () => {
    setLoading(false);
    removeCookie("jwt", { path: "/" });
    // localStorage.removeItem("user");
    return setUser(null);
  };

  const authInfo = {
    user,
    loading,
    login,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
