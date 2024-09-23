import CartPage from "@/components/cart/CartPage";
import ProductDetailsPage from "@/components/productDetails/ProductDetailsPage";
import { getQueryClient } from "@/providers/get-query-client";
import { dehydrate, HydrationBoundary, useQuery } from "@tanstack/react-query";

export default function ProductIdHome({
  params,
}: {
  params: { productId: string };
}) {
  const queryClient = getQueryClient();

  return (
    <section className="flex min-h-[calc(100vh-96px)] container w-full mx-auto flex-col mt-24 md:mt-16 ">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CartPage />
      </HydrationBoundary>
    </section>
  );
}
