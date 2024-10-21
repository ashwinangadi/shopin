import { getProducts } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useMemo } from "react";
import ProductCard from "../productsList/ProductCard";
import { Loader } from "lucide-react";
import { Product } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import ProductCardShimmer from "../shimmer/ProductCardShimmer";

const SimilarProducts = ({ catagory, productId }: any) => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["products", catagory],
    queryFn: () => getProducts({ category: catagory }),
  });

  const similarProducts = useMemo(
    () => data?.products?.filter((item: any) => +item.id !== +productId),
    [data?.products, productId]
  );

  return (
    <div className="">
      <hr className="my-4 w-full" />
      <h2 className="text-xl font-semibold mb-3">Similar Products</h2>
      <div className="flex">
        {!isLoading ? (
          !isError ? (
            data?.total > 0 ? (
              <>
                <div className="gap-5 flex overflow-auto w-full min-w-xs">
                  {similarProducts?.map((item: Product) => {
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
                          stock={item.stock}
                        />
                      </Link>
                    );
                  })}
                </div>
              </>
            ) : (
              <p className="col-span-full text-center  flex gap-2 items-center justify-center">
                Catagory does not exist! Select from{" "}
                <span className="font-bold">Catagory menu</span>{" "}
              </p>
            )
          ) : (
            <p className="col-span-full flex items-center  justify-center w-full">
              {"asdf"}
            </p>
          )
        ) : (
          <div className="col-span-full flex gap-5 overflow-auto">
            {Array(4)
              .fill(4)
              .map((item, index) => {
                return (
                  <div key={index} className="w-full max-w-xs">
                    <ProductCardShimmer />
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimilarProducts;
