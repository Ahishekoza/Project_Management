import { z } from "zod";
export const createProjectSchema = z.object({
  clientEmail: z.string().email(),
  clientContact: z.string().min(10),
  clientName: z.string(),
  project_name: z.string().min(1, "Project name is required"),
  project_type: z.string(),
  designer: z.string().min(1, "Please select the designer"),
  workers: z.array(
    z.object({
      type: z.string(),
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