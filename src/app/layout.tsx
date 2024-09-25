import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { getQueryClient } from "@/providers/get-query-client";
import { categoryListOptions } from "@/utils/api/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import Provider from "@/providers/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopIN",
  description: "Shopping Application built on Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getQueryClient();

  // queryClient.prefetchQuery(dealsOptions);
  queryClient.prefetchQuery(categoryListOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Suspense>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <Navbar />
            </HydrationBoundary>
            {children}
          </Suspense>
        </Provider>
      </body>
    </html>
  );
}
