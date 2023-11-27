import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

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
        setErrorMessage(errorMessage);
      } else {
        const data = await res.json();
        const token = data.accessToken;
        login(token);
        toast.success("Login Successful.");

        const DecodedToken = jwtDecode(token);
        const role = DecodedToken.role;

        if (role === "customer") {
          navigate("/", { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-3xl font-semibold">
                Please Login to you account
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
                <div>
                  <p className="text-base">
                    If you don't have an account, please &nbsp;
                    <Link to="/sign-up" className="underline text-blue-600">
                      Signup
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
}
