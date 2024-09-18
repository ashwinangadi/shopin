import React from "react";

const ProductCount = ({
  skip,
  limit,
  data,
  selectedCategory,
  searchQuery,
}: any) => {
  return (
    <div className="flex flex-row items-center gap-1 text-xs md:text-sm">
      <p>
        {skip + 1} -{skip + limit > data?.total ? data?.total : skip + limit} of{" "}
        {data?.total} results{" "}
      </p>

      <p className="flex gap-1">
        for
        <span className="capitalize text-orange-700">
          &quot;
          {selectedCategory !== null
            ? selectedCategory.split("-").join(" ")
            : searchQuery
              ? searchQuery
              : "All Products"}
          &quot;
        </span>
      </p>
    </div>
  );
};
export default ProductCount;
