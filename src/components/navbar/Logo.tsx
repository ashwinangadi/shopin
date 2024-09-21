import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={`/products`}>
      <p className="text-2xl font-extrabold">ShopIN</p>
    </Link>
  );
};

export default Logo;
