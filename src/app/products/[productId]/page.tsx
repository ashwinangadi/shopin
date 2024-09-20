import ProductDetailsPage from "@/components/productDetails/ProductDetailsPage";
import { getQueryClient } from "@/providers/get-query-client";
import { getSingleProduct } from "@/utils/api/api";
import { dehydrate, HydrationBoundary, useQuery } from "@tanstack/react-query";

export default function Page({ params }: { params: { productId: string } }) {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["productsDetails", params.productId],
    queryFn: () => getSingleProduct(params.productId),
  });

  return (
    <section className="flex min-h-[calc(100vh-96px)] w-full mx-auto flex-col mt-24 md:mt-16 ">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductDetailsPage productId={params.productId} />
      </HydrationBoundary>
    </section>
  );
}
