import React from "react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import logo from "../../logo/notess.png";
import { useState } from "react";
import axios from "axios";
import { useRef, useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  let data =
    "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fauth%2Fgoogle&client_id=158688595006-jvjfcd23pcui4tcmpokhr0d86bs7hvue.apps.googleusercontent.com&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email";

  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const error = useRef(null);
  const cookies = new Cookies();
  const Nav = useNavigate();

  useEffect(() => {
    const data = cookies.get("token");
    if (data) {
      Nav("/notesapp");
    }
  });

  const inputmail = (event) => {
    setemail(event.target.value);
  };

  const inputpass = (event) => {
    setpass(event.target.value);
  };

  function goToRegister() {
    Nav("/register");
  }

  async function login(event) {
    event.preventDefault();
    error.value = null;
    const user = await axios.post("http://localhost:4000/login", {
      email: email,
      password: pass,
    });

    cookies.set("token", user.data);
    cookies.set("isloggedin", true);
    Nav("/notesapp");
    
  }
  return (
    <div className="place-items-center">
      <div>
        <Navbar showSignUp="true" />
      </div>
      <div>
        <div className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen py-0">
            <a
              href="www.test.com"
              className="flex items-center mb-6 text-4xl font-semibold text-gray-900 dark:text-white"
            >
              <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
              Notestick
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <form className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={inputmail}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={inputpass}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={login}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Login
                  </button>
                  <div className="w-full place-content-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <a href={data} target="_self">
                      <div className="flex flex-row place-content-center ">
                        <svg
                          className="w-4 h-4 mr-2 -ml-1"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="google"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 488 512"
                        >
                          <path
                            fill="currentColor"
                            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                          ></path>
                        </svg>
                        Sign in with Google
                      </div>
                    </a>
                  </div>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <button
                      onClick={goToRegister}
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
