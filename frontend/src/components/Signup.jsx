import React, { useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

const Signup = () => {
  const [ErrorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    const form = event.target;
    const username = form.username.value;
    const password = form.password.value;
    const firstname = form.firstname.value;
    const lastname = form.lastname.value;
    const emailid = form.emailid.value;
    const mobileno = form.mobileno.value;

    const userObj = {
      username,
      firstname,
      lastname,
      emailid,
      mobileno,
      password,
    };

    fetch(`http://localhost:3000/register/`, {
      method: "POST",

      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(userObj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("User registration successfully!!!!");
        form.reset();
        navigate("/login", { replace: true });
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-3xl font-semibold">Create An Account</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form
                onSubmit={handleSignup}
                className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
              >
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div className="relative flex-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Password"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <input
                      id="firstname"
                      name="firstname"
                      type="text"
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div className="relative flex-1">
                    <input
                      id="lastname"
                      name="lastname"
                      type="text"
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <input
                    id="emailid"
                    name="emailid"
                    type="email"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    id="mobileno"
                    name="mobileno"
                    type="tel"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Mobile Number"
                    required
                  />
                </div>
                <div className="relative">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded px-6 py-1"
                  >
                    Sign up
                  </button>
                </div>
                <div>
                  <p className="text-base">
                    If you have an account, please &nbsp;
                    <Link to="/login" className="underline text-blue-600">
                      Login Now
                    </Link>
                    &nbsp; here
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
