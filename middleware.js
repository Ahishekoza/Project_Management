// middleware.ts

import { verifyToken } from "@/lib/jwt";
import { NextResponse } from "next/server";


export async  function middleware(request) {
  const token = request.cookies.get("auth-session")?.value;
  console.log(token)

  console.log(request.nextUrl)

  // if (!token || token === null) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  try {
    const session = await verifyToken(token)
    console.log(session,"middleware")
    const { role } = session;

    // check admin role for admin routes
    if (request.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // vendor role check
    if (request.nextUrl.pathname.startsWith("/vendor") && role !== "vendor") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (e) {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete("auth-session")
    return response
  }
}

export const config = {
  matcher: ["/admin/:path*", "/vendor/:path*"], // protect these routes
};
