import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useMemo, useState, useEffect } from "react";
import { Slider } from "../ui/slider";
import { Product, DataList } from "@/types";

const PriceSlider = ({ data }: { data: DataList }) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams(searchParams);

  const priceRange = useMemo(
    () =>
      data?.products
        ?.map((item: Product) => Number(item.price))
        .sort((a: any, b: any) => a - b),
    [data?.products]
  );

  const priceRangeMax = priceRange && Math.max(...priceRange);
  const priceRangeMin = priceRange && Math.min(...priceRange);

  const [priceValues, setPriceValues] = useState<number[]>([0, 0]);

  useEffect(() => {
    if (urlParams.get("priceMin")) {
      setPriceValues([
        Number(urlParams.get("priceMin")),
        Number(urlParams.get("priceMax")),
      ]);
    } else if (priceRangeMin && priceRangeMax) {
      setPriceValues([priceRangeMin, priceRangeMax]);
    }
  }, [searchParams, priceRangeMin, priceRangeMax]);

  const handleSliderChange = (values: number[]) => {
    setPriceValues(values);
  };

  const handleSliderCommit = (values: number[]) => {
    const [priceMin, priceMax] = values;
    const params = new URLSearchParams(searchParams.toString());

    params.set("priceMin", priceMin.toString());
    params.set("priceMax", priceMax.toString());

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <p className="flex flex-1 items-center justify-between pb-4 text-sm font-medium ">
        Price
      </p>
      {priceRange ? (
        <div>
          <Slider
            defaultValue={[priceRangeMin, priceRangeMax]}
            min={priceRangeMin}
            max={priceRangeMax}
            value={priceValues}
            onValueChange={handleSliderChange}
            onValueCommit={handleSliderCommit}
          />
          <span className="text-xs flex items-center justify-between mt-1">
            <p>{priceRangeMin}</p>
            <p>{priceRangeMax}</p>
          </span>
        </div>
      ) : (
        <div>
          <Slider
            defaultValue={[1, 10]}
            min={1}
            max={10}
            // onValueCommit={handleSliderChange}
          />
        </div>
      )}

      <span className="text-sm font-medium flex items-center justify-center mt-1 gap-3">
        <p className="border rounded-md p-2">
          {urlParams.get("priceMin") ? urlParams.get("priceMin") : "Min Price"}
        </p>
        <p>to</p>
        <p className="border rounded-md p-2">
          {urlParams.get("priceMax") ? urlParams.get("priceMax") : "Max Price"}
        </p>
      </span>
    </div>
  );
};
export default PriceSlider;
