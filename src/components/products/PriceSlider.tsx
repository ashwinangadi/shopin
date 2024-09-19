import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Slider } from "../ui/slider";

const PriceSlider = ({ data }: any) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlParams = new URLSearchParams(searchParams);

  const handleSliderChange = (values: number[]) => {
    const [priceMin, priceMax] = values; // Destructure the values array
    const params = new URLSearchParams(searchParams.toString());

    params.set("priceMin", priceMin.toString());
    params.set("priceMax", priceMax.toString());

    replace(`${pathname}?${params.toString()}`);
  };
  const dummyArray = [1, 2, 10];
  const priceRange = data?.data?.products
    ?.map((item: any) => Number(item.price))
    .sort((a: any, b: any) => a - b);

  const priceRangeMax = priceRange && Math.max(...priceRange);
  const priceRangeMin = priceRange && Math.min(...priceRange);
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
            onValueCommit={handleSliderChange}
          />
          <span className="text-xs flex items-center justify-between mt-1">
            <p>{priceRangeMin}</p>
            <p>{priceRangeMax}</p>
          </span>
        </div>
      ) : (
        <Slider
          defaultValue={[1, 10]}
          min={1}
          max={10}
          // onValueCommit={handleSliderChange}
        />
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
