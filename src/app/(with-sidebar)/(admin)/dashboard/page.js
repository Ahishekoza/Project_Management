"use client";

import { projects } from "@/app/constants/dummyData";
import { columns } from "@/app/constants/utils";
import { DataTable } from "@/components/dataTable";

export default function Dashboard() {

  return (
    <div className="w-full">

      <p className="text-3xl  tracking-wide py-3 ">Ongoing Projects</p>
      <DataTable columns={columns} data={projects} />{" "}
      {/* Changed data to projects */}
    </div>
  );
}
