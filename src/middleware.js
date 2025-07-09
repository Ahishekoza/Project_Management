// middleware.ts

import { NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";

export async function middleware(request) {
  const token = request.cookies.get("auth-session")?.value;

  const pathname = request.nextUrl.pathname;

  if (!token || token === null) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const { role } = await verifyToken(token);
  try {
    // --- IF vendor tries to login admin pages
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // --- If admin tries to login vendor pages
    if (pathname.startsWith("/vendor") && role !== "vendor") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (e) {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete("auth-session");
    return response;
  }

  // try {
  //   const session = await verifyToken(token)
  //   console.log(session,"middleware")
  //   const { role } = session
}

export const config = {
  matcher: ["/admin/:path*", "/vendor/:path*"], // protect these routes
};
