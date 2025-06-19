import { House, Layers, Users } from "@deemlol/next-icons";
import { formatProjectType,formatStatus } from "../helperfns/helperfunctions";

export const authNavgations = [
  {
    link: "/dashboard",
    icon: (props) => <House {...props} />,
    name: "Dashboard",
  },
  {
    link: "/clients",
    icon: (props) => <Users {...props} />,
    name: "Clients",
  },
  {
    link: "/projects",
    icon: (props) => <Layers {...props} />,
    name: "Projects",
  },
];

export const columns = [
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
