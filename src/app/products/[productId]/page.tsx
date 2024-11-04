import ProductDetailsPage from "@/components/productDetails/ProductDetailsPage";
import { getQueryClient } from "@/providers/get-query-client";
import { getSingleProduct } from "@/utils/api/api";
import { dehydrate, HydrationBoundary, useQuery } from "@tanstack/react-query";
import { auth } from "../../../../auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShopIN | Product Details",
  description: "Explore detailed information about a specific product",
};

export default async function ProductIdHome({
  params,
}: {
  params: { productId: string };
}) {
  const session = await auth();
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["productsDetails", params.productId],
    queryFn: () => getSingleProduct(params.productId),
  });

  return (
    <section className="flex min-h-[calc(100vh-96px)] w-full mx-auto flex-col mt-24 md:mt-16 ">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductDetailsPage
          userId={session?.user?.id}
          productId={params.productId}
        />
      </HydrationBoundary>
    </section>
  );
}
