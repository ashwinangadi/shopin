import ProductsPage from "@/components/productsList/ProductsPage";
import { getQueryClient } from "@/providers/get-query-client";
import { getProducts } from "@/utils/api/api";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { Suspense } from "react";

export default function ProductHome() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["products", null, "title", "asc", 0, null],
    queryFn: () => getProducts({}),
  });

  return (
    <section className="flex min-h-[calc(100vh-96px)] w-full mx-auto flex-col mt-24 md:mt-16 ">
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* <p className="">Page.tsx</p> */}
        <Suspense fallback={<Loader className="w-5 h-5 animate-spin" />}>
          <ProductsPage />
        </Suspense>
      </HydrationBoundary>
    </section>
  );
}
