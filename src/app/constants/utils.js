

import { House, Layers, Users } from "@deemlol/next-icons";
import {
  formatDateHelpfns,
  formatProjectType,
  formatStatus,
} from "../helperfns/helperfunctions";

export const authNavgations = [
  {
    link: "/dashboard",
    icon: (props) => <House {...props} />,
    name: "Dashboard",
  },
  {
    link: "/vendor",
    icon: (props) => <Users {...props} />,
    name: "Vendors",
  },
  {
    link: "/projects",
    icon: (props) => <Layers {...props} />,
    name: "Projects",
  },
];

export const columnsDashboard = [
  {
    accessorKey: "client",
    header: "Client Name",
  },
  {
    accessorKey: "designer",
    header: "Designer",
  },
  {
    accessorKey: "projectType",
    header: "Type",
    cell: ({ row }) => formatProjectType(row.original.projectType),
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
  {type:"Electrician",value:"electrician"},
  {
    type:"Carpenter",
    value:"carpenter"
  },
  {
    type:"Plumber",
    value:"plumber"
  },
  {
    type:"Construction",
    value:"construction"
  }
]
