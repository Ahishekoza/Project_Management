import mongoose from "mongoose";

const projectAssignment = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vendorAcceptanceStatus: {
      type: String,
      enum: ["pending", "requested", "accepted", "rejected"],
      default: "pending",
    },
    designerAcceptanceStatus: {
      type: String,
      enum: ["pending", "requested", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const ProjectAssignmentSchema =
  mongoose.models.ProjectAssignment ||
  mongoose.model("ProjectAssignment",projectAssignment);
