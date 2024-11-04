import WishlistPage from "@/components/account/wishlist/wishlist-page";
import React from "react";
import { auth } from "../../../../auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShopIN | Wishlist",
  description: "Manage your wishlist",
};

const WishlistHome = async () => {
  const session = await auth();
  return <WishlistPage userId={session?.user?.id} />;
};

export default WishlistHome;
