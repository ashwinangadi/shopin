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
import { signInSchema } from "@/lib/zod";
import { ArrowRight, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { authenticate } from "@/lib/actions";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  // console.log("searchParams________________",searchParams.get("callbackUrl"));

  const [globalError, setGlobalError] = useState<string>("");
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      const result = await authenticate({ params: callbackUrl, values });
      if (result?.message) {
        setGlobalError(result.message);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-5">
      <span className="text-center text-sm bg-yellow-50 w-full p-4 border rounded-md">
        <p className="text-base font-bold mb-2">Dummy Credentials</p>
        email: john@example.com
        <br />
        password: password123
      </span>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center ">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          {globalError && (
            <div
              className="flex w-full items-center p-4 mb-4 gap-2 text-sm text-red-800 rounded-lg bg-red-100"
              role="alert"
            >
              <TriangleAlert className="h-4 w-4 text-red-500" />
              <span className="sr-only">Error</span>
              <div>{globalError}</div>
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

              {/* Submit button will go here */}
              {/* <LoadingButton pending={form.formState.isSubmitting} /> */}
              <Button
                className="mt-4 w-full"
                type="submit"
                aria-disabled={form.formState.isSubmitting}
              >
                Log in <ArrowRight className="ml-auto h-5 w-5 text-gray-50" />
              </Button>
            </form>
          </Form>

          {/* <span className="text-sm text-gray-500 text-center block my-2">
            or
          </span> */}
          {/* <form className="w-full" action={handleGithubSignin}>
            <Button variant="outline" className="w-full" type="submit">
              <GitHubLogoIcon className="h-4 w-4 mr-2" />
              Sign in with GitHub
            </Button>
          </form> */}
          <p className="text-sm font-light text-gray-500 mt-4">
            Don&apos;t have an account yet?
            <Link href="/signup">
              <span className="font-medium pl-1 text-blue-600 hover:text-blue-700">
                Sign Up here
              </span>
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
