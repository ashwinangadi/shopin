"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAccount } from "@/hooks/useAccount";

const AccountAvatar = ({ userId }: { userId: string | undefined }) => {
  const { data: userAccount, isLoading } = useAccount(userId);

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
