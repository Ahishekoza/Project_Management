import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique:true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      unique:true,
      required: true,
    },
    password: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "client", "vendor", "designer"],
      default: "client",
    },
    availabilityStatus: {
      type: Boolean,
      enum: [true, false],
      default: true,
      required: function () {
        return this.role !== "admin" && this.role !== "client";
      },
    },
    vendorType: {
      type: String,
      enum: ["carpenter", "electrician", "plumber", "construction", "painter"]
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (this.role !== "vendor") {
    this.vendorType = undefined;
  }

  if (this.role === "admin" || this.role === "client") {
    this.availabilityStatus = undefined;
  } else if (typeof this.availabilityStatus === "undefined") {
    this.availabilityStatus = true;
  }

  next();
});

export const UserSchema =
  mongoose.models.User || mongoose.model("User", userSchema);
