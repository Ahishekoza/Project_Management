"use client";

import { vendors } from "@/app/constants/dummyData";
import { useContext, createContext, useState, useEffect } from "react";
import { useProject } from "./ProjectContext";

const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
  const { projects } = useProject();

  //    ---- data format
  // {
  //         carpenter:[],
  //         electirican:[],
  //         plumber:[],
  //         construction:[],
  //         painter:[]
  //     }
  const [avaliableVendorList, setAvaliableVendorList] = useState();
  const [vendorsData, setvendorsData] = useState(vendors);

  const handleAvailablevendorsPerProject = (projectWorkers) => {
    // --- first get the all available vendors
    // --- list required types 
    // --- data type
    // --- add the vendors as per type in segregated List
    const availablevendors = vendorsData.filter((v) => v.vendor_availabitily);

    const requiredtypes = projectWorkers.map((w) => w.type.toLowerCase());

    const segregatedVendors = {
      carpenter: [],
      electrician: [],
      plumber: [],
      construction: [],
      painter: [],
    };

    availablevendors.forEach((vendor)=>{
        const type  = vendor.vendor_type.toLowerCase()

        if(requiredtypes.includes(type)){
            segregatedVendors[type].push(vendor)
        }
    })

    setAvaliableVendorList(segregatedVendors)

  };

  const value = {
    vendorsData,
    avaliableVendorList,
    handleAvailablevendorsPerProject
  };

  return (
    <VendorContext.Provider value={value}>{children}</VendorContext.Provider>
  );
};

export const useVendor = () => {
  return useContext(VendorContext);
};
