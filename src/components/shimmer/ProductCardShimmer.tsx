import React from "react";

const ProductCardShimmer = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <span className="flex flex-col gap-2">
        <div className="h-[200px] w-[200px] bg-primary/10 animate-pulse rounded-sm"></div>
        <div className="h-[20px] w-[150px] bg-primary/10 animate-pulse rounded-sm"></div>
        <div className="h-[20px] w-[100px] bg-primary/10 animate-pulse rounded-sm"></div>
        <div className="h-[20px] w-[50px] bg-primary/10 animate-pulse rounded-sm"></div>
        <div className="h-[10px] w-[120px] bg-primary/10 animate-pulse rounded-sm"></div>
        <div className="h-[10px] w-[120px] bg-primary/10 animate-pulse rounded-sm"></div>
      </span>
    </div>
  );
};

export default ProductCardShimmer;
