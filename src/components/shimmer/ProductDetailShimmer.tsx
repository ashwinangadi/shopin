import React from "react";

const ProductDetailShimmer = () => {
  return (
    <div className="w-full container min-h-[calc(100vh-70px)] mx-auto bg-white my-2 p-3 rounded-md">
      <div className="md:grid grid-cols-12 gap-1">
        <div className="max-w-xl h-96 md:h-1/2 col-span-5 relative bg-primary/10 animate-pulse"></div>
        <div className="flex flex-col gap-1 col-span-7 ms-4 mt-10 md:mt-0">
          <p className="lg:text-xl xl:text-2xl w-full h-10 bg-primary/10 animate-pulse font-"></p>
          <p className="lg:text-xl xl:text-2xl w-1/2 h-10 bg-primary/10 animate-pulse font-"></p>
          {/* <h1 className="text-2xl font-bold">{data.title}</h1> */}
          <div className="space-y-4 ">
            <div className="flex flex-col ">
              <p className="text-sm text-gray-500 w-28 bg-primary/10 animate-pulse"></p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex text-xs text-white rounded-sm p-0.5 px-1.5 gap-1 bg-green-700 w-1/4 h-10 bg-primary/10 animate-pulse"></span>
            </div>

            <div className="flex items-end w-1/5 h-10 bg-primary/10 animate-pulse gap-2"></div>
            <div className="space-y-1">
              <span className="flex items-center w-1/6 h-5 bg-primary/10 animate-pulse gap-1"></span>
              <span className="flex items-center w-1/6 h-5 bg-primary/10 animate-pulse gap-1"></span>
            </div>
          </div>
          {/* Specifications */}
          <hr className="my-4" />
          <h2 className="text-xl font-semibold mb-3 h-10 w-1/3 bg-primary/10 animate-pulse"></h2>
          <div className="grid grid-cols-2 gap-3">
            <span className="flex flex-col gap-2 text-sm text-gray-500">
              <p className="h-5 w-1/5 bg-primary/10 animate-pulse"></p>
              <p className="h-5 w-1/5 bg-primary/10 animate-pulse"></p>
              <p className="h-5 w-1/5 bg-primary/10 animate-pulse"></p>
              <p className="h-5 w-1/5 bg-primary/10 animate-pulse"></p>
              <p className="h-5 w-1/5 bg-primary/10 animate-pulse"></p>
              <p className="h-5 w-1/5 bg-primary/10 animate-pulse"></p>
            </span>
            <span className="flex flex-col gap-2 text-sm text-gray-500">
              <p className="h-5 w-1/5 bg-primary/10 animate-pulse"></p>
              <p className="h-5 w-1/5 bg-primary/10 animate-pulse"></p>
              <p className="h-5 w-1/5 bg-primary/10 animate-pulse"></p>
              <p className="h-5 w-1/5 bg-primary/10 animate-pulse"></p>
              <p className="h-5 w-1/5 bg-primary/10 animate-pulse"></p>
              <p className="h-5 w-1/5 bg-primary/10 animate-pulse"></p>
            </span>
          </div>
          {/* Reviews */}
          <hr className="my-4" />
          <p className="text-xl font-semibold mb-3 h-10 w-1/3 bg-primary/10 animate-pulse"></p>
          <div className="flex flex-col gap-5">
            {Array(3)
              .fill(4)
              .map((review) => (
                <div key={review.reviewerName} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex text-xs text-white rounded-sm p-0.5 px-1.5 gap-1 bg-primary/10 animate-pulse w-1/12 h-5"></span>
                  </div>

                  <p className="w-1/6 h-5 bg-primary/10 animate-pulse"></p>
                  <p className="w-1/6 h-5 bg-primary/10 animate-pulse"></p>
                </div>
              ))}
          </div>
          <hr className="my-4" />
          <div className="flex items-center justify-center gap-2">
            <p className="text-md font-semi-bold text-gray-500"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailShimmer;
