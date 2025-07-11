import { House, Layers, Users } from "@deemlol/next-icons";
import {
  formatDateHelpfns,
  formatProjectType,
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
  },
  {
    accessorKey: "designerId",
    header: "Designer",
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
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => formatStatus(row.original.status),
  // },
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
