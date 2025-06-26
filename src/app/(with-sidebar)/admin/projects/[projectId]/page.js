// ---implement params based project fetching
"use client";

import { useProject } from "@/contexts/ProjectContext";
import { useVendor } from "@/contexts/VendorContext";
import { useEffect } from "react";

export default function ProjectPage() {
  const { projects } = useProject();
  const { handleAvailablevendorsPerProject ,avaliableVendorList } = useVendor();
  useEffect(() => {
    // --- get the project with the projectId from projects
    const project = projects[0];

    if (project?.workers.length > 0)
      handleAvailablevendorsPerProject(project?.workers);

    //   ---also depends on projectId but we haven`t configured here
  }, []);


  console.log(avaliableVendorList)

  return (
    <div className="p-4">
      {/* <h1 className="text-xl font-bold mb-4">
        Vendors for Project: {projectId}
      </h1> */}

      {avaliableVendorList ? (
        <div className="space-y-4">
          {Object.entries(avaliableVendorList).map(([type, vendors]) => (
            <div key={type}>
              <h2 className="text-lg font-semibold capitalize">{type}</h2>
              {vendors.length > 0 ? (
                <ul className="ml-4 list-disc">
                  {vendors.map((vendor, idx) => (
                    <li key={idx}>
                      {vendor.vendor_name} ({vendor.vendor_email})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 ml-4">
                  No vendors available
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading vendors...</p>
      )}
    </div>
  );
}
