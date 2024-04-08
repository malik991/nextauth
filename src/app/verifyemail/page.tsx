"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

function verifyEmail() {
  const [token, setToken] = useState("");
  const [verifyToken, setVerifyToken] = useState(false);
  const [error, setError] = useState(false);
  //const router = useRouter();

  useEffect(() => {
    setError(false);
    // pure js
    const tokenFromUrl = window.location.search.split("=")[1];
    setToken(tokenFromUrl || "");
    // using nextjs or react
    // const { query } = router;
    // const tokenUrl: any = query.token;
    // setToken(tokenUrl)
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmailToken();
    }
  }, [token]);

  const verifyEmailToken = async () => {
    try {
      await axios.post("api/users/verifyemail", { token });
      setVerifyToken(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data); // becuase of axios convention
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">verify email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      {verifyToken && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">{error}</h2>
        </div>
      )}
    </div>
  );
}

export default verifyEmail;
