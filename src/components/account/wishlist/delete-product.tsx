"use client";

import { removeFromWishlist } from "@/lib/actions";
import { Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const DeleteProduct = ({ productId, refetch }: { productId: number, refetch: () => void }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleDeleteWishlist = async () => {
    if (!userId) {
      toast.error("Please login to add to wishlist");
      return router.push("/login");
    }

    try {
      const deletedProduct = await removeFromWishlist(userId, productId);
      if (deletedProduct.success) {
        toast.success("Product deleted from wishlist");
        refetch();
      }
    } catch (error) {
      toast.error(`Some error occurred with wishlist: ${error}`);
      throw error;
    }
  };

  return (
    <div>
      <Trash
        className="absolute h-4 w-5 fill-gray-200 stroke-slate-400 top-2 right-2 hover:cursor-pointer"
        onClick={() => {
          handleDeleteWishlist();
        }}
      />
    </div>
  );
};

export default DeleteProduct;
