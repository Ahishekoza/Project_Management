import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const resposne = NextResponse.json({
            success: true,
            message: "User Logged out successfully"
        })

        resposne.cookies.delete("auth-session")

        return resposne
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Logout failed" },
            { status: 500 }
        );
    }
}