import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useLoaderData, useParams } from "react-router-dom";

const EditUsers = () => {
  const userRole = ["customer", "admin", "employee", "manager", "engineer"];

  const { id } = useParams();
  const initialFormData = useLoaderData();

  const [formData, setFormData] = useState(initialFormData);
  const [selectedUserRole, setSelectedUserRole] = useState(formData.userRoles);

  const handleChangeSelectedValue = (event) => {
    // console.log(event.target.value);
    setSelectedUserRole(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    formData.username = form.username.value;
    formData.firstname = form.firstname.value;
    formData.lastname = form.lastname.value;
    formData.emailid = form.emailid.value;
    formData.password = form.password.value;
    formData.mobileno = form.mobileno.value;

    fetch(`http://localhost:3000/userUpdate/${id}`, {
      method: "PATCH",

      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          alert(data.error);
          return;
        }
        alert("User updated successfully!!!!");
      });
  };

  useEffect(() => {
    setSelectedUserRole(formData.role);
  }, [formData.role]);

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Edit User!</h2>
      <form
        className="flex lg:w-[1180px] flex-col flex-wrap gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="username" value="User Name" />
            </div>
            <TextInput
              id="username"
              placeholder="User Name"
              type="text"
              name="username"
              className="w-full"
              defaultValue={formData.username}
            />
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="firstname" value="First Name" />
            </div>
            <TextInput
              id="firstname"
              placeholder="First Name"
              type="text"
              name="firstname"
              className="w-full"
              defaultValue={formData.firstname}
            />
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="lastname" value="Last Name" />
            </div>
            <TextInput
              id="lastname"
              placeholder="Last Name"
              type="text"
              name="lastname"
              className="w-full"
              defaultValue={formData.lastname}
            />
          </div>
        </div>

        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="emailid" value="Email Id" />
            </div>
            <TextInput
              id="emailid"
              placeholder="EmailID"
              type="text"
              name="emailid"
              className="w-full"
              defaultValue={formData.emailid}
            />
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              id="password"
              placeholder="Password"
              type="text"
              name="password"
              className="w-full"
              defaultValue={formData.password}
            />
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="role" value="Role" />
            </div>
            <Select
              id="role"
              value={selectedUserRole}
              onChange={handleChangeSelectedValue}
              type="text"
              name="role"
              className="w-full rounded"
            >
              {userRole.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="mobileno" value="mobileno" />
            </div>
            <TextInput
              id="mobileno"
              placeholder="Mobile Number"
              type="number"
              name="mobileno"
              className="w-full"
              defaultValue={formData.mobileno}
            />
          </div>
        </div>

        {/* Submit btn */}
        <Button type="submit" className="mt-5">
          Update user
        </Button>
      </form>
    </div>
  );
};

export default EditUsers;
