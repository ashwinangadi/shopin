import DeleteProduct from "@/components/account/wishlist/delete-product";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const WishlistPage = () => {
  return (
    <div className="flex flex-col gap-2 ">
      <h1 className="text-xl font-medium py-3 px-5">
        My Wishlist ({WishlistItem.length})
      </h1>
      <Separator className="w-full" />
      <div className="min-h-24">
        {WishlistItem.map((item) => (
          <>
            <div key={item.id} className="flex gap-2 h-full relative">
              <Image
                src={item.thumbnail}
                alt={item.name}
                width={100}
                height={100}
                className="object-contain"
              />
              {item.stock === 0 && (
                <span className="absolute bottom-0 left-2.5 text-red-500 bg-white text-xs px-1 py-0.5">
                  Out of Stock
                </span>
              )}
              <div className="flex flex-col justify-between min-h-full py-1">
                <span>
                  <Link href={`/products/${item.id}`}>
                    <h1 className="text-sm md:text-base leading-snug">{item.name}</h1>
                  </Link>
                  <div className="flex items-center gap-3">
                    <span className="flex text-xs text-white rounded-sm p-0.5 px-1.5 gap-1 bg-green-700 w-fit">
                      <p>{item.rating}</p>
                      <p className="text-[10px]">&#9733;</p>
                    </span>
                    <p className="text-sm">
                      ({Math.floor(Math.random() * 500)})
                    </p>
                  </div>
                </span>
                <span className="flex items-start justify-start gap-1 ">
                  <p className="text-sm leading-none">$</p>
                  <p className="text-xl font-semibold leading-none">
                    {item.price}
                  </p>
                </span>
              </div>
              <DeleteProduct />
            </div>
            <Separator className="w-full" />
          </>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;

const WishlistItem = [
  {
    id: 1,
    name: "Essence Mascara Lash Princess",
    price: 100,
    thumbnail:
      "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
    category: "Beauty",
    rating: 4.5,
    stock: 4,
  },
  {
    id: 2,
    name: "Essence Mascara Lash Princess",
    price: 100,
    thumbnail:
      "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
    category: "Beauty",
    rating: 4.5,
    stock: 0,
  },
  {
    id: 3,
    name: "Essence Mascara Lash Princess",
    price: 100,
    thumbnail:
      "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
    category: "Beauty",
    rating: 4.5,
    stock: 4,
  },
];
