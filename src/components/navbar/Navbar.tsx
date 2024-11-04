import React, { Suspense } from "react";
import CategoriesList from "../catagories-list/CategoriesList";
import Search from "../search/Search";
import { Loader, ShoppingCart } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";
import AccountDropdown from "./account-dropdown";
import { getQueryClient } from "@/providers/get-query-client";
import { categoryListOptions } from "@/utils/api/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const Navbar = () => {
  const categoryQueryClient = getQueryClient();
  categoryQueryClient.prefetchQuery(categoryListOptions);
  return (
    <section className="fixed top-0 flex flex-col md:flex-row gap-1 items-center w-full h-24 md:h-16 bg-primary text-white px-1 md:px-4 z-50">
      <div className="flex items-center justify-between py-2 w-full">
        <div className="flex gap-2">
          <HydrationBoundary state={dehydrate(categoryQueryClient)}>
            <CategoriesList />
          </HydrationBoundary>
          <Logo />
        </div>
        <span className="hidden md:block w-full max-w-5xl">
          <Suspense fallback={<Loader className="w-5 h-5 animate-spin" />}>
            <Search placeholder="Search" />
          </Suspense>
        </span>
        <div className="flex items-center gap-3">
          <AccountDropdown />

          <Link href={`/cart`}>
            <ShoppingCart className="h-8 w-8" />
          </Link>
        </div>
      </div>
      <div className="w-full md:hidden">
        <Suspense fallback={<Loader className="w-5 h-5 animate-spin" />}>
          <Search placeholder="Search" />
        </Suspense>
      </div>
    </section>
  );
};

export default Navbar;
