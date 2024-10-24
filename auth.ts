import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { signInSchema } from "@/lib/zod";
import { createUser, getUser } from "@/lib/actions";
import { revalidatePath } from "next/cache";
// import { NextResponse } from "next/server";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    GitHub,
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = signInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = bcrypt.compareSync(password, user.password);

          if (passwordsMatch) {
            revalidatePath("/products");
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
      const isOnRootPage = nextUrl.pathname === "/"; // Check if on root page
      const callbackUrl =
        nextUrl.searchParams.get("callbackUrl") || nextUrl.href; // Use full URL with params

      const ProtectedRoutes = [
        "/account",
        "/account/orders",
        "/account/wishlist",
      ];
      const AuthPages = ["/login", "/signup", "/reset-password"];

      // Get the origin (protocol + host) to form absolute URLs
      const origin = nextUrl.origin;

      if (isOnRootPage) {
        return NextResponse.redirect(new URL(`${origin}/products`, nextUrl));
      }

      if (ProtectedRoutes.includes(nextUrl.pathname) && !isLoggedIn) {
        const loginUrl = new URL(`/login`, nextUrl);
        loginUrl.searchParams.set("callbackUrl", callbackUrl); // Store /cart as callbackUrl
        return NextResponse.redirect(loginUrl);
      }

      if (isLoggedIn && AuthPages.includes(nextUrl.pathname)) {
        return NextResponse.redirect(new URL(`${origin}/`, nextUrl));
      }

      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (
        account &&
        (account.provider === "google" || account.provider === "github")
      ) {
        token.accessToken = account.access_token;

        // Check if the user exists in the database
        const existingUser = await getUser(token?.email ?? "");
        if (!existingUser && token) {
          // If the user doesn't exist, create a new user
          // TODO: Verification email not sent in this case
          const newUser = await createUser({
            fullName: token?.name ?? "",
            username: token?.email?.split("@")[0] ?? "", // Add a fallback empty string
            email: token?.email ?? "", // Also add a fallback here for consistency
            password: Array.from(crypto.getRandomValues(new Uint8Array(10)))
              .map(
                (n) =>
                  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>?"[
                    n % 68
                  ]
              )
              .join(""), // Generate a random password
            picture: token?.picture ?? "",
            confirmPassword: "",
          });

          if (newUser.success) {
            token.id = newUser.user?._id;
          } else {
            console.error("Failed to create user:", newUser.error);
            throw new Error(`Failed to create user : ${newUser.error}`);
          }
        } else {
          token.id = existingUser._id;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        // You can add more fields from the token to the session here
      }
      return session;
    },
  },
});
