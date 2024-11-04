import CartPage from "@/components/cart/CartPage";
import { getQueryClient } from "@/providers/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShopIN | Cart",
  description: "Manage your cart",
};

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
