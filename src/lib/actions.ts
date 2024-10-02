"use server";

import { AuthError } from "next-auth";
import { signIn } from "../../auth";
import { signInSchema, signUpSchema } from "./zod";

import User from "@/models/userModel"; // Assuming the User model is defined similarly to the Todo model
import { revalidatePath } from "next/cache";
import { connectToMongoDB } from "./db";
import bcrypt from "bcryptjs"; // Make sure bcrypt is installed (npm install bcrypt)
import { z } from "zod";

export async function authenticate({
  params,
  values,
}: {
  params?: string | null;
  values: { email: string; password: string };
}) {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const redirectTo = params ?? "/products";
  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", { email, password, redirectTo: redirectTo });
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

// Function to create a new user
export const createUser = async (values: z.infer<typeof signUpSchema>) => {
  await connectToMongoDB();

  // Extracting user details from formData
  const username = values.username;
  const email = values.email;
  const password = values.password;

  let salt = await bcrypt.genSalt(1);
  let hash = await bcrypt.hash(password, salt);

  try {
    // Creating a new user using User model
    const newUser = await User.create({
      username,
      email,
      password: hash, // In a real-world application, make sure to hash the password before saving
    });

    // Saving the new user
    newUser.save();

    // Revalidate path if needed (for example, the homepage or user-specific page)
    // revalidatePath("/login");

    // Returning the string representation of the new user
    console.log("newUser___________________________", newUser);
    return newUser.toString();
  } catch (error) {
    // console.log("errrrrrr_____________________________", error?.errorResponse);
    throw new Error
  }
};

// Function to delete a user
export const deleteUser = async (id: FormData) => {
  await connectToMongoDB();

  // Extracting user ID from formData
  const userId = id.get("id");

  try {
    // Deleting the user with the specified ID
    await User.deleteOne({ _id: userId });

    // Triggering revalidation of the specified path ("/")
    // revalidatePath("/signup");

    // Returning a success message after deleting the user
    return "user deleted";
  } catch (error) {
    console.log(error);
    return { message: "error deleting user" };
  }
};

export async function getUser(email: string): Promise<any | undefined> {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return null;
    }

    if (email === user.email) {
      return user;
    }
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
 