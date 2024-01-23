"use client";
import React, { useEffect, useState } from "react";
import { login as authLogin } from "../store/authSlice";
import { Provider, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const globalUser = useSelector((state) => state.auth.userData);
  const [userDetails, setUserDetails] = useState({
    username: "atuny0",
    password: "9uQFF1Lh",
  });

  const navigate = useNavigate();

  const [userLoggedIn, setUserLoggedIn] = useState(0);
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      console.log(userDetails);
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        userDetails
      );
      const userData = response.data;
      if (userData) dispatch(authLogin({ userData }));
      setUserLoggedIn(1);
      console.log(globalUser);
      toast.success("Successfully Logged in!");
    } catch (error) {
      console.log("Could not store userdata");
      toast.error("Invalid User");
    }
  };

  useEffect(() => {
    if (globalUser) {
      navigate("/");
    }
  }, [globalUser]);

  // Make the form element with id="form" flex column with justify around
  // Make the border radius inside the input with id="password" same as the border radius of input with id="username"
  // Add p-2 to the button with id="submit_button"
  return (
    <div className="w-full flex flex-col justify-around items-center">
      <Toaster position="top-right" reverseOrder={false} className="absolute" />
      <div className="flex flex-col justify-aroundw-[50%] m-10 p-5 shadow-md shadow-slate-700">
        <div className="text-3xl text-center border-2 border-blue-400 bg-blue-400 rounded-xl w-[60%] mx-auto py-2">
          Login
        </div>
        <form id="form" className="text-xl">
          <div className="flex flex-col my-2">
            <div>Username</div>
            <input
              type="text"
              id="username"
              onChange={(e) => {
                setUserDetails({ ...userDetails, username: e.target.value });
              }}
              value={userDetails.username}
              className="p-1 px-2 rounded-lg outline-none border-2 border-blue-600 w-full"
            />
          </div>
          <div className="flex flex-col my-2">
            <div>Password</div>
            <input
              type="password"
              id="password"
              onChange={(e) => {
                setUserDetails({ ...userDetails, password: e.target.value });
              }}
              value={userDetails.password}
              className="p-1 px-2 outline-none border-2 border-blue-600 w-full"
            />
          </div>
          <button
            type="submit"
            onClick={submitHandler}
            id="submit_button"
            className="border-2 border-blue-400 bg-blue-400 rounded-xl w-[40%] mx-auto my-5"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
