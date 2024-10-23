import React from "react";
import { Button } from "../ui/button";
import { auth, signIn, signOut } from "../../../auth";
import { ArchiveRestore, CircleUser, Heart, Power } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "../auth/logout-button";

const AccountDropdown = async () => {
  const session = await auth();
  const userName = session?.user?.name;
  const userImage = session?.user?.image;
  return (
    <span className="flex items-center gap-2">
      {!session?.user ? (
        <Link href={`/login`}>
          <Button variant={"secondary"}>Login</Button>
        </Link>
      ) : (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full">
              <Avatar>
                <AvatarImage src={userImage as string} />
                <AvatarFallback>
                  {userName?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
              <Link href={`/account`}>
                <DropdownMenuItem>
                  <CircleUser className="w-3.5 me-2 stroke-white fill-primary " />{" "}
                  My Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link href={`/account/orders`}>
                <DropdownMenuItem>
                  <ArchiveRestore className="w-3 me-2 stroke-primary fill-primary" />{" "}
                  Orders
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link href={`/account/wishlist`}>
                <DropdownMenuItem>
                  <Heart className="w-3 me-2 stroke-primary fill-primary" />{" "}
                  Wishlist
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Power className="w-3 me-2 stroke-primary" />
                <LogoutButton className="w-full h-0 text-left font-normal px-0 cursor-default" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </span>
  );
};

export default AccountDropdown;
