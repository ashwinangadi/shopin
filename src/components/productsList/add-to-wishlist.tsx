import { Heart } from "lucide-react";
import { IWishlistItem } from "@/models/userWishlist";
import { addToWishlist, removeFromWishlist } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AddToWishlist = ({
  userId,
  product,
}: {
  userId: string | undefined;
  product: IWishlistItem;
}) => {
  const router = useRouter();
  // TODO: when clicked on the heart, it re-renders as many times as products.length, fix it
  const { data: wishlistData, refetch } = useQuery({
    queryKey: ["wishlist", userId],
    queryFn: async () =>
      await axios.post("/api/wishlist/getwishlist", { userId }),
    enabled: !!userId,
  });

  const isInWishlist =
    wishlistData?.data?.data?.some(
      (item: IWishlistItem) => item.id === product.id
    ) || false;

  const handleAddToWishlist = async () => {
    if (!userId) {
      toast.error("Please login to add to wishlist");
      return router.push("/login");
    }

    try {
      if (isInWishlist) {
        const deletedProduct = removeFromWishlist(userId, product.id);
        toast.promise(deletedProduct, {
          loading: "Deleting product from wishlist...",
          success: () => {
            refetch();
            return "Product deleted from wishlist";
          },
          error: "Failed to delete product from wishlist",
        });
      } else {
        const result = addToWishlist(userId, product);
        toast.promise(result, {
          loading: "Adding product to wishlist...",
          success: () => {
            refetch();
            return "Product added to wishlist";
          },
          error: "Failed to add product to wishlist",
        });
      }
    } catch (error) {
      toast.error(`Some error occurred with wishlist: ${error}`);
      throw error;
    }
  };

  return (
    <Heart
      className={`z-10 absolute h-5 w-5 ${
        isInWishlist ? "fill-red-500" : "fill-gray-200"
      } stroke-slate-400 top-2 right-2 hover:cursor-pointer`}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleAddToWishlist();
      }}
    />
  );
};

export default AddToWishlist;
