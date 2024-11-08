import { deleteUser } from "@/lib/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { signOut } from "next-auth/react";
import React from "react";
import { toast } from "sonner";

const DeleteAccount = ({ userId }: { userId: string | undefined }) => {
  // TODO: Add loading state when request is being made
  async function handleDeleteAccount() {
    try {
      console.log("Attempting to delete account");
      const result = await deleteUser(userId);
      console.log("result", result);
      if (result.success) {
        toast.success(
          "Account deleted successfully! Thank you for trying out the app."
        );
        // Redirect user or perform any necessary cleanup
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await signOut();
        // router.push("/");
      } else {
        toast.error(result.error || "Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("An unexpected error occurred while deleting the account");
    }
  }
  return (
    <span className="flex justify-center pt-10">
      <AlertDialog>
        <AlertDialogTrigger className=" p-2 px-10 rounded-lg mx-auto bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90">
          Delete Account
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
              onClick={handleDeleteAccount}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </span>
  );
};

export default DeleteAccount;
