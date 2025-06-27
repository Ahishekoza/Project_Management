// ---implement params based project fetching
"use client";

import ProjectDisplay from "@/components/projectPageComp/projectDisplayComp";
import { useProject } from "@/contexts/ProjectContext";
import { useVendor } from "@/contexts/VendorContext";
import { useEffect } from "react";

export default function ProjectPage() {
  const { projects } = useProject();
  const { handleAvailablevendorsPerProject, avaliableVendorList } = useVendor();
  useEffect(() => {
    // --- get the project with the projectId from projects
    const project = projects[0];

    if (project?.workers.length > 0)
      handleAvailablevendorsPerProject(project?.workers);

    //   ---also depends on projectId but we haven`t configured here
  }, []);

  // console.log(avaliableVendorList.filter((av)=>av.length).map())

  return (
    <div className="p-4">
      <p className="text-lg md:text-3xl  tracking-wide py-3 ">Project Status</p>

      <div className="py-5">
        {avaliableVendorList ? (
          <ProjectDisplay avaliableVendorList={avaliableVendorList} />
        ) : (
          <p>Loading vendors...</p>
        )}
      </div>
    </div>
  );
}
