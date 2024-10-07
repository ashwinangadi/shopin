"use server";

import { AuthError } from "next-auth";
import { signIn } from "../../auth";
import { signInSchema, signUpSchema } from "./zod";

import User from "@/models/userModel";
import { revalidatePath } from "next/cache";
import { connectToMongoDB } from "./db";
import bcrypt from "bcryptjs";
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

export async function googleAuthenticate(
  prevState?: string | undefined,
  formData?: FormData
) {
  try {
    await signIn("google", { redirectTo: "/products" });
  } catch (error) {
    if (error instanceof AuthError) {
      return "google log in failed";
    }
    throw error;
  }
}

// Function to create a new user
export const createUser = async (values: z.infer<typeof signUpSchema>) => {
  try {
    await connectToMongoDB();

    const { username, email, password, picture } = values;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hash,
      picture,
    });
    const savedUser = await newUser.save();

    // Return a plain object representation of the user
    return {
      success: true,
      user: {
        _id: savedUser?._id?.toString(),
        username: savedUser.username,
        email: savedUser.email,
        picture: savedUser.picture,
        isVerified: savedUser.isVerified,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt,
      },
    };
  } catch (error: any) {
    if (error.code === 11000) {
      if (error.keyPattern.username) {
        return { success: false, error: "Username already exists" };
      }
      if (error.keyPattern.email) {
        return { success: false, error: "Email already exists" };
      }
      return { success: false, error: "Duplicate key error" };
    }
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return { success: false, error: validationErrors };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
};

export async function verifyEmail(token: string) {
  try {
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return { error: "Invalid token", status: 400 };
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return { message: "Email Verified Successfully.", success: true };
  } catch (error: any) {
    return { error: error.message, status: 500 };
  }
}

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
    throw new Error("Failed to fetch user.");
  }
}
export async function getUserInClient(email: string): Promise<any | undefined> {
  await connectToMongoDB();
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return { error: "User not found", status: 404 };
    }

    if (email === user.email) {
      return { email: user.email, _id: user._id, success: true };
    }
  } catch (error) {
    return { error: "Failed to fetch user.", status: 500 };
  }
}

export async function resetPassword(token: string, newPassword?: string) {
  try {
    await connectToMongoDB();

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return { error: "Invalid Link", status: 400 };
    }
    if (user && !newPassword) {
      return { message: "Valid Token.", success: true };
    }
    if (user && newPassword) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);
      user.password = hash;
      user.forgotPasswordToken = undefined;
      user.forgotPasswordTokenExpiry = undefined;

      await user.save();

      return { message: "Password reset successfully.", success: true };
    }
  } catch (error: any) {
    return { error: error.message, status: 500 };
  }
}
