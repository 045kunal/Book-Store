import { Label, TextInput, Button, Select } from "flowbite-react";
import React, { useEffect, useState } from "react";

const UploadUser = () => {
  const userRole = ["admin", "employee", "manager", "engineer"];
  const [currentUserRole, setCurrentUserRole] = useState();
  const handleChangeSelectedValue = (event) => {
    // console.log(event.target.value);
    setCurrentUserRole(event.target.value);
  };

  // useEffect(() => {
  //   setCurrentUserRole("");
  // });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const username = form.username.value;
    const firstname = form.firstname.value;
    const lastname = form.lastname.value;
    const emailid = form.emailid.value;
    const mobileno = form.mobileno.value;
    const password = form.password.value;
    const role = currentUserRole;

    const userObj = {
      username,
      firstname,
      lastname,
      emailid,
      mobileno,
      password,
      role,
    };
    // console.log(dataObj)
    fetch("http://localhost:3000/register/", {
      method: "POST",

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
        alert("User Registered successfully!!!!");
        form.reset();
      });
  };
  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Register User!</h2>
      <form
        className="flex lg:w-[1180px] flex-col flex-wrap gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="username" value="Username" />
            </div>
            <TextInput
              id="username"
              placeholder="Username"
              required
              type="text"
              name="username"
              className="w-full"
            />
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="firstname" value="First Name" />
            </div>
            <TextInput
              id="firstname"
              placeholder="First Name"
              required
              type="text"
              name="firstname"
              className="w-full"
            />
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="lastname" value="Last Name" />
            </div>
            <TextInput
              id="lastname"
              placeholder="Last Name"
              required
              type="text"
              name="lastname"
              className="w-full"
            />
          </div>
        </div>

        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="emailid" value="Email ID" />
            </div>
            <TextInput
              id="emailid"
              placeholder="Email ID"
              required
              type="text"
              name="emailid"
              className="w-full"
            />
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="mobileno" value="Mobile No" />
            </div>
            <TextInput
              id="mobileno"
              placeholder="Mobile Number"
              required
              type="number"
              name="mobileno"
              className="w-full"
            />
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              id="password"
              placeholder="Password"
              required
              type="text"
              name="password"
              className="w-full"
            />
          </div>
        </div>

        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="role" value="Role" />
            </div>
            <Select
              id="role"
              placeholder="Role"
              required
              type="text"
              name="role"
              className="w-full"
              value={currentUserRole}
              onChange={handleChangeSelectedValue}
            >
              {userRole.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Submit btn */}
        <Button type="submit" className="mt-5">
          Register User
        </Button>
      </form>
    </div>
  );
};

export default UploadUser;
