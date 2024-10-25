"use client";

import DeleteProduct from "@/components/account/wishlist/delete-product";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const WishlistPage = ({ userId }: { userId: string | undefined }) => {
  const {
    data: WishlistData,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["wishlist", userId],
    queryFn: async () =>
      await axios.post("/api/wishlist/getwishlist", { userId }),
    enabled: !!userId,
  });

  const dataLength = WishlistData?.data.data.length;

  return (
    <div className="flex flex-col gap-2 ">
      <h1 className="text-xl font-medium py-3 px-5">
        My Wishlist ({dataLength ?? 0})
      </h1>
      <Separator className="w-full" />
      <div className="min-h-24">
        {!isLoading ? (
          !isError ? (
            dataLength > 0 ? (
              WishlistData?.data.data.map((item: any) => (
                <span key={item.id}>
                  <div className="flex gap-2 h-full relative">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                    {item.stock === 0 && (
                      <span className="absolute bottom-0 left-2.5 text-red-500 bg-white text-xs px-1 py-0.5">
                        Out of Stock
                      </span>
                    )}
                    <div className="flex flex-col justify-between min-h-full py-1">
                      <span>
                        <Link href={`/products/${item.id}`}>
                          <h1 className="text-sm md:text-base leading-snug">
                            {item.title}
                          </h1>
                        </Link>
                        <div className="flex items-center gap-3">
                          <span className="flex text-xs text-white rounded-sm p-0.5 px-1.5 gap-1 bg-green-700 w-fit">
                            <p>{item.rating}</p>
                            <p className="text-[10px]">&#9733;</p>
                          </span>
                          {/* <p className="text-sm">
                      ({Math.floor(Math.random() * 500)})
                    </p> */}
                        </div>
                      </span>
                      <span className="flex items-start justify-start gap-1 ">
                        <p className="text-sm leading-none">$</p>
                        <p className="text-xl font-semibold leading-none">
                          {item.price}
                        </p>
                      </span>
                    </div>

                    <DeleteProduct
                      userId={userId}
                      productId={item.id}
                      refetch={refetch}
                    />
                  </div>
                  <Separator className="w-full" />
                </span>
              ))
            ) : (
              <span className="flex flex-col items-center justify-center  mt-20">
                <h1 className="text-lg font-light">Your wishlist is empty!</h1>
                <Link href={`/`} className="mt-3">
                  <Button
                    variant={"link"}
                    className="border border-primary/40 hover:border-primary"
                  >
                    Add Now
                  </Button>
                </Link>
              </span>
            )
          ) : (
            <span className="flex flex-col items-center justify-center  mt-20">
              <p className="text-lg font-light">Something went wrong</p>
            </span>
          )
        ) : (
          <span className="flex flex-col items-center justify-center  mt-20">
            <Loader className="w-8 h-8 animate-spin" />
          </span>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
