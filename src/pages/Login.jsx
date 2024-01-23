"use client";
import React, { useEffect, useState } from "react";
import { login as authLogin } from "../store/authSlice";
import { Provider, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Create a useState name [userDetails, setUserDetails] and assign it with initial value {username:"atuny0", password:"9uQFF1Lh"}
// Create a useEffect and inside it check if global user is present navigate to "/" using the useNavigate hook
// Set values of input as userDetails.username and userDetails.password respectively

function Login() {
  const dispatch = useDispatch();
  const globalUser = useSelector((state) => state.auth.userData);
  // const [userDetails, setUserDetails] = useState({
  //   username: "atuny0",
  //   password: "9uQFF1Lh",
  // });

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

  // useEffect(() => {
  //   if (globalUser) {
  //     navigate("/");
  //   }
  // }, [globalUser]);

  return (
    <div className="w-full flex flex-col justify-around items-center">
      <Toaster position="top-right" reverseOrder={false} className="absolute" />
      <div className="flex flex-col justify-aroundw-[50%] m-10 p-5 shadow-md shadow-slate-700">
        <div className="text-3xl text-center border-2 border-blue-400 bg-blue-400 rounded-xl w-[60%] mx-auto py-2">
          Login
        </div>
        <form className="text-xl flex flex-col justify-around">
          <div className="flex flex-col my-2">
            <div>Username</div>
            <input
              id="username"
              type="text"
              onChange={(e) => {
                setUserDetails({ ...userDetails, username: e.target.value });
              }}
              // value={userDetails.username}
              className="p-1 px-2 rounded-lg outline-none border-2 border-blue-600 w-full"
            />
          </div>
          <div className="flex flex-col my-2">
            <div>Password</div>
            <input
              id="password"
              type="password"
              onChange={(e) => {
                setUserDetails({ ...userDetails, password: e.target.value });
              }}
              // value={userDetails.password}
              className="p-1 px-2 rounded-lg outline-none border-2 border-blue-600 w-full"
            />
          </div>
          <button
            type="submit"
            onClick={submitHandler}
            className="p-2 border-2 border-blue-400 bg-blue-400 rounded-xl w-[40%] mx-auto my-5"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
