import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShopIN | Account",
  description: "Shopping Application built on Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //   const queryClient = getQueryClient();

  //   // queryClient.prefetchQuery(dealsOptions);
  //   queryClient.prefetchQuery(categoryListOptions);
  //   connectToMongoDB()
  return (
    <section className="container min-h-[calc(100vh-96px)] md:min-h-[calc(100vh-64px)] mt-24 md:mt-16">
      {children}
    </section>
  );
}
