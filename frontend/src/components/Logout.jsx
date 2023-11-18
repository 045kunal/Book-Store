import React, { useContext, useState } from "react";
import { Button, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import { AuthContext, useAuth } from "../contexts/AuthProvider";

const Logout = () => {
  const [openModal, setOpenModal] = useState("");
  const props = { openModal, setOpenModal };

  //   use context
  const { logOut } = useAuth();

  const hangleSignOut = () => {
    // console.log("sign out");
    logOut()
      .then(() => {
        console.log("signout");
      })
      .catch((error) => {
        // An error happened.
        console.log("error occured");
      });
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <Link to="/" onClick={hangleSignOut}>
        <Button onClick={() => props.setOpenModal(undefined)}>
          Yes, I want to sign out!
        </Button>
      </Link>
    </div>
  );
};
export default Logout;
