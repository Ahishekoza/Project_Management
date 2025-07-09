import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-session")?.value;

  if (!token) {
    return NextResponse.json(
      {
        message: "Token is not present",
      },
      {
        status: 500,
      }
    );
  }

  const decodedToken = await verifyToken(token);

  return NextResponse.json(
    {
      message: "Validate Token",
      user: {
        id: decodedToken?.id,
        name: decodedToken?.name,
        role: decodedToken?.role,
        email: decodedToken?.email,
      },
    },
    { status: 200 }
  );
}
