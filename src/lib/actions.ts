"use server";

import { AuthError } from "next-auth";
import { signIn } from "../../auth";
import { signInSchema } from "./zod";

export async function authenticate(values: {
  email: string;
  password: string;
}) {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", { email, password, redirectTo: "/products" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials",
          };
        default:
          return {
            message: "Something went wrong.",
          };
      }
    }
    throw error;
  }
}
