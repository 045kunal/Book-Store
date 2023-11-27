import React, { useEffect, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useAuth } from "../contexts/AuthProvider";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/user/${user.userid}`
        );
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = (event) => {
    event.preventDefault();
    const userObj = {
      firstname: userData.firstname,
      lastname: userData.lastname,
      password: userData.password,
    };

    fetch(`http://localhost:3000/userUpdate/${user.userid}`, {
      method: "PATCH",

      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(userObj),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          alert(data.error);
          return;
        }
        toast.success("Changes Updated.");
        setIsEditing(false);
      });
    // console.log("Changes saved:", userData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto mt-40 lg:p-8 border border-zinc-100 lg:w-1/2 shadow-md">
      <h1 className="text-2xl font-bold mb-4 justify-begin flex">
        Hello, {userData?.username}
      </h1>

      {isEditing ? (
        // Edit mode
        <div>
          <div className="mb-4">
            <Label htmlFor="firstname" value="First Name" />
            <TextInput
              id="firstname"
              name="firstname"
              value={userData?.firstname}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="lastname" value="Last Name" />
            <TextInput
              id="lastname"
              name="lastname"
              value={userData?.lastname}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="emailid" value="Email ID" />
            <TextInput
              id="emailid"
              name="emailid"
              value={userData?.emailid}
              className="w-full"
              readOnly
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="mobileno" value="Mobile Number" />
            <TextInput
              id="mobileno"
              name="mobileno"
              value={userData?.mobileno}
              className="w-full"
              readOnly
            />
          </div>

          <Button onClick={handleSaveChanges} className="mt-4">
            Save Changes
          </Button>
        </div>
      ) : (
        // View mode
        <div className="space-y-2">
          <p>First Name: {userData?.firstname}</p>
          <p>Last Name: {userData?.lastname}</p>
          <p>Email Id: {userData?.emailid}</p>
          <p>Mobile Number: {userData?.mobileno}</p>
          <Button onClick={handleEditToggle} className="mt-4">
            Edit Profile
          </Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
