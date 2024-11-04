import VerifyEmail from "@/components/auth/verify-email";
import { Loader } from "lucide-react";
import React, { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShopIN | Verify Email",
  description: "Verify your email",
};

const VerifyEmailPage = () => {
  return (
    <section className="flex items-center justify-center h-screen mx-2">
      <Suspense fallback={<Loader className="w-5 h-5 animate-spin" />}>
        <VerifyEmail />
      </Suspense>
    </section>
  );
};

export default VerifyEmailPage;
