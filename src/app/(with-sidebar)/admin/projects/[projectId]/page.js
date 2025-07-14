"use client";

import ProjectDisplay from "@/components/projectPageComp/projectDisplayComp";
import { useProject } from "@/contexts/ProjectContext";
import { useVendor } from "@/contexts/VendorContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectPage() {
  const { projectId } = useParams();
  const { projects, handleAssignToVendor, vendorAssignments ,combinedLoading } = useProject();
  const { handleAvailablevendorsPerProject, avaliableVendorList } = useVendor();
  const [selectedProject, setSelectedProject] = useState()
  useEffect(() => {
    const selected = projects.find((p) => p?._id === projectId);

    setSelectedProject(selected)

    if (selected?.workers?.length > 0) {
      handleAvailablevendorsPerProject(selected.workers);
    }
  }, [projectId, projects]);

  
  const handleValueChange = (vendorInfo) => {
    if (vendorInfo?._id !== null) {
      const confirmed = window.confirm(
        `Do you want to assign the task to "${vendorInfo.name}"?`
      );
      if (confirmed) {
        handleAssignToVendor(selectedProject, vendorInfo);
      }
    }
    console.log(vendorInfo)
  };

  console.log(avaliableVendorList)

  return (
    <div className="p-4">
      <p className="text-lg md:text-3xl tracking-wide py-3">Project Status</p>
      {combinedLoading && <p>Loading...</p>}
      <div className="py-5">
        {avaliableVendorList ? (
          <ProjectDisplay
            avaliableVendorList={avaliableVendorList}
            handleValueChange={handleValueChange}
            project={selectedProject}
            vendorAssignments={vendorAssignments}
          />
        ) : (
          <p>Loading vendors...</p>
        )}
      </div>
    </div>
  );
}
