import axios from "axios";
import { BadgeCheck, BadgeX } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const VerifyAccount = ({
  userAccount,
  userAccountLoading,
}: {
  userAccount: any;
  userAccountLoading: boolean;
}) => {
  const sendVerifyEmail = async (user: any) => {
    try {
      const res = await axios.post("/api/mail", {
        email: user.email,
        emailType: "VERIFY",
        userId: user._id,
      });
      return res.data;
    } catch (error: any) {
      console.error("Error sending verify email:", error);
      throw new Error(
        error.response?.data?.error || "Failed to send verify email"
      );
    }
  };

  async function handleVerifyAccount() {
    try {
      toast.promise(sendVerifyEmail(userAccount?.data), {
        loading: "Sending verification email...",
        success:
          "Verification email sent successfully. Please check your inbox.",
        error: "Failed to send verification email. Please try again later.",
      });
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast.error("Failed to send verification email. Please try again later.");
    }
  }
  return (
    <>
      {userAccountLoading ? (
        <span className="flex items-center justify-center gap-2 h-5 w-1/2 mx-auto bg-gray-200 animate-pulse rounded-md"></span>
      ) : userAccount?.data?.isVerified ? (
        <span className="flex items-center justify-center gap-2">
          <h1 className="text-xl font-medium">Account Verified</h1>
          <BadgeCheck className="w-8 h-8 fill-green-500 text-white" />
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <h1 className="text-xl font-medium">
            Please{" "}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={handleVerifyAccount}
            >
              verify
            </span>{" "}
            your account
          </h1>
          <BadgeX className="w-8 h-8 fill-red-500 text-white" />
        </span>
      )}
    </>
  );
};

export default VerifyAccount;
