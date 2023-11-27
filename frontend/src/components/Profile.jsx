// import React, { useEffect, useState } from "react";
// import { useAuth } from "../contexts/AuthProvider";

// const Profile = () => {
//   const { user, login } = useAuth();
//   var userId;
//   const [userData, setUserData] = useState();

//   useEffect(() => {
//     userId = user?.userid;
//     if (userId) {
//       fetch(`http://localhost:3000/user/${userId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           //   console.log(data);
//           setUserData(data);
//         });
//     }
//   }, []);
//   // console.log(userData);
//   return (
//     <div className="container mx-auto mt-32 lg:px-2 p-4 border border-zinc-400">
//       <h1 className="text-2xl font-bold mb-4 justify-begin flex">
//         Hello, {userData?.username}
//       </h1>
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";

const Profile = () => {
  const { user, login } = useAuth();
  var userId;
  const [userData, setUserData] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});

  useEffect(() => {
    userId = user?.userid;
    if (userId) {
      fetch(`http://localhost:3000/user/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
        });
    }
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
    // Set the editedUserData state to the current userData
    setEditedUserData(userData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the editedUserData state with the new input value
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Send a request to update the user data in the backend
    fetch(`http://localhost:3000/userUpdate/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedUserData),
    })
      .then((res) => res.json())
      .then((data) => {
        // Update the userData state with the edited data
        setUserData(data);
        // Exit the edit mode
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="container mx-auto mt-32 lg:px-2 p-4 border border-zinc-400">
      <h1 className="text-2xl font-bold mb-4 justify-begin flex">
        Hello, {userData?.username}
      </h1>
      {isEditing ? (
        <div>
          {/* Input fields for editing */}
          <div>
            <label className="block mb-2">First Name:</label>
            <input
              type="text"
              name="firstname"
              value={editedUserData?.firstname || ""}
              onChange={handleInputChange}
              className="border p-2 mb-2"
            />
          </div>
          <div>
            <label className="block mb-2">Last Name:</label>
            <input
              type="text"
              name="lastname"
              value={editedUserData?.lastname || ""}
              onChange={handleInputChange}
              className="border p-2 mb-2"
            />
          </div>
          {/* Add more input fields for other user details */}
          <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">
            Save Changes
          </button>
        </div>
      ) : (
        <div>
          {/* Display user information */}
          <p>Email: {userData?.emailid}</p>
          <p>Mobile No: {userData?.mobileno}</p>
          {/* Display other user details */}
          <button onClick={handleEditProfile} className="bg-blue-500 text-white px-4 py-2 rounded">
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;

