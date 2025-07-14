import { House, Layers, Users } from "@deemlol/next-icons";
import {

  formatStatus,
} from "../helperfns/helperfunctions";

import { Button } from "@/components/ui/button";
import { useVendor } from "@/contexts/VendorContext";

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
    accessorKey: "projectName",
    header: "Project Name",
  },
  {
    accessorKey: "clientId",
    header: "Client Name",
    cell:({row})=> row.original?.clientId?.name
  },
  {
    accessorKey: "designerId",
    header: "Designer",
    cell:({row})=> row.original?.designerId?.name
  },
  {
    accessorKey: "projectType",
    header: "Type",
    // cell: ({ row }) => formatProjectType(row.original.project_type),
  },
  // {
  //   accessorKey: "project_period",
  //   header: "Project Tenure [Mons]",
  // },
  {
    accessorKey: "projectStatus",
    header: "Project Status",
    cell: ({ row }) => formatStatus(row.original.projectStatus),
  },
];

export const columnsVendors = [
  {
    accessorKey: "name",
    header: "Vendor Name",
  },
  {
    accessorKey: "vendorType",
    header: "Vendor Type",
  },
  {
    accessorKey: "availabilityStatus",
    header: "Availability Status",
  },
  // {
  //   accessorKey: "vendor_availabile_date",
  //   header: "Available Date",
  //   cell: ({ row }) => formatDateHelpfns(row?.original?.vendor_availabile_date),
  // },
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

export const useColumnsProjectRequests = () => {
  const { handleProjectAcceptDecline } = useVendor();

  return [
    {
      accessorKey: "project_id",
      header: "Project",
    },
    {
      accessorKey: "designer",
      header: "Designer",
    },
    {
      accessorKey: "duration",
      header: "Duration",
    },
    {
      accessorKey: "status",
      header: "Request Status",
      cell: ({ row }) => {
        const status = row.getValue("status");

        let color = "";
        switch (status) {
          case "accepted":
            color = "text-green-600 bg-green-100";
            break;
          case "requested":
            color = "text-yellow-700 bg-yellow-100";
            break;
          case "rejected":
            color = "text-red-600 bg-red-100";
            break;
          default:
            color = "text-gray-600 bg-gray-100";
        }

        return (
          <span className={`px-2 py-1 rounded text-sm font-medium ${color}`}>
            {status}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Accept / Decline",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Button
              variant={"secondary hover:bg-none"}
              size={"sm"}
              className={"cursor-pointer bg-green-500 text-white"}
              onClick={() =>
                handleProjectAcceptDecline(row?.original, "accepted")
              }
            >
              Accept
            </Button>
            <Button
              variant={"destructive "}
              size={"sm"}
              className={"cursor-pointer "}
              onClick={() =>
                handleProjectAcceptDecline(row?.original, "rejected")
              }
            >
              Decline
            </Button>
          </div>
        );
      },
    },
  ];
};

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
  {
    type: "Painter",
    value: "painter",
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
    value:"all"
  },
  {
    type: "Carpenter",
    value:"carpenter"
  },
  {
    type: "Plumber",
    value:"plumber"
  },
  {
    type: "Civil Work",
    value:"civilWork"
  },
  {
    type: "Painter",
    value:"painter"
  },
  {
    type: "Electrician",
    value:"electician"
  },
];

// ---Thinking of adding time
// const vendorAssignment = [
//   {
//     project: z.string(),
//     vendor_id: z.string(),
//     vendor_type: z.string(),
//     status: z.enum(["accepted,rejected,requested"]),
//     designer: z.string(),
//   },
// ];

// Email templates configuration
export const emailTemplates = {
  newuser: {
    subject: (name) => `Welcome to Project Management Platform, ${name}!`,
    text: (name, email, password) => `
Welcome to the Project Management Platform, where you can manage and track projects with ease!

Dear ${name},

You have been registered on our platform. You can log in using the following credentials:

- Email: ${email}
- Temporary Password: ${password}

Please use the temporary password to log in. You can change your password after logging in by visiting the settings page.

Best regards,
The Project Management Platform Team
    `,
    html: (name, email, password) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h2 style="color: #2c3e50;">Welcome to Project Management Platform!</h2>
        <p style="font-size: 16px; line-height: 1.5;">
          Dear ${name},<br><br>
          We're excited to have you on board! Our platform allows you to manage and track projects with ease. You have been successfully registered as a vendor.
        </p>
        <p style="font-size: 16px; line-height: 1.5;">
          You can log in using the following credentials:
        </p>
        <ul style="font-size: 16px; line-height: 1.5;">
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Temporary Password:</strong> ${password}</li>
        </ul>
        <p style="font-size: 16px; line-height: 1.5;">
          Please use the temporary password to log in. You can change your password after logging in by visiting the <strong>Settings</strong> page.
        </p>
        <p style="font-size: 16px; line-height: 1.5;">
          If you have any questions, feel free to reply to this email or contact our support team.
        </p>
        <p style="font-size: 16px; line-height: 1.5;">
          Best regards,<br>
          The Project Management Platform Team
        </p>
        <hr style="border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #777;">
          This is an automated email. Please do not reply directly unless necessary.
        </p>
      </div>
    `,
  },
  notification: {
    subject: (name, projectName) => `New Project Assignment: ${projectName} for ${name}`,
    text: (name, email, projectName, designerName) => `
Dear ${name},

You have been assigned a new project on the Project Management Platform!

- Project Name: ${projectName}
- Assigned Designer: ${designerName}

Please log in to track the project progress and collaborate with the team.

Best regards,
The Project Management Platform Team
    `,
    html: (name, email, projectName, designerName) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h2 style="color: #2c3e50;">New Project Assignment!</h2>
        <p style="font-size: 16px; line-height: 1.5;">
          Dear ${name},<br><br>
          You have been assigned a new project on our platform.
        </p>
        <p style="font-size: 16px; line-height: 1.5;">
          Project Details:
        </p>
        <ul style="font-size: 16px; line-height: 1.5;">
          <li><strong>Project Name:</strong> ${projectName}</li>
          <li><strong>Assigned Designer:</strong> ${designerName}</li>
        </ul>
        <p style="font-size: 16px; line-height: 1.5;">
          Please log in to track the project progress and collaborate with the team.
        </p>
        <p style="font-size: 16px; line-height: 1.5;">
          If you have any questions, feel free to reply to this email or contact our support team.
        </p>
        <p style="font-size: 16px; line-height: 1.5;">
          Best regards,<br>
          The Project Management Platform Team
        </p>
        <hr style="border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #777;">
          This is an automated email. Please do not reply directly unless necessary.
        </p>
      </div>
    `,
  },
};