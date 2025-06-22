// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;

  console.log(url);

  // 🧪 Inline mock user for testing (DON'T import from app/)
  const mockUser = {
    name: 'Abhishek',
    role: 'admin', // change to test 'vendor'
  };

  // Role-based redirect logic
  if (url.pathname.startsWith("/admin") && mockUser.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (url.pathname.startsWith("/vendor") && mockUser.role !== "vendor") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/vendor/:path*"],
};
