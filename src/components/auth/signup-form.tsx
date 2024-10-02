"use client";

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

import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/lib/zod";
import { ArrowRight, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { createUser } from "@/lib/actions";

export function SignupForm() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    console.log("values", values);
    try {
      const result = await createUser(values);
      console.log("result__________________snigupPage", result);
      return result;
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.", error);
      throw error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-5">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center ">
            Signup
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
              {/* <div>{globalError}</div> */}
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="username"
                        placeholder="Enter username"
                        autoComplete="on"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="confirmPassword"
                        placeholder="Confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="mt-4 w-full"
                type="submit"
                aria-disabled={form.formState.isSubmitting}
              >
                Signup <ArrowRight className="ml-auto h-5 w-5 text-gray-50" />
              </Button>
            </form>
          </Form>

          <p className="text-sm font-light text-gray-500 mt-4">
            Do you have an account ?
            <Link href="/login">
              <span className="font-medium pl-1 text-blue-600 hover:text-blue-700">
                Login here
              </span>
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
