"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState();
  const [globalError, setGlobalError] = useState<string>("");

  const getUserDetails = async () => {
    try {
      //   const result = await createUser(values);
      const response = await axios.post("/api/users/profile");
      setUserData(response.data._id);
      //   console.log("result__________________snigupPage", response);
    } catch (error: any) {
      console.log(
        "An unexpected error occurred. Please try again.",
        error.message
      );
      setGlobalError(error?.message);
      toast.error(error?.message);
    }
  };
  const logOut = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success(response?.data.message);
      router.push("/login");
    } catch (error: any) {
      console.log(
        "An unexpected error occurred. Please try again.",
        error.message
      );
      toast.error(error.message);
    }
  };
  return (
    <section className="mt-28">
      <p>Setup middleware for this API approach</p>
      <h1>Profile</h1>
      {userData && userData}
      {globalError && globalError}
      <Button onClick={logOut}>Logout</Button>
      <Button onClick={getUserDetails}>Get User</Button>
    </section>
  );
};

export default ProfilePage;
