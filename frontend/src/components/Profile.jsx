import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});

  useEffect(() => {
    const userId = user?.userid;
    if (userId) {
      fetch(`http://localhost:3000/user/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
        });
    }
  }, [user]);

  const handleEditProfile = () => {
    setIsEditing(true);
    setEditedUserData(userData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const userId = user?.userid;

    fetch(`http://localhost:3000/userUpdate/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedUserData),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="container mx-auto mt-8 lg:w-1/2 p-4 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Hello, {userData?.username}</h1>
      {isEditing ? (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">First Name:</label>
            <input
              type="text"
              name="firstname"
              value={editedUserData?.firstname || ""}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Last Name:</label>
            <input
              type="text"
              name="lastname"
              value={editedUserData?.lastname || ""}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          {/* Add more input fields for other user details */}
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-2">Email: {userData?.emailid}</p>
          <p className="mb-2">Mobile No: {userData?.mobileno}</p>
          {/* Display other user details */}
          <button
            onClick={handleEditProfile}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
