import React from "react";
import { Button } from "../ui/button";
import { auth, signIn, signOut } from "../../../auth";
import { Power } from "lucide-react";
import Link from "next/link";

const AuthButtons = async () => {
  const session = await auth();
  return (
    <span className="flex items-center gap-2">
      {!session?.user ? (
        <Link href={`/api/auth/signin`}>
          <Button variant={"secondary"}> SignIn</Button>
        </Link>
      ) : (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button variant={"secondary"}>
            {" "}
            <Power className="w-3.5 me-2" /> Logout
          </Button>
        </form>
      )}
    </span>
  );
};

export default AuthButtons;
