// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// // This function can be marked `async` if using `await` inside

// export function middleware(req: any) {
//   const { pathname } = req.nextUrl;

//   // Check if the requested route is '/'
//   if (pathname === '/') {
//     // Redirect to '/products'
//     return NextResponse.redirect(new URL('/products', req.url));
//   }

//   // Allow other routes to proceed
//   return NextResponse.next();
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['/'],
// }

export { auth as middleware } from "../auth";

// Or like this if you need to do something here.
// export default auth((req) => {
//   console.log(req.auth) //  { session: { user: { ... } } }
// })

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
