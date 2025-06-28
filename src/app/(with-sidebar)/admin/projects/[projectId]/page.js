// ---implement params based project fetching
"use client";

import ProjectDisplay from "@/components/projectPageComp/projectDisplayComp";
import { useProject } from "@/contexts/ProjectContext";
import { useVendor } from "@/contexts/VendorContext";
import { useEffect } from "react";

export default function ProjectPage() {
  const { projects, handleAssignToVendor, vendorAssignments } = useProject();
  const { handleAvailablevendorsPerProject, avaliableVendorList } = useVendor();
  const project = projects[0];
  useEffect(() => {
    // --- get the project with the projectId from projects

    if (project?.workers.length > 0)
      handleAvailablevendorsPerProject(project?.workers);

    //   ---also depends on projectId but we haven`t configured here
  }, []);

  const handleValueChange = (vendorInfo) => {
    if (vendorInfo) {
      // --- show alert that do you want to assign the task to this vendor ? if user clicked yes
      // call a fucntion and select cancel nothin
      const confirmed = window.confirm(
        `Do you want to assign the task to "${vendorInfo.vendor_name}"?`
      );

      if (confirmed) {
        // Call the function to assign the task
        handleAssignToVendor(project?.id, vendorInfo);
      }
    }
  };

  // console.log(avaliableVendorList.filter((av)=>av.length).map())

  return (
    <div className="p-4">
      <p className="text-lg md:text-3xl  tracking-wide py-3 ">Project Status</p>

      <div className="py-5">
        {avaliableVendorList ? (
          <ProjectDisplay
            avaliableVendorList={avaliableVendorList}
            handleValueChange={handleValueChange}
            projectId={project?.id}
            vendorAssignments={vendorAssignments}
          />
        ) : (
          <p>Loading vendors...</p>
        )}
      </div>
    </div>
  );
}
