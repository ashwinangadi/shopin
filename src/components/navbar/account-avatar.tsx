"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AccountAvatar = ({ userId }: { userId: string | undefined }) => {
  const { data: userAccount } = useQuery({
    queryKey: ["account", userId],
    queryFn: async () => {
      const response = await axios.get("/api/account");
      return response.data;
    },
  });
  return (
    <Avatar>
      <AvatarImage src={userAccount?.data?.picture as string} />
      <AvatarFallback className=" text-primary">
        {userAccount?.data?.fullName?.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default AccountAvatar;
