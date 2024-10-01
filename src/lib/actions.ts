"use server";

import { AuthError } from "next-auth";
import { signIn } from "../../auth";
import { signInSchema } from "./zod";

export async function authenticate(prevState: unknown, formData: FormData) {
  const validatedFields = signInSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

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
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
