import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  authMiddleware,
  withAuth,
} from "@kinde-oss/kinde-auth-nextjs/middleware";

// This function can be marked `async` if using `await` inside

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the requested route is '/'
  if (pathname === "/") {
    // Redirect to '/products'
    return NextResponse.redirect(new URL("/products", req.url));
  }

  // Allow other routes to proceed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/"],
};
