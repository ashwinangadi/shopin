"use client";
import { getSingleProduct } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ProductDetailsPage = ({ productId }: { productId: string }) => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["productsDetails", productId],
    queryFn: () => getSingleProduct(productId),
  });

  return (
    <section className="grid w-full container min-h-[calc(100vh-60px)] mx-auto pb-1 gap-1 px-1">
      ProductDetailsPage {productId}
    </section>
  );
};

export default ProductDetailsPage;
