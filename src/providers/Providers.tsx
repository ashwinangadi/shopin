"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import type * as React from "react";
import { getQueryClient } from "./get-query-client";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import { Loader } from "lucide-react";

export default function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loader className="w-5 h-5 animate-spin" />}>
          {children}
        </Suspense>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
}
