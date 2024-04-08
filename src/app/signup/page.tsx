"use client";
// whenever u use any hook of react use above line in nextjs
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

function signUpPage() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    userName: "",
    password: "",
  });
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      userData.email.length > 0 &&
      userData.password.length > 0 &&
      userData.userName.length > 0
    ) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [userData]);

  const onSignup = async () => {
    try {
      setLoading(true);
      setBtnDisabled(false);
      const result = await axios.post("api/users/signup", userData);
      console.log("success data: ", result.data);
      toast.success("please check your email!");
      router.push("/login"); // push use just to add prefix to main url
    } catch (error: any) {
      setLoading(false);
      setBtnDisabled(false);
      console.log("error in signup: ", error);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-">
      <h1>{loading ? "loading ..." : "signUp"}</h1>
      <hr />
      <label htmlFor="userName">user name</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="userName"
        type="text"
        value={userData.userName}
        onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
        placeholder="enter username"
      />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onSignup}
        disabled={!btnDisabled}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {btnDisabled ? "Signup" : "No Signup"}
      </button>
      <Link href="/login">Visit login page</Link>
    </div>
  );
}

export default signUpPage;
