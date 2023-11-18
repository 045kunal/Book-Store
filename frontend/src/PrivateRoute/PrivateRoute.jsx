import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthProvider, { AuthContext, useAuth } from "../contexts/AuthProvider";
import { Spinner } from "flowbite-react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();
  // if (loading) {
  //   return (
  //     <div className="text-center">
  //       <Spinner aria-label="Center-aligned spinner example" />
  //     </div>
  //   );
  // }
  // console.log("use");
  // if (user) {
  //   return children;
  // }

  return <>Dashbaord</>;
};

export default PrivateRoute;
