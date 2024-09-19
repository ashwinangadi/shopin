import ProductsPage from "@/components/products/ProductsPage";
import { getQueryClient } from "@/providers/get-query-client";
import { getProducts } from "@/utils/api/api";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default function Home() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["products", null, "title", "asc", 0, null],
    queryFn: () => getProducts({}),
  });

  return (
    <main className="flex min-h-screen w-full mx-auto flex-col mt-24 md:mt-16 ">
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* <p className="">Page.tsx</p> */}
        <ProductsPage />
      </HydrationBoundary>
    </main>
  );
}
