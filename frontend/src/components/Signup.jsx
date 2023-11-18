import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// const bcrypt = require("bcrypt");
// import { AuthContext } from "../contexts/AuthProvider";
// import googleLogo from "../assets/google-logo.svg";
// import fbLogo from "../assets/facebook-log.svg";

const Signup = () => {
  const [ErrorMessage, setErrorMessage] = useState("");
  // login with email password
  const handleSignup = (event) => {
    event.preventDefault();
    const form = event.target;
    const username = form.username.value;
    const password = form.password.value;
    console.log(username, password);

    var hashedpassword;
    try {
      hashedpassword = bcrypt.hash(password, 10);
    } catch {
      ctx.status = 500;
      console.log(" error in hashing");
      ctx.body = "Error in hashing password.";
    }
    const userObj = {
      username,
      firstname,
      lastname,
      emailid,
      password: hashedpassword,
      role,
    };

    fetch(`http://localhost:3000/register/`, {
      method: "PATCH",

      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(bookObj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Book updated successfully!!!!");
      });
  };

  // createUser(user, password)
  //   .then((userCredential) => {
  //     // Signed in
  //     const user = userCredential.user;
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log(error.message);
  //     // ..
  //   });

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-3xl font-semibold">
                Please Create An Account
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form
                onSubmit={handleSignup}
                className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
              >
                <div className="relative">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="User name"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                    required
                  />
                </div>
                <div>
                  <p className="text-base">
                    If you have an account. Please{" "}
                    <Link to="/login" className="underline text-blue-600">
                      Login Now
                    </Link>{" "}
                    here
                  </p>
                </div>
                <div className="relative">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded px-6 py-1"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* social login */}
          {/* <div>
            <hr />
            <div className="flex w-full items-center flex-col mt-5 gap-3">
              <button onClick={handleRegister} className="block">
                {" "}
                <img
                  src={googleLogo}
                  alt=""
                  className="w-12 h-12 inline-block"
                />
                Log in with Google
              </button>
              <button>
                {" "}
                <img
                  src={fbLogo}
                  alt=""
                  className="w-10 h-10 inline-block mr-1"
                />
                Log in with Facebook
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
