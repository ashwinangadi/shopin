import React from "react";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "../ui/button";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const KindAuth = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div>
      {!(await isAuthenticated()) ? (
        <>
          <span className="flex gap-2">
            <LoginLink className="btn btn-ghost sign-in-btn">
              <Button variant={"secondary"}>Sign in</Button>
            </LoginLink>
            <RegisterLink className="btn btn-dark">
              <Button variant={"secondary"}>Register</Button>
            </RegisterLink>
          </span>
        </>
      ) : (
        <div className="flex gap-3 items-center">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user?.picture} alt="@shadcn" />
            <AvatarFallback>
              {user.given_name[0]} {user.family_name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium -mb-1">
              {user.given_name} {user.family_name}
            </p>
            <LogoutLink className="font-medium text-sm text-slate-600">
              Sign out
            </LogoutLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default KindAuth;
