import { dbConnect } from "@/lib/mongoose";
import { ProjectSchema } from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET(req) {
  // -- req will have a searchQuery which contain id
  // -- id --[projectId,clientId,designerId]
  await dbConnect();

  try {
    const parsedUrl = new URL(req.nextUrl);
    const roleParam = parsedUrl.searchParams.get("id");
    let matchQuery = {};
    let projects;

    if (roleParam) {
      matchQuery = {
        _id: roleParam,
      };

      projects = await ProjectSchema.findOne(matchQuery);
    } else {
      projects = await ProjectSchema.find()
        .populate("clientId")
        .populate("designerId");
    }

    if (!projects) {
      return NextResponse.json({
        success: false,
        message: "Fail to retry project",
      });
    }

    return NextResponse.json(
      {
        success: true,
        data: projects,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server error " || error.message,
      },
      {
        status: 500,
      }
    );
  }
}
