import React from "react";
import { Button } from "../ui/button";
import CategoriesList from "../catagories-list/CategoriesList";
import Search from "../search/Search";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <section className=" flex flex-col md:flex-row gap-1 items-center w-full h-20 md:h-16 bg-[#0f1111] text-white px-1 md:px-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-2">
          <CategoriesList />
          <p className="text-2xl font-extrabold">ShopIN</p>
        </div>
        <span className="hidden md:block w-full max-w-5xl">
          <Search placeholder="Search" />
        </span>
        {/* <p className="text-2xl ">SearchBar</p> */}
        <div className="flex items-center gap-3">
          <Button variant={"secondary"}>Login</Button>
          <ShoppingCart className="h-8 w-8" />
        </div>
      </div>
      <div className="w-full md:hidden">
        <Search placeholder="Search" />
      </div>
    </section>
  );
};

export default Navbar;
