import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { signInSchema } from "@/lib/zod";
import User from "@/models/userModel";
import { getUser } from "@/lib/actions";
import { revalidatePath } from "next/cache";
// import { NextResponse } from "next/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = signInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = bcrypt.compareSync(password, user.password);

          if (passwordsMatch) {
            revalidatePath("/cart");
            return user;
          }
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Default login page
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname.startsWith("/login");
      const isOnsignupPage = nextUrl.pathname.startsWith("/signup");
      const isOnRootPage = nextUrl.pathname === "/"; // Check if on root page
      const callbackUrl =
        nextUrl.searchParams.get("callbackUrl") || nextUrl.pathname; // Default to current page

      const ProtectedRoutes = ["/cart"];

      // Get the origin (protocol + host) to form absolute URLs
      const origin = nextUrl.origin;

      if (isOnRootPage) {
        return NextResponse.redirect(new URL(`${origin}/products`, nextUrl));
      }

      if (ProtectedRoutes.includes(nextUrl.pathname) && !isLoggedIn) {
        const loginUrl = new URL(`/login`, nextUrl);
        loginUrl.searchParams.set("callbackUrl", `${nextUrl.pathname}`); // Store /cart as callbackUrl
        return NextResponse.redirect(loginUrl);
      }

      // If authenticated user tries to access the login page, redirect them to the callbackUrl (previous page or set route)
      if (isLoggedIn && isOnLoginPage) {
        // console.log(callbackUrl, "callbackUrl________________________________");
        // const redirectUrl = new URL(callbackUrl, origin); // Redirect to the correct page
        return NextResponse.redirect(new URL("/products", nextUrl)); // Redirect to the correct route after login
      }

      return true;
    },
  },
});
