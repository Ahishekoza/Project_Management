// middleware.ts

import { NextResponse } from "next/server";


export function middleware(request) {
  const cookie = request.cookies.get("auth-session")?.value;

  if (!cookie || cookie === null) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  try {
    const session = JSON.parse(decodeURIComponent(cookie));
    const { user } = session;

    // check admin role for admin routes
    if (request.nextUrl.pathname.startsWith("/admin") && user?.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // vendor role check
    if (request.nextUrl.pathname.startsWith("/vendor") && user?.role !== "vendor") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (e) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/vendor/:path*"], // protect these routes
};
