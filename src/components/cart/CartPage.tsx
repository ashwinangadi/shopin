"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
const CartPage = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-[50vh] rounded-sm bg-white mt-2">
      <h1 className="text-lg font-light">Your cart is empty!</h1>
      <p className="text-sm font-light">Add items to it now.</p>
      <Link href={`/`} className="mt-3">
        <Button
          variant={"link"}
          className="border border-primary/40 hover:border-primary"
        >
          Shop Now
        </Button>
      </Link>

      {JSON.stringify(session)}
    </div>
  );
};

export default CartPage;
