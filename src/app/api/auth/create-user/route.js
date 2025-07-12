import { hashPassword } from "@/lib/hash";
import { dbConnect } from "@/lib/mongoose";
import { UserSchema } from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  try {
    // Parse the JSON body from the request
    const { email, name, contactNumber, password, role ,vendorType } = await req.json();

    // --- Add Phone number too
    const isUserPresent = await UserSchema.findOne({ email });
    if (isUserPresent) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const encryptedPassword = await hashPassword(password);

    const user = new UserSchema({
      email,
      name,
      contactNumber,
      password: encryptedPassword,
      role,
      vendorType
    });

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully!",
        userId:user?._id
      },
      { status: 201 } // 201 Created is more appropriate for successful creation
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Server error",
      },
      { status: 500 }
    );
  }
}
