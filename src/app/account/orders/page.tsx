import { SelectSeparator } from "@/components/ui/select";
import React from "react";

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
