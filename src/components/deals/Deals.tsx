"use client";
import { Deal } from "@/types";
import { dealsOptions, getdeals } from "@/utils/api/api";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

const Deals = () => {
  const { data, isError, error, status, isPending } = useQuery(dealsOptions);

  console.log("data.message", isError,"asdf",isPending, status,"real_data", data);
  return (
    <div>
      <p>deals.tsx</p>
      {!isError
        ? data?.data?.deals.map((item: Deal) => {
            return (
              <p key={item.product_asin} className="text-black">
                {item.deal_id}
              </p>
            );
          })
        // ?<p>data fetched</p>
        : <p>{error.message}</p>}
    </div>
  );
};

export default Deals;
