"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bounce, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserData {
  userName: string;
  email: string;
  _id: string;
  isAdmin: boolean;
  // Add other properties if any
}

function page() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const route = useRouter();

  const getProfileData = async () => {
    try {
      const res = await axios.get("api/users/me");
      //console.log(res.data.data);
      if (res.data.data) {
        toast.info(`welcome ${res.data.data.userName}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
      setUserData(res.data.data);
    } catch (error: any) {
      console.log("error: ", error.response.data.message || error.message);
      toast.error(error.message || error.response.data.message);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const logout = async () => {
    try {
      await axios.get("api/users/logout");
      toast.info("logout successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        theme: "dark",
        transition: Slide,
      });
      route.push("/login");
    } catch (error: any) {
      console.log("error: ", error.response.data.message || error.message);
      toast.error(error.message || error.response.data.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="my-2">profile page</h1>
      <hr />
      <ul>
        {userData ? (
          <>
            <li className="p-2 bg-green-500 text-black">
              User name: {userData.userName}
            </li>
            <li className="p-2 bg-green-500 text-black">
              <Link className="underline" href={`/profile/${userData._id}`}>
                {userData._id}
              </Link>
            </li>
          </>
        ) : (
          <p className="p-3 bg-red-500 text-black">no data available</p>
        )}
      </ul>
      <button
        onClick={logout}
        className="my-2 p-2 border border-blue-500 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Logout
      </button>
    </div>
  );
}

export default page;
