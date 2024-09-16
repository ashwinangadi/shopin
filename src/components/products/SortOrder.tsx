import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { urlParam } from "@/hooks/URL_Param";
import { useRouter, useSearchParams } from "next/navigation";

const SortOrder = ({
  selectedCategory,
  sortBy,
  orderBy,
}: {
  selectedCategory: string | null;
  sortBy: string ;
  orderBy: string ;
}) => {
  const router = useRouter();
  const sorts = [
    {
      name: "Title: A-Z",
      value: `?${new URLSearchParams(urlParam({ category: selectedCategory, sort: "title", order: "asc" }))}`,
    },
    {
      name: "Title: Z-A",
      value: `?${new URLSearchParams(urlParam({ category: selectedCategory, sort: "title", order: "desc" }))}`,
    },
    {
      name: "Price: Low to High",
      value: `?${new URLSearchParams(urlParam({ category: selectedCategory, sort: "price", order: "asc" }))}`,
    },
    {
      name: "Price: High to Low",
      value: `?${new URLSearchParams(urlParam({ category: selectedCategory, sort: "price", order: "desc" }))}`,
    },
    {
      name: "Rating: Low to High",
      value: `?${new URLSearchParams(urlParam({ category: selectedCategory, sort: "rating", order: "asc" }))}`,
    },
    {
      name: "Rating: High to Low",
      value: `?${new URLSearchParams(urlParam({ category: selectedCategory, sort: "rating", order: "desc" }))}`,
    },
  ];
  return (
    <span className="flex items-center gap-2 ">
      <Select
        value={`?${new URLSearchParams(urlParam({ category: selectedCategory, sort: sortBy, order: orderBy }))}`}
        // defaultValue={sorts[0].value}
        onValueChange={(value) => router.push(value)}
      >
        <SelectTrigger className="w-[200px] text-xs">
          Sort by: <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          {sorts.map((item) => {
            return (
              <SelectItem key={item.name} value={item.value}>
                {item.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </span>
  );
};

export default SortOrder;
