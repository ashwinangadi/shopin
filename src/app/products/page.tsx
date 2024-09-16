
import Products from "@/components/products/Products";
import { getQueryClient } from "@/providers/get-query-client";
import { getProducts } from "@/utils/api/api";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default function Home() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["products", null],
    queryFn: () => getProducts({}),
  });

  return (
    <main className="flex min-h-screen w-full mx-auto flex-col ">
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* <p className="">Page.tsx</p> */}
        <Products />
      </HydrationBoundary>
    </main>
  );
}
