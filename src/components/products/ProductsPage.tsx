"use client";
import { getProducts, LIMIT } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";
import SortOrder from "./SortOrder";
import PaginationProduct from "./ProductsPagination";
import ProductCard from "./ProductCard";

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const sortBy = searchParams.get("sortBy") || "title";
  const orderBy = searchParams.get("order") || "asc";
  const limit = Number(searchParams.get("limit")) || LIMIT;
  const skip = Number(searchParams.get("skip")) || 0;
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["products", selectedCategory, sortBy, orderBy, skip],
    queryFn: () =>
      getProducts({ category: selectedCategory, sortBy, orderBy, limit, skip }),
  });
  return (
    <section className=" w-full container mx-auto pb-10 space-y-4 ">
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center border-b p-2">
        <span className="flex items-center gap-1 text-xs md:text-sm">
          <p>
            {skip + 1} -{" "}
            {skip + limit > data?.total ? data?.total : skip + limit} of{" "}
            {data?.total} results{" "}
          </p>
          <p className="flex gap-1">
            for
            <span className="capitalize text-orange-700">
              &quot;
              {selectedCategory === null
                ? "All products"
                : selectedCategory.split("-").join(" ")}
              &quot;
            </span>
          </p>
        </span>
        <SortOrder
          selectedCategory={selectedCategory}
          sortBy={sortBy}
          orderBy={orderBy}
        />
      </div>
      <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  w-full gap-10">
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
      {data?.total > 20 && <PaginationProduct totalProduct={data?.total} />}
    </section>
  );
};

export default ProductsPage;
