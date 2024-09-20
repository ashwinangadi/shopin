import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FilterCard from "./FilterCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PriceSlider from "./PriceSlider";
import { DataList } from "@/types";

const Filter = ({ data }: { data: DataList }) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("brand");
    params.delete("rating");
    params.delete("discount");
    params.delete("availability");
    params.delete("priceMin");
    params.delete("priceMax");

    const newURL = `${pathname}?${params.toString()}`;
    replace(newURL);
  };

  const filteredBrands = new Set(
    data?.products?.map((item: any) => item.brand)
  );
  const availability = new Set(
    data?.products?.map((item: any) => item.availabilityStatus)
  );
  const ratingArray = ["4", "3", "2", "1"];
  const discountArray = ["15", "10", "5"];

  return (
    <div className="w-full relative p-2 md:py-3 md:mt-2 md:border rounded-md h-full md:h-[calc(100%-8px)] space-y-4 md:bg-white">
      {/* <div className="fixed top-20 text-xl"> */}
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium">Filter</p>
        <p
          className="text-sm text-orange-700 cursor-pointer"
          onClick={handleClearFilter}
        >
          Clear All
        </p>
      </div>
      <hr />
      <PriceSlider data={data} />
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            {Array.from(filteredBrands).map((item: any) => (
              <FilterCard
                key={item}
                item={item}
                queryName="brand"
                itemType="text"
              />
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Customer Rating</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            {ratingArray.map((item: any) => (
              <FilterCard
                key={item}
                item={item}
                queryName="rating"
                description=" and above"
                itemType="number"
              />
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Discount</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            {discountArray.map((item: any) => {
              return (
                <FilterCard
                  key={item}
                  item={item}
                  queryName="discount"
                  description="% or more"
                  itemType="number"
                />
              );
            })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Availability</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            {Array.from(availability).map((item: any) => {
              return (
                <FilterCard
                  key={item}
                  item={item}
                  queryName="availability"
                  //   description=" % or more"
                  itemType="text"
                />
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* </div> */}
    </div>
  );
};

export default Filter;
