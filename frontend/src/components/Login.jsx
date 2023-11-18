import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

// import { AuthContext } from "../contexts/AuthProvider";
// import googleLogo from "../assets/google-logo.svg";
// import fbLogo from "../assets/facebook-log.svg";

export default function Login() {
  const [ErrorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const from = location.state?.from?.pathname || "/admin/dashboard";

  // login with username password
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const username = form.username.value;
    const password = form.password.value;
    // console.log(username, password);

    const userObj = {
      username,
      password,
    };

    fetch(`http://localhost:3000/login/`, {
      method: "POST",

      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(userObj),
    }).then(async (res) => {
      if (res.status === 401 || res.status === 400) {
        const data = await res.json();
        const errorMessage = data.error;
        // console.log(errorMessage);
        setErrorMessage(errorMessage);
      } else {
        alert("Login successful....");

        const data = await res.json();
        // console.log("data: ", data);

        const token = data.accessToken;

        login(token);
        navigate(from, { replace: true });
      }
    });

    // login(username, password)
    //   .then((result) => {
    //     // Signed in
    //     const user = result.user;
    //     console.log(user);
    //     alert("Login successful!");
    //     navigate(from, { replace: true });
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorMessage = error.message;
    //     setErrorMessage(errorMessage);
    //   });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-3xl font-semibold">
                Please Login to Dashborad
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form
                onSubmit={handleLogin}
                className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
              >
                <div className="relative">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Username here"
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
                  <p>
                    {ErrorMessage ? (
                      <span className="text-red-500 text-sm">
                        Username or Password is not valid!
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
                  {/* <p className="text-base mt-1">
                    If you haven't an account. Please create here{" "}
                    <Link to="/create-user" className="underline text-blue-600">
                      Sign Up
                    </Link>
                  </p> */}
                </div>
                <div className="relative">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded px-6 py-1"
                  >
                    Login
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
}
