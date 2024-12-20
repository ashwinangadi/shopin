"use server";

import { AuthError } from "next-auth";
import { signIn } from "../../auth";
import { signInSchema, signUpSchema } from "./zod";

import User from "@/models/userModel";
import { connectToMongoDB } from "./db";
import bcrypt from "bcryptjs";
import { z } from "zod";

//____________________________________________________________________AUTHENTICATION START______________________________________________________________________

// Function to authenticate a user
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
    await connectToMongoDB();
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

// Function to authenticate a user with Google
export async function googleAuthenticate(
  prevState?: string | undefined,
  formData?: FormData
) {
  try {
    await connectToMongoDB();
    await signIn("google", { redirectTo: "/products" });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Google log in failed";
    }
    throw error;
  }
}

// Function to authenticate a user with Github
export async function githubAuthenticate(
  prevState?: string | undefined,
  formData?: FormData
) {
  try {
    await connectToMongoDB();
    await signIn("github", { redirectTo: "/products" });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Github log in failed";
    }
    throw error;
  }
}

//____________________________________________________________________AUTHENTICATION END______________________________________________________________________

//____________________________________________________________________USER MANAGEMENT START___________________________________________________________________

// Function to create a new user
export const createUser = async (values: z.infer<typeof signUpSchema>) => {
  try {
    await connectToMongoDB();

    const { fullName, username, email, password, picture } = values;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
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
        fullName: savedUser.fullName,
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

// Function to verify a user's email
export async function verifyEmail(token: string) {
  try {
    await connectToMongoDB();
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
export const deleteUser = async (id: string | undefined) => {
  
  try {
    await connectToMongoDB();
    if (id === "671b4cf661c252de3b7855d8") {
      return {
        success: false,
        error:
          "You are not authorised to delete this account. Create your own account for better experience.",
      };
    }

    if (!id) {
      return { success: false, error: "User ID is required" };
    }

    const deletedUser = await User.findByIdAndDelete({ _id: id });

    if (!deletedUser) {
      return { success: false, error: "User not found" };
    }

    return { success: true, message: "User deleted successfully!" };
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      error: "An error occurred while deleting the user",
    };
  }
};

// Function to get a user by email
export async function getUser(email: string): Promise<any | undefined> {
  try {
    await connectToMongoDB();
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

// Function to get a user by email in the client
export async function getUserInClient(email: string): Promise<any | undefined> {
  try {
    await connectToMongoDB();
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

// Function to reset a user's password
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

// Function to update user profile
export async function updateUserProfile(
  userId: string,
  data: {
    fullName?: string;
    username?: string;
    email?: string;
  }
) {
  try {
    await connectToMongoDB();

    const updateData: { [key: string]: string } = {};
    const validFields = ["fullName", "username", "email"];

    for (const [key, value] of Object.entries(data)) {
      if (validFields.includes(key) && value !== undefined) {
        updateData[key] = value;
      }
    }

    if (Object.keys(updateData).length === 0) {
      return { success: false, error: "No valid fields to update" };
    }

    // If email is being updated, check if it already exists
    if (updateData.email) {
      const existingUser = await User.findOne({
        email: updateData.email,
        _id: { $ne: userId },
      });
      if (existingUser) {
        return { success: false, error: "Email already in use" };
      }
    }

    // If username is being updated, check if it already exists
    if (updateData.username) {
      const existingUser = await User.findOne({
        username: updateData.username,
        _id: { $ne: userId },
      });
      if (existingUser) {
        return { success: false, error: "Username already in use" };
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return { success: false, error: "User not found" };
    }

    return {
      success: true,
      user: {
        _id: updatedUser?._id?.toString(),
        fullName: updatedUser?.fullName,
        username: updatedUser?.username,
        email: updatedUser?.email,
        picture: updatedUser?.picture,
        isVerified: updatedUser?.isVerified,
        createdAt: updatedUser?.createdAt,
        updatedAt: updatedUser?.updatedAt,
      },
    };
  } catch (error: any) {
    console.error("Error updating user profile:", error);
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return { success: false, error: validationErrors };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

//____________________________________________________________________USER MANAGEMENT END___________________________________________________________________

//____________________________________________________________________WISHLIST MANAGEMENT START______________________________________________________________________

// Function to add a product to the user's wishlist
export async function addToWishlist(userId: string, product: any) {
  try {
    await connectToMongoDB();

    // Find the user by ID and update their wishlist
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { wishlist: product } },
      { new: true }
    );

    return { message: "Product added to wishlist", success: true };
  } catch (error) {
    return { message: "Failed to add product to wishlist", success: false };
  }
}

// Function to remove a product from the user's wishlist
export async function removeFromWishlist(userId: string, productId: number) {
  try {
    await connectToMongoDB();

    // Find the user by ID and update their wishlist
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { wishlist: { id: productId } } },
      { new: true }
    );

    return { message: "Product removed from wishlist", success: true };
  } catch (error) {
    return {
      message: "Failed to remove product from wishlist",
      success: false,
    };
  }
}

//____________________________________________________________________WISHLIST MANAGEMENT END______________________________________________________________________
