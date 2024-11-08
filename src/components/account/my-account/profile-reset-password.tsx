import axios from "axios";
import React from "react";
import { toast } from "sonner";

const ProfileResetPassword = ({
  userId,
  userEmail,
}: {
  userId: string;
  userEmail: string;
}) => {
  const handleResetPassword = async () => {
    try {
      if (userEmail === "john@example.com") {
        toast.error(
          "You are not authorised to reset password for this account. Create your own account for better experience."
        );
        return;
      }

      const res = axios.post("/api/mail", {
        email: userEmail,
        emailType: "RESET",
        userId: userId,
      });

      toast.promise(res, {
        loading: "Sending password reset link...",
        success: "Password reset link sent to your email.",
        error: "Failed to send password reset link",
      });
    } catch (error: any) {
      toast.error("Failed to reset password");
    }
  };
  return (
    <p className="text-base text-center ">
      Click{" "}
      <span
        onClick={handleResetPassword}
        className="hover:underline text-blue-500 font-semibold cursor-pointer"
      >
        here
      </span>{" "}
      to reset your password
    </p>
  );
};

export default ProfileResetPassword;
