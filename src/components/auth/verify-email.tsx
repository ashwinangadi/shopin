"use client";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { verifyEmail } from "@/lib/actions";

const VerifyEmail = () => {
  const router = useRouter();
  // const verifyUserEmail
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { data, isError, error, isLoading, refetch, isSuccess } = useQuery({
    queryKey: [],
    queryFn: async () => await verifyEmail(token ?? ""),
    refetchOnWindowFocus: false,
    enabled: false,
  });
  React.useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        router.push("/products");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, router]);
  return (
    <section className="flex items-center justify-center h-screen mx-2">
      {token ? (
        <div className="relative mx-auto flex items-center flex-col space-y-2.5 w-full rounded md:-mt-32 ">
          <Card className="w-full flex flex-col items-center max-w-lg">
            <CardHeader>
              <CardTitle className="text-xl md:text-3xl font-bold text-center ">
                Verify your Email!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant={"default"}
                className="w-28"
                onClick={() => refetch()}
                disabled={isSuccess || isError}
              >
                {isLoading ? "Verifying..." : isError ? "Failed" : "Verify"}
              </Button>
            </CardContent>
          </Card>
          {isSuccess ? (
            <p className="p-4 rounded-md border border-green-500 bg-green-200">
              Email Verified Successfully. You will be redirected to products in{" "}
              {5} seconds.
            </p>
          ) : isError ? (
            <p className="p-4 rounded-md border border-red-500 bg-red-200">
              Something went wrong!
            </p>
          ) : isLoading ? (
            <p className="p-4 rounded-md border border-yellow-500 bg-yellow-100">
              Verifying!
            </p>
          ) : null}
        </div>
      ) : (
        <p>Landed on the wrong page!</p>
      )}
    </section>
  );
};

export default VerifyEmail;
