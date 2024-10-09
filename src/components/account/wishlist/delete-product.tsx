"use client";

import { Trash } from "lucide-react";
import React from "react";

const DeleteProduct = () => {
  return (
    <div>
      <Trash
        className="absolute h-4 w-5 fill-gray-200 stroke-slate-400 top-2 right-2 hover:cursor-pointer"
        onClick={() => {
          console.log("delete");
        }}
      />
    </div>
  );
};

export default DeleteProduct;
