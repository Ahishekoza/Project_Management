import { z } from "zod";
import { vendorType } from "../constants/utils";
export const createProjectSchema = z.object({
  clientEmail: z.string().email(),
  clientContact: z.string().min(10),
  clientName: z.string(),
  projectName: z.string().min(1, "Project name is required"),
  projectType: z.string(),
  designer: z.string().min(1, "Please select the designer"),
  workers: z.array(
    z.object({
      type: z.string().min(1, { message: "Worker type is required" }),
    })
  ),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

export const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(8),
});

const vendorTypeValues = vendorType.map((vendor) => vendor.value);

// Define the Zod schema for the vendor form
export const vendorSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  name: z.string().min(1, { message: "Name is required" }).max(100, {
    message: "Name must be less than 100 characters",
  }),
  vendorType: z
    .string()
    .min(1, { message: "Vendor type is required" })
    .refine((value) => vendorTypeValues.includes(value), {
      message: "Invalid vendor type",
    }),
  contactNumber: z
    .string()
    .min(1, { message: "Contact number is required" })
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message: "Invalid phone number format",
    }),
});
