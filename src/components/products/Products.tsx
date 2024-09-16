"use client";
import { urlParam } from "@/hooks/URL_Param";
import { getProducts } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";
import { Loader, Truck, UndoDot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const Products = () => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const sortBy = searchParams.get("sortBy");
  const orderBy = searchParams.get("order");
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["products", selectedCategory, sortBy, orderBy],
    queryFn: () => getProducts({ category: selectedCategory, sortBy, orderBy }),
  });

  const sorts = [
    {
      name: "A-Z",
      value: `?${new URLSearchParams(urlParam({ category: selectedCategory, sort: "title", order: "asc" }))}`,
    },
    {
      name: "Z-A",
      value: `?${new URLSearchParams(urlParam({ category: selectedCategory, sort: "title", order: "desc" }))}`,
    },
    {
      name: "Price: Low to High",
      value: `?${new URLSearchParams(urlParam({ category: selectedCategory, sort: "price", order: "asc" }))}`,
    },
    {
      name: "Price: High to Low",
      value: `?${new URLSearchParams(urlParam({ category: selectedCategory, sort: "price", order: "desc" }))}`,
    },
    {
      name: "Rating: Low to High",
      value: `?${new URLSearchParams(urlParam({ category: selectedCategory, sort: "rating", order: "asc" }))}`,
    },
    {
      name: "Rating: High to Low",
      value: `?${new URLSearchParams(urlParam({ category: selectedCategory, sort: "rating", order: "desc" }))}`,
    },
  ];

  return (
    <section className=" w-full container mx-auto py-10 space-y-4 ">
      <div className="flex justify-between items-center border rounded-md p-2 shadow-sm">
        <span className="flex items-center gap-2 ">
          {data?.total} results for{" "}
          <p className=" capitalize">
            &quot;
            {selectedCategory === null ? "All products" : selectedCategory.split("-").join(" ")}
            &quot;
          </p>
        </span>
        <span className="flex items-center gap-2 ">
          <p>Sort:</p>
          {sorts.map((item) => {
            return (
              <Link
                href={item.value}
                className="text-black hover:text-blue-500"
                key={item.name}
              >
                {item.name}
              </Link>
            );
          })}
        </span>
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  w-full gap-10">
        {!isLoading ? (
          !isError ? (
            data?.total > 0 ? (
              data?.products.map((item: any) => {
                return (
                  <div
                    key={item.id}
                    className="border rounded-md space-y-4 hover:shadow-lg"
                  >
                    <Image
                      src={item.thumbnail}
                      alt=""
                      width={250}
                      height={250}
                      className="mx-auto"
                    />
                    <div className="p-3 space-y-2">
                      <div className="flex flex-col -space-y-1">
                        <p className="">
                          {item.title.length > 20
                            ? item.title.substring(0, 20) + "..."
                            : item.title}
                        </p>
                        <p className="text-xs text-gray-500">{item.brand}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex text-xs text-white rounded-sm p-0.5 px-1.5 gap-1 bg-green-700 w-fit">
                          <p>{item.rating}</p>
                          <p className="text-[10px]">&#9733;</p>
                        </span>
                        <p className="text-sm">
                          ({Math.floor(Math.random() * 500)})
                        </p>
                      </div>

                      <div className="flex items-end gap-2">
                        <span className="flex items-start justify-start gap-1 ">
                          <p className="text-sm leading-none">$</p>
                          <p className="text-2xl font-semibold leading-none">
                            {item.price}
                          </p>
                        </span>
                        <span className="flex gap-1">
                          <p className="text-xs text-gray-500 leading-none pb-0.5">
                            M.R.P:
                          </p>
                          <p className="text-xs text-gray-500 line-through leading-none pb-0.5">
                            {(
                              parseFloat(item.price) +
                              parseFloat(item.price) *
                                (parseFloat(item.discountPercentage) / 100)
                            ).toFixed(2)}
                          </p>
                        </span>
                        <p className="text-xs leading-none pb-0.5 text-green-700">
                          ({item.discountPercentage}% off)
                        </p>
                      </div>
                      <div className="">
                        <span className="flex items-center gap-1">
                          <Truck className="w-4 h-4 text-gray-500" />
                          <p className="text-xs text-gray-500">
                            {item.shippingInformation}
                          </p>
                        </span>
                        <span className="flex items-center gap-1">
                          <UndoDot className="w-4 h-4 text-gray-500" />
                          <p className="text-xs text-gray-500">
                            {item.returnPolicy}
                          </p>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="col-span-full text-center h-[50vh] flex gap-2 items-center justify-center">
                Catagory does not exist! Select from{" "}
                <span className="font-bold">Catagory menu</span>{" "}
              </p>
            )
          ) : (
            <p>{error.message}</p>
          )
        ) : (
          <div className="col-span-full flex items-center h-[50vh] justify-center w-full">
            <Loader className="w-20 h-20 animate-spin" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
