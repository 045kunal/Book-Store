import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";
import router from "./routers/router";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {/* <CookiesProvider> */}
      <RouterProvider router={router} />
      {/* </CookiesProvider> */}
    </AuthProvider>
  </React.StrictMode>
);
