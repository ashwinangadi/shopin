import { SelectSeparator } from "@/components/ui/select";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShopIN | My Orders",
  description: "Manage your orders",
};

const OrdersPage = () => {
  return (
    <div className="flex flex-col gap-2 ">
      <h1 className="text-xl font-medium py-3 px-5">My Orders</h1>
      <SelectSeparator className="w-full" />
      <p className="text-sm text-gray-500">Coming Soon...</p>
    </div>
  );
};

export default OrdersPage;
