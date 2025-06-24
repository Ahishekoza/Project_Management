import { House, Layers, Users } from "@deemlol/next-icons";
import {
  formatDateHelpfns,
  formatProjectType,
  formatStatus,
} from "../helperfns/helperfunctions";

import { z } from "zod";

export const authNavgations = [
  {
    link: "/admin/dashboard",
    icon: (props) => <House {...props} />,
    name: "Dashboard",
  },
  {
    link: "/admin/vendor",
    icon: (props) => <Users {...props} />,
    name: "Vendors",
  },
  {
    link: "/admin/projects",
    icon: (props) => <Layers {...props} />,
    name: "Projects",
  },
];

export const vendorNavgations = [
  {
    link: "/vendor/dashboard",
    icon: (props) => <House {...props} />,
    name: "Dashboard",
  },
  // {
  //   link: "/admin/vendor",
  //   icon: (props) => <Users {...props} />,
  //   name: "Vendors",
  // },
  // {
  //   link: "/admin/projects",
  //   icon: (props) => <Layers {...props} />,
  //   name: "Projects",
  // },
];

export const columnsDashboard = [
  {
    accessorKey:"project_name",
    header:"Project Name"
  },
  {
    accessorKey: "clientName",
    header: "Client Name",
  },
  {
    accessorKey: "designer",
    header: "Designer",
  },
  {
    accessorKey: "project_type",
    header: "Type",
    cell: ({ row }) => formatProjectType(row.original.projectType),
  },
  {
    accessorKey:"project_period",
    header:"Project Tenure"
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => formatStatus(row.original.status),
  },
];

export const columnsVendors = [
  {
    accessorKey: "vendor_name",
    header: "Vendor Name",
  },
  {
    accessorKey: "vendor_type",
    header: "Vendor Type",
  },
  {
    accessorKey: "vendor_availabitily",
    header: "Availability Status",
  },
  {
    accessorKey: "vendor_availabile_date",
    header: "Available Date",
    cell: ({ row }) => formatDateHelpfns(row?.original?.vendor_availabile_date),
  },
  // {
  //   id:"actions",
  //   header:"Actions",
  //   cell:({row})=>{
  //     const vendor = row?.original
  //     return(
  //       <div className="flex gap-2 items-center">
  //         <Button variant={"secondary"} size={"sm"} className={"cursor-pointer h-5"}>Edit</Button>
  //          <Button variant={"destructive"} size={"sm"} className={"cursor-pointer h-5"}>Delete</Button>
  //       </div>
  //     )
  //   }
  // }
];

export const vendorType = [
  { type: "Electrician", value: "electrician" },
  {
    type: "Carpenter",
    value: "carpenter",
  },
  {
    type: "Plumber",
    value: "plumber",
  },
  {
    type: "Construction",
    value: "construction",
  },
];

// --- In the array we will have designers who are only working on 1-2 projects and project deadline is withing the month or two
export const availableDesigners = [
  {
    name: "Pranjal",
    value: "pranjal",
  },
  {
    name: "Yogesh",
    value: "yogesh",
  },
  {
    name: "Rahul",
    value: "rahul",
  },
];

export const projectType = [
  {
    name: "Commerical",
    value: "commerical",
  },
  {
    name: "Residential",
    value: "residential",
  },
  {
    name: "Bungalow/Villa",
    value: "bungalow",
  },
];

export const workers = [
  {
    type: "All",
  },
  {
    type: "Carpenter",
  },
  {
    type: "Plumber",
  },
  {
    type: "Civil Work",
  },
  {
    type: "Painter",
  },
  {
    type: "Electrician",
  },
];

export const createProjectSchema = z.object({
  clientEmail: z.string().email(),
  clientContact: z.string().min(10),
  clientName: z.string(),
  project_name: z.string(),
  project_type: z.string(),
  designer: z.string(),
  workers: z.array(z.object({
    type:z.string(),
    selected:z.boolean().optional()
  })),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
