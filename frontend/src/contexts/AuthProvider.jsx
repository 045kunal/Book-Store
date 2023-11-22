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
    const AdminCookieValue = cookies.admin_access;
    const CustomerCookieValue = cookies.customer_access;
    if (AdminCookieValue || CustomerCookieValue) {
      const decodedCookie = jwtDecode(AdminCookieValue || CustomerCookieValue);
      const username = decodedCookie.username;
      const role = decodedCookie.role;
      const userid = decodedCookie.id;
      setUser({ userid, username, role });
    }
    setLoading(false);
  }, [cookies]);

  const login = (jwt_authorizationToken) => {
    const DecodedToken = jwtDecode(jwt_authorizationToken);
    const role = DecodedToken.role;
    const username = DecodedToken.username;
    const userid = DecodedToken.id;
    setUser({ userid, username, role });
    if (role === "customer") {
      setCookie("customer_access", jwt_authorizationToken, {
        path: "/",
        maxAge: 3600 * 24,
      });
    } else
      setCookie("admin_access", jwt_authorizationToken, {
        path: "/",
        maxAge: 3600,
      });

    // localStorage.setItem(
    //   "user",
    //   JSON.stringify({ username: username, role: role })
    // );
    return setLoading(false);
  };

  const logOut = () => {
    setLoading(true);
    if (user && user.role === "customer") {
      removeCookie("customer_access", { path: "/" });
    } else {
      removeCookie("admin_access", { path: "/" });
    }
    // localStorage.removeItem("user");
    setUser(null);
    return setLoading(false);
  };

  const isLoggedIn = user && user.role === "customer";

  const authInfo = {
    user,
    loading,
    login,
    logOut,
    isLoggedIn,
    cookies,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
