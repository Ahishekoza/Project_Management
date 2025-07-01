"use client";

import { vendors } from "@/app/constants/dummyData";
import { useContext, createContext, useState, useEffect } from "react";
import { useProject } from "./ProjectContext";
import { useAuth } from "./AuthContext";

const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
  const { projects, vendorAssignments, setVendorAssignments } = useProject();
  const { user } = useAuth();

  //    ---- data format
  // {
  //         carpenter:[],
  //         electirican:[],
  //         plumber:[],
  //         construction:[],
  //         painter:[]
  //     }
  const [avaliableVendorList, setAvaliableVendorList] = useState();
  const [vendorsData, setvendorsData] = useState();

    useEffect(() => {
    const storedVendors = localStorage.getItem("vendorData");
    storedVendors ? setvendorsData(JSON.parse(storedVendors)) : setvendorsData(vendors);
  }, []);

  useEffect(() => {
    localStorage.setItem("vendorData", JSON.stringify(vendorsData));
  }, [vendorsData]);

  const handleAvailablevendorsPerProject = (projectWorkers) => {
    console.log(projectWorkers)
    // --- first get the all available vendors
    // --- list required types
    // --- data type
    // --- add the vendors as per type in segregated List
    const availablevendors = vendorsData.filter((v) => v.vendor_availabitily);
    console.log(availablevendors)

    const requiredtypes = projectWorkers.map((w) => w.type.toLowerCase());

    const segregatedVendors = {
      carpenter: [],
      electrician: [],
      plumber: [],
      construction: [],
      painter: [],
    };

    availablevendors.forEach((vendor) => {
      const type = vendor.vendor_type.toLowerCase();

      if (requiredtypes.includes(type)) {
        segregatedVendors[type].push(vendor);
      }
    });

    setAvaliableVendorList(segregatedVendors);
  };

  const handleProjectRequest = () => {
    // --- check if there are any new requests for the vendor // in future also add the type
    // --- check on the basis of name  // in future we will verify with the id

    const filterAssignmentForLoginedUser = vendorAssignments.filter(
      (va) => va?.vendor_name === user?.email
    );

    const noOfRequests = [
      ...filterAssignmentForLoginedUser.filter(
        (fa) => fa?.status === "requested"
      ),
      ...filterAssignmentForLoginedUser.filter(
        (fa) => fa?.status !== "requested"
      ),
    ];

    return noOfRequests;

    // --- return data which will have number of requests from which designer / admin
    // --- the functions end here but as per the data flow next step will be clicking on the request and
    // --- then go to the requests page and accept or decline it  . which will be handled in diff fuction
  };

  const handleProjectAcceptDecline = (vendorInfo, decision) => {
    const updatedVendorAssignmentList = vendorAssignments.map((va) => {
      const match =
        va.project_id === vendorInfo.project_id &&
        va.vendor_name === vendorInfo.vendor_name &&
        va.vendor_type === vendorInfo.vendor_type;

      if (match) {
        return {
          ...va,
          status: decision === "accepted" ? "accepted" : "rejected",
        };
      }

      return va;
    });

    setVendorAssignments(updatedVendorAssignmentList);

   if (decision === "accepted") {
    const updatedVendors = vendorsData.map((vendor) => {
      if (
        vendor.vendor_name === vendorInfo.vendor_name &&
        vendor.vendor_type === vendorInfo.vendor_type
      ) {
        return {
          ...vendor,
          vendor_availabitily: false, // mark as unavailable
        };
      }
      return vendor;
    });

    setvendorsData(updatedVendors);
  }
  };

  const value = {
    handleAvailablevendorsPerProject,
    handleProjectAcceptDecline,
    handleProjectRequest,
    avaliableVendorList,
    vendorsData,
  };

  return (
    <VendorContext.Provider value={value}>{children}</VendorContext.Provider>
  );
};

export const useVendor = () => {
  return useContext(VendorContext);
};
