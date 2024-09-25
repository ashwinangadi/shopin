import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

async function getUser(email: string): Promise<any | undefined> {
  try {
    const user = await new Promise<{
      id: string;
      name: string;
      email: string;
      password: string;
    }>((res, rej) => {
      res({
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      });
    });
    if (email === user.email) {
      let salt = await bcrypt.genSalt(1);
      let hash = await bcrypt.hash(user.password, salt);
      console.log(hash, "hash");
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: hash,
      };
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          console.log(user, "password123");
          // if (user) return user;
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log(passwordsMatch, "passwordMatch");

          if (passwordsMatch) return user;
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
    authorized({ auth, request: { nextUrl, url } }) {
      const isLoggedIn = !!auth?.user;
      const isOnCartPage = nextUrl.pathname.startsWith("/cart");
      const isOnLoginPage = nextUrl.pathname === "/login";
      const isOnRootPage = nextUrl.pathname === "/"; // Check if on root page
      const callbackUrl =
        nextUrl.searchParams.get("callbackUrl") || nextUrl.pathname; // Default to current page

      // Get the origin (protocol + host) to form absolute URLs
      const origin = nextUrl.origin;

      // Redirect unauthenticated users to login page if they try to access /cart
      if (isOnCartPage && !isLoggedIn) {
        const loginUrl = new URL(`${origin}/login`);
        loginUrl.searchParams.set("callbackUrl", nextUrl.pathname); // Store /cart as callbackUrl
        return NextResponse.redirect(loginUrl);
      }

      // If authenticated user tries to access the login page, redirect them to the callbackUrl (previous page or set route)
      if (isLoggedIn && isOnLoginPage) {
      console.log("__________________", url, "__________________", callbackUrl);

        return NextResponse.redirect( new URL(`${callbackUrl}`));

        //   const redirectUrl = new URL(`${origin}${callbackUrl}`); // Redirect to the correct page
        //   redirectUrl.searchParams.set("callbackUrl", nextUrl.pathname); // Store /cart as callbackUrl
        //   return NextResponse.redirect(redirectUrl); // Redirect to the correct route after login
      }

      // If user (authenticated or not) tries to access the root route, redirect to /products
      if (isOnRootPage) {
        return NextResponse.redirect(new URL(`${origin}/products`));
      }

      // Allow access to all other routes
      return true;
    },
  },
});
