"use client";

// import { projects } from "@/app/constants/dummyData";
import { columnsDashboard } from "@/app/constants/utils";
import { DataTable } from "@/components/dataTable";
import { useProject } from "@/contexts/ProjectContext";
import useSessionToast from "@/hooks/useSessionToast";

export default function Dashboard() {
 const { projects}  = useProject()

 useSessionToast()
 
  return (
    <>
      <p className="text-3xl  tracking-wide py-3 ">Ongoing Projects</p>
      <DataTable columns={columnsDashboard} data={projects} isRoute={true} />{" "}
      {/* Changed data to projects */}
    </>
  );
}
