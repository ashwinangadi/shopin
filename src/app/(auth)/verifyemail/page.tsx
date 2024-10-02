"use client";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const VerifyEmailPage = () => {
  // const verifyUserEmail
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { data, isError, error, isLoading, refetch, isSuccess } = useQuery({
    queryKey: [],
    queryFn: async () => await axios.post("/api/users/verifyemail", { token }),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  console.log("email____________", data, error);

  return (
    <section className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex items-center flex-col space-y-2.5 rounded md:-mt-32 ">
        <Card className="w-full flex flex-col items-center max-w-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center ">
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
            Email Verified Successfully.
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
    </section>
  );
};

export default VerifyEmailPage;
