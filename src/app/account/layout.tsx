import Sidebar from "@/components/account/sidebar/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShopIN | Account",
  description: "Manage your account",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className=" grid md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] md:gap-2 container mx-auto min-h-[calc(100vh-96px)] md:min-h-[calc(100vh-64px)] mt-24 md:mt-16 p-2">
      <Sidebar />
      <div className=" w-full h-full bg-white md:border rounded-md p-2">
        {/* TODO: add breadcrumbs */}
        {children}
      </div>
    </section>
  );
}
