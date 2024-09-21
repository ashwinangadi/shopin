"use client";
import { categoryListOptions } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Loader, Menu } from "lucide-react";
import Link from "next/link";
import { urlParam } from "@/hooks/URL_Param";
import { useSearchParams } from "next/navigation";

const CategoriesList = () => {
  const { data, isError, error, status, isLoading } =
    useQuery(categoryListOptions);

  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "rating";
  const orderBy = searchParams.get("order") || "desc";
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className="overflow-auto">
        <SheetHeader className="">
          <SheetTitle>Hello, SignIn</SheetTitle>
        </SheetHeader>

        {!isLoading ? (
          !isError ? (
            <>
              <Link
                href={`/products?${new URLSearchParams(urlParam({ category: null, sort: sortBy, order: orderBy }))}`}
              >
                <SheetClose asChild>
                  <p className="text-black py-3 ps-2 border-y hover:bg-input cursor-pointer">
                    All Products
                  </p>
                </SheetClose>
              </Link>
              {data?.map((item: any) => {
                return (
                  // <Link key={item.id + item.name} href={`?${new URLSearchParams({category: item.slug})}`}>
                  <Link
                    key={item.id + item.name}
                    href={`/products?${new URLSearchParams(urlParam({ category: item.slug, sort: sortBy, order: orderBy }))}`}
                  >
                    <SheetClose asChild>
                      <p className="text-black py-3 ps-2 border-y hover:bg-input cursor-pointer">
                        {item.name}
                      </p>
                    </SheetClose>
                  </Link>
                );
              })}
            </>
          ) : (
            <p>{error.message}</p>
          )
        ) : (
          <div className="col-span-full flex items-center justify-center w-full">
            <Loader className="w-14 h-14 animate-spin" />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CategoriesList;
