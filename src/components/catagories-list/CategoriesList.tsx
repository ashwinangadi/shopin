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

const CategoriesList = () => {
  const { data, isError, error, status, isLoading } =
    useQuery(categoryListOptions);
  console.log("data1234123", data);
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
              data?.map((item: any) => {
                return (
                  <Link key={item.id + item.name} href={`?${new URLSearchParams({category: item.slug})}`}>
                    <SheetClose asChild>
                      <p className="text-black py-3 ps-2 border-y hover:bg-input cursor-pointer">
                        {item.name}
                      </p>
                    </SheetClose>
                  </Link>
                );
              })
            ) : (
              // ?<p>data fetched</p>
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
