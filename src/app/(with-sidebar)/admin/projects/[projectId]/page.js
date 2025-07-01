"use client";

import ProjectDisplay from "@/components/projectPageComp/projectDisplayComp";
import { useProject } from "@/contexts/ProjectContext";
import { useVendor } from "@/contexts/VendorContext";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function ProjectPage() {
  const { projectId } = useParams();
  const { projects, handleAssignToVendor, vendorAssignments } = useProject();
  const { handleAvailablevendorsPerProject, avaliableVendorList } = useVendor();

  useEffect(() => {
    const selected = projects.find((p) => p?.id === Number(projectId));

    if (selected?.workers?.length > 0) {
      handleAvailablevendorsPerProject(selected.workers);
    }
  }, [projectId, projects]);

  const handleValueChange = (vendorInfo) => {
    if (vendorInfo) {
      const confirmed = window.confirm(
        `Do you want to assign the task to "${vendorInfo.vendor_name}"?`
      );
      if (confirmed) {
        handleAssignToVendor(projectId, vendorInfo);
      }
    }
  };

  return (
    <div className="p-4">
      <p className="text-lg md:text-3xl tracking-wide py-3">Project Status</p>

      <div className="py-5">
        {avaliableVendorList ? (
          <ProjectDisplay
            avaliableVendorList={avaliableVendorList}
            handleValueChange={handleValueChange}
            projectId={projectId}
            vendorAssignments={vendorAssignments}
          />
        ) : (
          <p>Loading vendors...</p>
        )}
      </div>
    </div>
  );
}
