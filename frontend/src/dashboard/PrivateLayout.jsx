import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "./Sidebar";
import { useAuth } from "../contexts/AuthProvider";
import { useCookies } from "react-cookie";

const PrivateLayout = () => {
  const { user, loading } = useAuth();
  const [cookies] = useCookies(["admin_access"]);

  useEffect(() => {
    // const _user = localStorage.getItem("user");
    // console.log("user", user);
    // console.log("cookies: ", cookies);
    if (!user && !cookies.admin_access) {
      window.location.href = "/login";
    }
  }, [user, cookies]);
  return (
    <div className="flex gap-4 flex-col md:flex-row">
      <div>
        <SideBar />
      </div>

      <Outlet />
    </div>
  );
};

export default PrivateLayout;
