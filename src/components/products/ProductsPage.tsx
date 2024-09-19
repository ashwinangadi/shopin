"use client";
import { getProducts, LIMIT } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";
import SortOrder from "./SortOrder";
import PaginationProduct from "./ProductsPagination";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import ProductCount from "./ProductCount";
import { Button } from "../ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ProductsPagination from "./ProductsPagination";

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const sortBy = searchParams.get("sortBy") || "title";
  const orderBy = searchParams.get("order") || "asc";
  const searchQuery = searchParams.get("query");
  const limit = Number(searchParams.get("limit")) || LIMIT;
  const skip = Number(searchParams.get("skip")) || 0;
  const { data, isError, error, isLoading } = useQuery({
    queryKey: [
      "products",
      selectedCategory,
      sortBy,
      orderBy,
      skip,
      searchQuery,
    ],
    queryFn: () =>
      getProducts({
        category: selectedCategory,
        sortBy,
        orderBy,
        limit,
        skip,
        searchQuery,
      }),
  });
  return (
    <section className="grid md:grid-cols-[250px_1fr] w-full max-w-[1680px] min-h-[calc(100vh-60px)] mx-auto pb-1 gap-1 px-1 ">
      <span className="hidden md:block">
        <Filter data={data} />
      </span>
      <div className="flex-1 space-y-1 mt-2">
        <div className="flex justify-between items-center bg-white border rounded-md p-2">
          <div className="md:hidden">
            <Drawer>
              <DrawerTrigger className="border border-input bg-background shadow-sm p-2 px-4 hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Filter
              </DrawerTrigger>
              <DrawerContent>
                <Filter data={data} />
              </DrawerContent>
            </Drawer>
          </div>
          <span className="hidden md:block ">
            <ProductCount
              skip={skip}
              limit={limit}
              data={data}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
            />
          </span>
          <SortOrder
            selectedCategory={selectedCategory}
            sortBy={sortBy}
            orderBy={orderBy}
          />
        </div>
        <div className="bg-white p-1.5 border rounded-md">
          <span className="md:hidden">
            <ProductCount
              skip={skip}
              limit={limit}
              data={data}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
            />
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-6 ">
            {!isLoading ? (
              !isError ? (
                data?.total > 0 ? (
                  data?.products.map((item: any) => {
                    return (
                      <ProductCard
                        key={item.id}
                        id={item.id}
                        thumbnail={item.thumbnail}
                        title={item.title}
                        brand={item.brand}
                        rating={item.rating}
                        price={item.price}
                        discountPercentage={item.discountPercentage}
                        shippingInformation={item.shippingInformation}
                        returnPolicy={item.returnPolicy}
                      />
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
          {data?.total > 20 && (
            <ProductsPagination totalProduct={data?.total} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
