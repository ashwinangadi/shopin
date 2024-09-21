"use client";
import { getProducts, getSingleProduct } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ImageCarousel } from "./ImageCarousel";
import { BadgeCheck, Loader, ShieldCheck, Truck, UndoDot } from "lucide-react";
import SimilarProducts from "./SimilarProducts";
import { Review } from "@/types";
import { Button } from "../ui/button";
import ProductDetailShimmer from "../shimmer/ProductDetailShimmer";

const ProductDetailsPage = ({ productId }: { productId: string }) => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["productsDetails", productId],
    queryFn: () => getSingleProduct(productId),
  });

  // const {title, brand, rating, price, discountPercentage, returnPolicy, shippingInformation} = data
  // console.log(data);
  return (
    <section className="w-full container min-h-[calc(100vh-70px)] mx-auto bg-white my-2 p-3 rounded-md">
      {!isLoading ? (
        !isError ? (
          <div className="md:grid grid-cols-12 gap-1">
            <div className="max-w-xl col-span-5 relative">
              <ImageCarousel images={data.images} />
            </div>
            <div className="flex flex-col gap-1 col-span-7 ms-4 mt-10 md:mt-0">
              <h1 className="lg:text-xl xl:text-2xl font-">
                {data.description}
              </h1>
              {/* <h1 className="text-2xl font-bold">{data.title}</h1> */}
              <div className="space-y-4 ">
                <div className="flex flex-col ">
                  {/* <p className="">
                  {data.title.length > 20
                    ? data.title.substring(0, 20) + "..."
                    : data.title}
                </p> */}
                  <p className="text-sm text-gray-500">
                    {data.brand ? data.brand : "Local Business"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex text-xs text-white rounded-sm p-0.5 px-1.5 gap-1 bg-green-700 w-fit">
                    <p>{data.rating}</p>
                    <p className="text-[10px]">&#9733;</p>
                  </span>
                  <p className="text-sm font-semibold text-muted-foreground">
                    {Math.floor(Math.random() * 500)} Ratings &{" "}
                    {data.reviews.length} Reviews
                  </p>
                </div>

                <div className="flex items-end gap-2">
                  <span className="flex items-start justify-start gap-1 ">
                    <p className="text-sm leading-none">$</p>
                    <p className="text-3xl font-semibold leading-none">
                      {data.price}
                    </p>
                  </span>
                  <div className="flex gap-2 flex-row h-full">
                    <span className="flex gap-1">
                      <p className="text-md text-gray-500 line-through leading-none pb-0.5">
                        {(
                          data.price +
                          data.price * (data.discountPercentage / 100)
                        ).toFixed(2)}
                      </p>
                    </span>
                    <p className="text-md leading-none pb-0.5 text-green-700">
                      ({data.discountPercentage}% off)
                    </p>
                  </div>
                </div>
                <div className="">
                  <span className="flex items-center gap-1">
                    <Truck className="w-4 h-4 text-gray-500" />
                    <p className="text-xs text-gray-500">
                      {data.shippingInformation}
                    </p>
                  </span>
                  <span className="flex items-center gap-1">
                    <UndoDot className="w-4 h-4 text-gray-500" />
                    <p className="text-xs text-gray-500">{data.returnPolicy}</p>
                  </span>
                </div>
              </div>
              {/* Specifications */}
              <hr className="my-4" />
              <h2 className="text-xl font-semibold mb-3">Specifications</h2>
              <div className="grid grid-cols-2 gap-3">
                <span className="flex flex-col gap-2 text-sm text-gray-500">
                  <p>Model Name</p>
                  <p>SKU</p>
                  <p>Warranty</p>
                  <p>Weight</p>
                  <p>Width</p>
                  <p>Height</p>
                  <p>Depth</p>
                </span>
                <span className="flex flex-col gap-2 text-sm text-gray-500">
                  <p>{data.title}</p>
                  <p>{data.sku}</p>
                  <p>{data.warrantyInformation}</p>
                  <p>{data.weight}</p>
                  <p>{data.dimensions.width}</p>
                  <p>{data.dimensions.height}</p>
                  <p>{data.dimensions.depth}</p>
                </span>
              </div>
              {/* Reviews */}
              <hr className="my-4" />
              <h2 className="text-xl font-semibold mb-3">Reviews</h2>
              <div className="flex flex-col gap-5">
                {data.reviews.map((review: Review) => (
                  <div
                    key={review.reviewerName}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex text-xs text-white rounded-sm p-0.5 px-1.5 gap-1 bg-green-700 w-fit">
                        <p>{review.rating}</p>
                        <p className="text-[10px]">&#9733;</p>
                      </span>
                      <p className="text-sm text-gray-500">
                        {review.reviewerName}
                      </p>
                    </div>

                    <p className="text-sm text-gray-500">
                      Reviewed on {review.date.split("T")[0]}
                    </p>

                    <p className="text-md text-gray-800">{review.comment}</p>
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="w-5 h-5 fill-primary/40 stroke-white" />
                      <p className="text-sm text-gray-500">Verified Customer</p>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="my-4" />
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-7 h-7 fill-primary/80 stroke-white" />
                <p className="text-md font-semi-bold text-gray-500">
                  Safe and Secure Payments, Easy returns, 100% Authentic
                  products.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="col-span-full flex items-center  justify-center w-full">
            {"asdf"}
          </p>
        )
      ) : (
        <div className="col-span-full flex items-center  justify-center w-full">
          <ProductDetailShimmer />
        </div>
      )}
      <SimilarProducts catagory={data?.category} productId={productId} />
    </section>
  );
};

export default ProductDetailsPage;
