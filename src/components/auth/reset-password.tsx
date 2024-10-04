"use client";
import Link from "next/link";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { resetPasswordSchema } from "@/lib/zod";
import { toast } from "sonner";
import { ArrowRight, Loader, TriangleAlert } from "lucide-react";
import { Input } from "../ui/input";
import AuthRouting from "./auth-routing";

const ResetPassword = () => {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    // try {
    // //   const result = await authenticate({ params: callbackUrl, values });
    //   if (result?.message) {
    //     form.setError("root", {
    //       type: "manual",
    //       message: result.message,
    //     });
    //     toast.error(result.message);
    //   } else {
    //     toast.success("Login successful!");
    //   }
    // } catch (error) {
    //   console.log("An unexpected error occurred. Please try again.");
    // }
    console.log(values);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-5">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center ">
            Reset Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          {form.formState.errors.root && (
            <div
              className="flex w-full items-center p-4 mb-4 gap-2 text-sm text-red-800 rounded-lg bg-red-100"
              role="alert"
            >
              <TriangleAlert className="h-4 w-4 text-red-500" />
              <span className="sr-only">Error</span>
              <div>{form.formState.errors.root.message}</div>
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        autoComplete="on"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                // disabled={
                //   form.formState.isSubmitting ||
                //   form.formState.isSubmitSuccessful
                // }
                className="w-full mt-4"
              >
                {form.formState.isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Sending Reset Password Email...
                  </span>
                ) : (
                  <>
                    <span className="flex items-center justify-between w-full">
                      <p>Reset Password</p>{" "}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div>
            <AuthRouting
              message="Remember your password?"
              routeTo="/login"
              routeMessage="Login here"
            />
            <AuthRouting
              message="Don't have an account yet?"
              routeTo="/signup"
              routeMessage="Sign Up here"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
