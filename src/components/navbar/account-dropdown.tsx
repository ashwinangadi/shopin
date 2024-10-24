import React from "react";
import { Button } from "../ui/button";
import { auth } from "../../../auth";
import { ArchiveRestore, CircleUser, Heart, Power } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "../auth/logout-button";
import AccountAvatar from "./account-avatar";

const AccountDropdown = async () => {
  const session = await auth();
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
              <AccountAvatar userId={session?.user?.id} />
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
