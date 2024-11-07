import { Button } from "@/components/ui/button";
import { removeFromWishlist } from "@/lib/actions";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const DeleteProduct = ({
  userId,
  productId,
  refetch,
}: {
  userId: string | undefined;
  productId: number;
  refetch: () => void;
}) => {
  const router = useRouter();

  const handleDeleteWishlist = async () => {
    if (!userId) {
      toast.error("Please login to add to wishlist");
      return router.push("/login");
    }

    try {
      const deletedProduct = removeFromWishlist(userId, productId);
      toast.promise(deletedProduct, {
        loading: "Deleting product from wishlist...",
        success: () => {
          refetch();
          return "Product deleted from wishlist";
        },
        error: "Failed to delete product from wishlist",
      });
    } catch (error) {
      toast.error(`Some error occurred with wishlist: ${error}`);
      throw error;
    }
  };

  return (
    <div>
      <Button
        variant={"ghost"}
        size={"icon"}
        className="absolute top-2 right-2 group"
        onClick={() => {
          handleDeleteWishlist();
        }}
      >
        <Trash className=" h-4 w-5 fill-gray-200 stroke-slate-400 group-hover:fill-red-400 group-hover:stroke-red-700" />
      </Button>
    </div>
  );
};

export default DeleteProduct;
