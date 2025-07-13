import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      unique: true,
      required: true,
    },
    projectType: {
      type: String,
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    designerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    workers: {
      type: Array,
      required: true,
    },
    dateRange: {
      from: {
        type: String,
        default: null,
      },
      to: {
        type: String,
        default: null,
      },
    },
    projectStatus: {
      type: String,
      enum: ["Not_Started", "In_Progress", "Completed"], // Corrected enum array
      default: "Not_Started", // Updated default to match enum
    },
  },
  {
    timestamps: true,
  }
);

export const ProjectSchema =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
