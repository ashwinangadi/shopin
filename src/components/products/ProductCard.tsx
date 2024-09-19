import { Truck, UndoDot } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProductCard = ({
  id,
  thumbnail,
  title,
  brand,
  rating,
  price,
  discountPercentage,
  shippingInformation,
  returnPolicy,
}: any) => {
  return (
    <div key={id} className=" space-y-4 hover:shadow-lg">
      <Image
        src={thumbnail}
        alt=""
        width={200}
        height={200}
        className="mx-auto"
      />
      <div className="p-3 space-y-2">
        <div className="flex flex-col -space-y-1">
          <p className="">
            {title.length > 20 ? title.substring(0, 20) + "..." : title}
          </p>
          <p className="text-xs text-gray-500">{brand}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex text-xs text-white rounded-sm p-0.5 px-1.5 gap-1 bg-green-700 w-fit">
            <p>{rating}</p>
            <p className="text-[10px]">&#9733;</p>
          </span>
          <p className="text-sm">({Math.floor(Math.random() * 500)})</p>
        </div>

        <div className="flex items-end gap-2">
          <span className="flex items-start justify-start gap-1 ">
            <p className="text-sm leading-none">$</p>
            <p className="text-2xl font-semibold leading-none">{price}</p>
          </span>
          <div className="flex gap-2 md:gap-0 md:flex-col xl:flex-row xl:gap-2 h-full">
            <span className="flex gap-1">
              <p className="text-xs text-gray-500 leading-none pb-0.5">
                M.R.P:
              </p>
              <p className="text-xs text-gray-500 line-through leading-none pb-0.5">
                {(
                  parseFloat(price) +
                  parseFloat(price) * (parseFloat(discountPercentage) / 100)
                ).toFixed(2)}
              </p>
            </span>
            <p className="text-xs leading-none pb-0.5 text-green-700">
              ({discountPercentage}% off)
            </p>
          </div>
        </div>
        <div className="">
          <span className="flex items-center gap-1">
            <Truck className="w-4 h-4 text-gray-500" />
            <p className="text-xs text-gray-500">{shippingInformation}</p>
          </span>
          <span className="flex items-center gap-1">
            <UndoDot className="w-4 h-4 text-gray-500" />
            <p className="text-xs text-gray-500">{returnPolicy}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
