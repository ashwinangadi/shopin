import React from "react";
import { Heart } from "lucide-react";
const AddToWishlist = () => {
  return (
    <div>
      <Heart
        className="z-50 absolute h-5 w-5 hover:fill-red-500 fill-gray-200 stroke-slate-400 top-2 right-2 hover:cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          console.log("delete");
        }}
      />
    </div>
  );
};

export default AddToWishlist;
