import React from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import CategoriesList from "../catagories-list/CategoriesList";
import { getQueryClient } from "@/providers/get-query-client";
import { categoryListOptions } from "@/utils/api/api";

const Navbar = () => {
  //   const queryClient = getQueryClient();

  //   queryClient.prefetchQuery(categoryListOptions);
  return (
    <section className="flex items-center justify-between h-16 bg-[#0f1111] text-white px-4">
      <div className="flex gap-2">
        <CategoriesList />
        <p className="text-2xl font-extrabold">ShopIN</p>
      </div>
      <p className="text-2xl ">SearchBar</p>
      <div className="flex gap-2">
        <Button variant={"ghost"}>Login</Button>
        <p className="text-2xl ">Cart</p>
      </div>
    </section>
  );
};

export default Navbar;
