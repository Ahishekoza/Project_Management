import { verifyToken } from "@/lib/jwt";
import { dbConnect } from "@/lib/mongoose";
import { UserSchema } from "@/models/User";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();

  try {
    const cookie = await cookies();
    const token = cookie.get("auth-session")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    const session = await verifyToken(token);
    const loggedInUserRole = session?.role;

    // Extract role param from query string
    const parsedUrl = new URL(request.nextUrl);
    const roleParam = parsedUrl.searchParams.get("role");

    let matchQuery = {};

    if (loggedInUserRole === "admin") {
      // Admin can see all users — return matchQuery as empty {}
      roleParam !== null
        ? (matchQuery = { role: roleParam })
        : (matchQuery = { _id: { $ne: session?.id } });
    } else if (roleParam === loggedInUserRole) {
      // Vendors & Designers can only see others of same role
      matchQuery = {
        role: roleParam,
        _id: { $ne: session.id }, // exclude self
        availabilityStatus: true,
      };
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden: You are not allowed to view this data",
        },
        { status: 403 }
      );
    }

    const users = await UserSchema.find(matchQuery).select("-password");

    return NextResponse.json({ success: true, data:users });
  } catch (error) {
    console.error("GET /api/users error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Server Error" },
      { status: 500 }
    );
  }
}
