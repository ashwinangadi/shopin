"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAccount } from "@/hooks/useAccount";

export const UserInfo = ({ userId }: { userId: string | undefined }) => {

  const { data: userAccount, isLoading } = useAccount(userId);

  return (
    <div className="flex items-center gap-4 bg-white rounded-md md:border p-3">
      <Avatar>
        <AvatarImage src={userAccount?.data?.picture as string} />
        <AvatarFallback className=" text-primary">
          {userAccount?.data?.fullName?.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-xs font-medium">Hello,</p>
        <p className="text-base font-medium">{userAccount?.data?.fullName}</p>
      </div>
    </div>
  );
};
