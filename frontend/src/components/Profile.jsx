import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";

const Profile = () => {
  const { user, login } = useAuth();
  var userId;
  const [userData, setUserData] = useState();

  useEffect(() => {
    userId = user?.userid;
    if (userId) {
      fetch(`http://localhost:3000/user/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          //   console.log(data);
          setUserData(data);
        });
    }
  }, []);
  // console.log(userData);
  return (
    <div className="container mx-auto mt-32 lg:px-2 p-4 border border-zinc-400">
      <h1 className="text-2xl font-bold mb-4 justify-begin flex">
        Hello, {userData?.username}
      </h1>
    </div>
  );
};

export default Profile;
