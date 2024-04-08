import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // here get currect location of user
  const pathName = request.nextUrl.pathname;
  // now define the public path so any user can access that
  const isPublicPath =
    pathName === "/login" ||
    pathName === "/signup" ||
    pathName === "/verifyemail";

  // if user is logged in so get the token from cookie
  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  // in matcher we have to define those routes where our middleware will execute
  //matcher: "/about/:path*",
  matcher: ["/", "/profile", "/login", "/signup", "/verifyemail"],
};
