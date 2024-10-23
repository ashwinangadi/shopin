import ProductsPage from "@/components/productsList/ProductsPage";
import { getQueryClient } from "@/providers/get-query-client";
import { getProducts } from "@/utils/api/api";
import { auth } from "../../../auth";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { Suspense } from "react";

export default async function ProductHome() {
  const queryClient = getQueryClient();
  const session = await auth();

  queryClient.prefetchQuery({
    queryKey: ["products", null, "title", "asc", 0, null],
    queryFn: () => getProducts({}),
  });

  return (
    <section className="flex min-h-[calc(100vh-96px)] w-full mx-auto flex-col mt-24 md:mt-16 ">
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* <p className="">Page.tsx</p> */}
        <Suspense fallback={<Loader className="w-5 h-5 animate-spin" />}>
          <ProductsPage userId={session?.user?.id} />
        </Suspense>
      </HydrationBoundary>
    </section>
  );
}
