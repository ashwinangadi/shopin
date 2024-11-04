import { ArchiveRestore, CircleUser, Heart } from "lucide-react";
import React from "react";
import { Separator } from "../../ui/separator";
import Link from "next/link";
import LogoutButton from "@/components/auth/logout-button";
import { UserInfo } from "./user-info";
import { auth } from "../../../../auth";

const Sidebar = async () => {
  const session = await auth();
  return (
    <div className="flex flex-col gap-2 w-full md:h-[calc(100vh-80px)]">
      <UserInfo userId={session?.user?.id} />
      <div className="flex flex-col items-start justify-between mx-auto w-full bg-white rounded-md md:border px-1 pt-2 md:pt-3 pb-2 md:h-full">
        <div className="grid grid-cols-3 md:flex md:flex-col justify-between gap-2 w-full">
          <Link
            href="/account/orders"
            className="hover:bg-accent p-2 rounded-md flex justify-center md:justify-start items-center hover:text-primary text-sm md:text-base text-gray-500 font-medium md:gap-2"
          >
            <ArchiveRestore className="w-4 md:w-5 me-2 stroke-primary fill-primary" />{" "}
            Orders
          </Link>
          <Separator className="w-full hidden md:block" />
          {/* <Separator orientation="vertical" className="md:block" /> */}
          <Link
            href="/account"
            className="hover:bg-accent p-2 rounded-md flex justify-center md:justify-start items-center hover:text-primary text-sm md:text-base text-gray-500 font-medium md:gap-2"
          >
            <CircleUser className="w-4 md:w-5 me-2 stroke-white fill-primary" />{" "}
            Account
          </Link>
          <Separator className="w-full hidden md:block" />
          {/* <Separator orientation="vertical" className="md:block" /> */}
          <Link
            href="/account/wishlist"
            className="hover:bg-accent p-2 rounded-md flex justify-center md:justify-start items-center hover:text-primary text-sm md:text-base text-gray-500 font-medium md:gap-2"
          >
            <Heart className="w-4 md:w-5 me-2 stroke-primary fill-primary" />{" "}
            Wishlist
          </Link>
        </div>

        <div className=" w-full hidden md:block">
          <Separator className="w-full" />
          <LogoutButton className="w-full text-left hover:text-primary text-base text-gray-500 font-medium px-0 mt-2" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
