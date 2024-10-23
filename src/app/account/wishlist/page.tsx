import WishlistPage from "@/components/account/wishlist/wishlist-page";
import React from "react";
import { auth } from "../../../../auth";

const WishlistHome = async () => {
  const session = await auth();
  return <WishlistPage userId={session?.user?.id} />;
};

export default WishlistHome;
