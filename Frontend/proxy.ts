import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("access_token");
  console.log("access toke from proxy", accessToken)
  const isAuthenticated = !!accessToken;

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/profile") ||
    request.nextUrl.pathname.startsWith("/products");

  const isAuthRoute =
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/signup')

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  else if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
     "/login/:path*",
     "/signup/:path",
     "/add-product/:path"

  ],
};
