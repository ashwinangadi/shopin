import { SignupForm } from "@/components/auth/signup-form";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShopIN | Signup",
  description: "Create your account",
};

const SignupPage = () => {
  return (
    <section className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[450px] flex-col space-y-2.5 ">
        <SignupForm />
      </div>
    </section>
  );
};

export default SignupPage;
