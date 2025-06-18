"use client";

import { DataTable } from "@/components/dataTable";

// Helper functions to format the data
const formatProjectType = (type) => {
  const types = {
    whole_house: "Whole House",
    specific_room: "Specific Room",
  };
  return types[type] || type;
};

const formatStatus = (status) => {
  const statuses = {
    in_progress: "In Progress",
    not_started: "Not Started",
    completed: "Completed",
  };
  return statuses[status] || status;
};

export default function Dashboard() {
  const projects = [
    {
      _id: "5f8d0d55b54764421b7160c1",
      name: "Modern Villa Renovation",
      projectType: "whole_house",
      client: "Hammer Mahajanai",
      designer: "Yogesh Vyas",
      status: "in_progress",
      country: "US",
      createdAt: new Date("2023-06-20T09:00:00Z"),
      updatedAt: new Date("2023-07-05T16:30:00Z"),
    },
    {
      _id: "5f8d0d55b54764421b7160c2",
      name: "Kitchen Remodel",
      projectType: "specific_room",
      client: "Abhishek Oza",
      designer: "Pranjal Vyas",
      status: "not_started",
      country: "UK",
      createdAt: new Date("2023-06-25T11:00:00Z"),
      updatedAt: new Date("2023-06-25T11:00:00Z"),
    },
     {
      _id: "5f8d0d55b54764421b7160c1",
      name: "Modern Villa Renovation",
      projectType: "whole_house",
      client: "Hammer Mahajanai",
      designer: "Yogesh Vyas",
      status: "in_progress",
      country: "US",
      createdAt: new Date("2023-06-20T09:00:00Z"),
      updatedAt: new Date("2023-07-05T16:30:00Z"),
    },
    {
      _id: "5f8d0d55b54764421b7160c2",
      name: "Kitchen Remodel",
      projectType: "specific_room",
      client: "Abhishek Oza",
      designer: "Pranjal Vyas",
      status: "not_started",
      country: "UK",
      createdAt: new Date("2023-06-25T11:00:00Z"),
      updatedAt: new Date("2023-06-25T11:00:00Z"),
    },
     {
      _id: "5f8d0d55b54764421b7160c1",
      name: "Modern Villa Renovation",
      projectType: "whole_house",
      client: "Hammer Mahajanai",
      designer: "Yogesh Vyas",
      status: "in_progress",
      country: "US",
      createdAt: new Date("2023-06-20T09:00:00Z"),
      updatedAt: new Date("2023-07-05T16:30:00Z"),
    },
    {
      _id: "5f8d0d55b54764421b7160c2",
      name: "Kitchen Remodel",
      projectType: "specific_room",
      client: "Abhishek Oza",
      designer: "Pranjal Vyas",
      status: "not_started",
      country: "UK",
      createdAt: new Date("2023-06-25T11:00:00Z"),
      updatedAt: new Date("2023-06-25T11:00:00Z"),
    },
  ];

  const columns = [
    // {
    //   accessorKey: "name",
    //   header: "Project Name",
    // },
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

  return (
    <div className="w-full">

      <span className="text-3xl tracking-wide">Ongoing Projects</span>
      <DataTable columns={columns} data={projects} />{" "}
      {/* Changed data to projects */}
    </div>
  );
}
