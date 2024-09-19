import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Input } from "../ui/input";

const Filter = (data: any) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const urlParams = new URLSearchParams(searchParams.toString());

  const updateBrandParam = (brand: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    const currentBrands = params.getAll("brand");

    if (checked) {
      if (!currentBrands.includes(brand)) {
        currentBrands.push(brand);
      }
    } else {
      const index = currentBrands.indexOf(brand);
      if (index > -1) {
        currentBrands.splice(index, 1);
      }
    }

    params.delete("brand");
    currentBrands.forEach((b) => params.append("brand", b));

    const newURL = `${pathname}?${params.toString()}`;
    replace(newURL);
  };

  const updateRatingParam = (rating: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    console.log("params", typeof rating);
    const currentRatings = params.getAll("rating");
    console.log("currentRatings", currentRatings);
    if (checked) {
      if (!currentRatings.includes(rating)) {
        currentRatings.push(rating);
      }
    } else {
      const index = currentRatings.indexOf(rating);
      console.log("index", index, typeof rating);
      if (index > -1) {
        currentRatings.splice(index, 1);
      }
    }

    params.delete("rating");
    currentRatings.forEach((b) => params.append("rating", b));

    const newURL = `${pathname}?${params.toString()}`;
    replace(newURL);
  };

  const updateDiscountParam = (discount: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    const currentDiscount = params.getAll("discount");
    console.log("currentRatings", currentDiscount);
    if (checked) {
      if (!currentDiscount.includes(discount)) {
        currentDiscount.push(discount);
      }
    } else {
      const index = currentDiscount.indexOf(discount);
      console.log("index", index, typeof discount);
      if (index > -1) {
        currentDiscount.splice(index, 1);
      }
    }

    params.delete("discount");
    currentDiscount.forEach((b) => params.append("discount", b));

    const newURL = `${pathname}?${params.toString()}`;
    replace(newURL);
  };

  const filteredBrands = new Set(
    data?.data?.products?.map((item: any) => item.brand)
    //   .filter((brand: any) => (brand == undefined ? "Local Business" : brand))
  );

  const ratingArray = ["4", "3", "2", "1"];
  const discountArray = ["15", "10", "5", "1"];

  return (
    <div className="w-full relative p-2 md:py-3 md:mt-2 md:border rounded-md h-full md:h-[calc(100%-8px)] space-y-4 md:bg-white">
      {/* <div className="fixed top-20 text-xl"> */}
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium">Filter</p>
        <p className="text-sm text-orange-700">Clear All</p>
      </div>
      <hr />
      <div className="flex flex-col">
        <p className="uppercase text-sm font-medium mb-2">Brands</p>
        <div className="flex flex-col gap-1">
          {Array.from(filteredBrands).map((item: any) => {
            const brandName = item == undefined ? "Local Business" : item;
            return (
              <span
                key={brandName}
                className="flex items-center font-light gap-2 text-sm"
              >
                <Input
                  type="checkbox"
                  name="brandCheckbox"
                  checked={urlParams
                    .getAll("brand")
                    .includes(brandName.split(" ").join(""))}
                  onChange={(e) =>
                    updateBrandParam(
                      brandName.split(" ").join(""),
                      e.target.checked
                    )
                  }
                  className="w-4 h-4"
                />
                <p>{brandName}</p>
              </span>
            );
          })}
        </div>
      </div>
      <div>
        <p className="uppercase text-sm font-medium mb-2">CustomeR RATING</p>
        <div className="flex flex-col gap-1">
          {ratingArray.map((item: any) => {
            return (
              <span
                key={item}
                className="flex items-center font-light gap-2 text-sm"
              >
                <Input
                  type="checkbox"
                  name="ratingCheckbox"
                  checked={urlParams.getAll("rating").includes(item)}
                  onChange={(e) => updateRatingParam(item, e.target.checked)}
                  className="w-4 h-4"
                />
                <p>
                  {item} <span className="text-orange-500"> &#9733;</span> and
                  above{" "}
                </p>
              </span>
            );
          })}
        </div>
      </div>
      <div>
        <p className="uppercase text-sm font-medium mb-2">Discount</p>
        <div className="flex flex-col gap-1">
          {discountArray.map((item: any) => {
            return (
              <span
                key={item}
                className="flex items-center font-light gap-2 text-sm"
              >
                <Input
                  type="checkbox"
                  name="discountCheckbox"
                  checked={urlParams.getAll("discount").includes(item)}
                  onChange={(e) => updateDiscountParam(item, e.target.checked)}
                  className="w-4 h-4"
                />
                <p>{item}% or more</p>
              </span>
            );
          })}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Filter;
