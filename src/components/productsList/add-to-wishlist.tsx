import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { IWishlistItem } from "@/models/userWishlist";
import { addToWishlist, removeFromWishlist } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AddToWishlist = ({ product }: { product: IWishlistItem }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const {
    data: wishlistData,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["wishlist"],
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
        const deletedProduct = await removeFromWishlist(userId, product.id);
        if (deletedProduct.success) {
          toast.success("Product deleted from wishlist");
        }
      } else {
        const result = await addToWishlist(userId, product);
        if (result.success) {
          toast.success("Product added to wishlist");
        }
      }
      refetch();
    } catch (error) {
      toast.error(`Some error occurred with wishlist: ${error}`);
      throw error;
    }
  };

  return (
    <Heart
      className={`z-50 absolute h-5 w-5 ${
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
