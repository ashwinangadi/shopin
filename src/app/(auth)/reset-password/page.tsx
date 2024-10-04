import ResetPassword from "@/components/auth/reset-password";
import React from "react";

const ResetPasswordPage = () => {
  return (
    <section className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[450px] flex-col space-y-2.5 p-4 md:-mt-32">
        <ResetPassword />
      </div>
    </section>
  );
};

export default ResetPasswordPage;
