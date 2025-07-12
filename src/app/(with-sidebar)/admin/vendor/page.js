"use client";

import { columnsVendors } from "@/app/constants/utils";
import { DataTable } from "@/components/dataTable";
import CreateVendorDialog from "@/components/vendorPageComp/createVendorDialog";
import { useVendor } from "@/contexts/VendorContext";


export default function Vendors() {
  const {vendorsData} = useVendor()
  return (
    <>
     <div className="flex flex-row items-center justify-between">
       <p className="text-lg md:text-3xl  tracking-wide py-3 ">Vendors List</p>
       <CreateVendorDialog/>
     </div>
      <DataTable columns={columnsVendors} data={vendorsData} isRoute={false} />{" "}
      {/* Changed data to projects */}
  
    </>
  );
}
