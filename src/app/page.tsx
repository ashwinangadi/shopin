import Deals from "@/components/deals/Deals";
import { getQueryClient } from "@/providers/get-query-client";
import { dealsOptions } from "@/utils/api/api";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default function Home() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery(dealsOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <p>Page.tsx</p>
        <Deals />
      </HydrationBoundary>
    </main>
  );
}
