"use client";

import { projects } from "@/app/constants/dummyData";
import { columns, columnsDashboard } from "@/app/constants/utils";
import { DataTable } from "@/components/dataTable";

export default function Dashboard() {
  return (
    <>
      <p className="text-3xl  tracking-wide py-3 ">Ongoing Projects</p>
      <DataTable columns={columnsDashboard} data={projects} isRoute={true} />{" "}
      {/* Changed data to projects */}
    </>
  );
}
