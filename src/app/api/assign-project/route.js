import { dbConnect } from "@/lib/mongoose";
import { ProjectAssignmentSchema } from "@/models/ProjectAssignment";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();
  try {
    const { projectId, vendorId } = await req.json();

    const currentPorject = await ProjectAssignmentSchema.findOne({
      projectId,
      vendorId,
    })
      .populate("projectId", "projectName _id")
      .populate("vendorId", "name vendorType _id");

    if (!currentPorject) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No project assignment found for the given project and vendor.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: currentPorject,
        message: "Project assignment retrieved successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Server error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const { projectId, vendorId, vendorAcceptanceStatus } = await req.json();

    const isProjectAlreadyAssigned = await ProjectAssignmentSchema.findOne({
      projectId,
      vendorId,
      vendorAcceptanceStatus: { $in: ["accepted", "requested"] },
    });

    if (isProjectAlreadyAssigned) {
      return NextResponse.json(
        {
          success: false,
          message: "Vendor is already assigned to this project.",
        },
        {
          status: 400,
        }
      );
    }

    const newAssignment = new ProjectAssignmentSchema({
      projectId,
      vendorId,
      vendorAcceptanceStatus: vendorAcceptanceStatus || "pending",
    });

    const projectAssigned = await newAssignment.save();

    const projectAssignedInfo = await ProjectAssignmentSchema.findById(
      projectAssigned._id
    )
      .populate("projectId", "projectName _id")
      .populate("vendorId", "name vendorType _id");

    return NextResponse.json(
      {
        success: true,
        data: projectAssignedInfo,
        message: "Project assigned successfully.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Server error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req) {
  await dbConnect();
  try {
    const { projectId, vendorId, vendorAcceptanceStatus } = await req.json();

    const updatedAssignment = await ProjectAssignmentSchema.findOneAndUpdate(
      { projectId, vendorId },
      { vendorAcceptanceStatus },
      { new: true }
    );
    if (!updatedAssignment) {
      return NextResponse.json(
        {
          success: false,
          message: "Project assignment not found.",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      {
        success: true,
        data: updatedAssignment,
        message: "Project assignment updated successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Server error",
      },
      {
        status: 500,
      }
    );
  }
}
