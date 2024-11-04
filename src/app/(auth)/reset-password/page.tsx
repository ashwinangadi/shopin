import ResetPassword from "@/components/auth/reset-password";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShopIN | Reset Password",
  description: "Reset your password",
};

const ResetPasswordPage = () => {
  return (
    <section className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[450px] flex-col space-y-2.5  md:-mt-32">
        <ResetPassword />
      </div>
    </section>
  );
};

export default ResetPasswordPage;
