import React, { useEffect, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useAuth } from "../contexts/AuthProvider";

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user data from the server based on the user ID
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/${user.userid}`);
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

  const handleSaveChanges = () => {
    // Implement the logic to save changes to the server
    console.log("Changes saved:", userData);
    // You can make a fetch request to update user data on the server
    // ...

    // After saving changes, switch back to view mode
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    // Update the user data in the state when input fields change
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto mt-32 lg:px-2 p-4 border border-zinc-400">
      <h1 className="text-2xl font-bold mb-4 justify-begin flex">
        Hello, {userData?.username}
      </h1>

      {isEditing ? (
        // Edit mode
        <div>
          <div className="mb-4">
            <Label htmlFor="username" value="Username" />
            <TextInput
              id="username"
              name="username"
              value={userData?.username}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

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
            <Label htmlFor="emailid" value="Email Id" />
            <TextInput
              id="emailid"
              name="emailid"
              value={userData?.emailid}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          <Button onClick={handleSaveChanges} className="mt-4">
            Save Changes
          </Button>
        </div>
      ) : (
        // View mode
        <div>
          <p>First Name: {userData?.firstname}</p>
          <p>Last Name: {userData?.lastname}</p>
          <p>Email Id: {userData?.emailid}</p>
          <Button onClick={handleEditToggle} className="mt-4">
            Edit Profile
          </Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
