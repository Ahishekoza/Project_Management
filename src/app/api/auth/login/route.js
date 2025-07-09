import { comparePassword } from "@/lib/hash";
import { generateToken } from "@/lib/jwt";
import { dbConnect } from "@/lib/mongoose";
import { UserSchema } from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
    // ---connect to DB
    // ---destructor req.body {email / contactNumber -->  password}
    // ---check the role because if role is client / vendor tempPassword will be saved in the DB 
    // ---send the token with the login
    await dbConnect()


    try {
        const { email, password } = await req.json()
        const userDetails = await UserSchema.findOne({ $or: [{ email: email }, { contactNumber: email }] })

        if (!userDetails) {
            return NextResponse.json({
                success: false,
                error:"userNotPresent"
            }, { status: 404 })
        }


        const validPassword = await comparePassword(password, userDetails?.password)
        if (!validPassword) {
            return NextResponse.json({
                success: false,
                error:"password"
            }, { status: 404 })
        }


        const payload = {
            id: userDetails?._id,
            role: userDetails?.role,
            email: userDetails?.email,
            name: userDetails?.name,
        }
        const token = await generateToken(payload)

        const response = NextResponse.json({
            success: true,
            user: {
                id: userDetails?._id,
                email: userDetails?.email,
                name: userDetails?.name,
                role: userDetails?.role
            },
            message: "User Logged In Successfully"
        })

        response.cookies.set("auth-session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        })

        return response

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }


}