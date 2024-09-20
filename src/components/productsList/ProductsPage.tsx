"use client";
import { getProducts, LIMIT } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import SortOrder from "./SortOrder";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import ProductCount from "./ProductCount";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import ProductsPagination from "./ProductsPagination";
import { Product } from "@/types";
import Link from "next/link";

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
      // searchQuery,
    ],
    queryFn: () =>
      getProducts({
        category: selectedCategory,
        sortBy,
        orderBy,
        limit,
        skip,
        // searchQuery,
      }),
  });

  // ---------------------------------------------------------------------------------------------------------------
  // Filter logic
  const filterBrands = searchParams.getAll("brand");
  const filterRatings = searchParams.getAll("rating").sort();
  const filterAvailability = searchParams.getAll("availability");
  const filterDiscount = searchParams.getAll("discount");
  const filterPriceMin = searchParams.get("priceMin");
  const filterPriceMax = searchParams.get("priceMax");

  const filteredProducts = useMemo(
    () =>
      data?.products
        .filter((product: Product) => {
          // Brand Filter
          return filterBrands.length > 0
            ? filterBrands.includes(
                product?.brand !== undefined
                  ? product?.brand?.split(" ").join("_").toLowerCase()
                  : "local_business"
              )
            : product;
        })
        .filter((product: Product) => {
          // Availability Filter
          return filterAvailability.length > 0
            ? filterAvailability.includes(
                product?.availabilityStatus?.split(" ").join("_").toLowerCase()
              )
            : product;
        })
        .filter((product: Product) =>
          filterRatings.length > 0
            ? filterRatings.some((rate) => {
                return +product.rating >= Number(rate);
              })
            : product
        )
        .filter((product: Product) =>
          filterDiscount.length > 0
            ? filterDiscount.some((rate) => {
                return +product.discountPercentage >= Number(rate);
              })
            : product
        )
        .filter((product: Product) => {
          return filterPriceMin && filterPriceMax
            ? +product.price >= +filterPriceMin &&
                +product.price <= +filterPriceMax
            : product;
        }),
    [
      filterPriceMin,
      filterPriceMax,
      filterAvailability,
      filterRatings,
      filterDiscount,
      filterBrands,
      data?.products,
    ]
  );

  // ---------------------------------------------------------------------------------------------------------------
  return (
    <section className="grid md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] w-full max-w-[1680px] min-h-[calc(100vh-60px)] mx-auto pb-1 gap-1 px-1 ">
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
        <div className="bg-white p-1.5 min-h-[calc(100vh-140px)] border rounded-md">
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
                  filteredProducts.length > 0 ? (
                    filteredProducts.map((item: Product) => {
                      return (
                        <Link href={`/products/${item.id}`} key={item.id}>
                          <ProductCard
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
                        </Link>
                      );
                    })
                  ) : (
                    <p className="col-span-full text-center h-[75vh] flex gap-2 items-center justify-center">
                      Products not available for the filters applied!
                    </p>
                  )
                ) : (
                  <p className="col-span-full text-center h-[75vh] flex gap-2 items-center justify-center">
                    Catagory does not exist! Select from{" "}
                    <span className="font-bold">Catagory menu</span>{" "}
                  </p>
                )
              ) : (
                <p className="col-span-full flex items-center h-[75vh] justify-center w-full">
                  {"asdf"}
                </p>
              )
            ) : (
              <div className="col-span-full flex items-center h-[75vh] justify-center w-full">
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
