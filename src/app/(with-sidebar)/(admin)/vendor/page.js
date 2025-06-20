"use client";

import { vendors } from "@/app/constants/dummyData";
import { columnsVendors } from "@/app/constants/utils";
import { DataTable } from "@/components/dataTable";
import DialogComp from "@/components/vendorPageComp/dialogComp";

export default function Client() {
  return (
    <>
     <div className="flex flex-row items-center justify-between">
       <p className="text-lg md:text-3xl  tracking-wide py-3 ">Vendors List</p>
       <DialogComp/>
     </div>
      <DataTable columns={columnsVendors} data={vendors} isRoute={false} />{" "}
      {/* Changed data to projects */}
  
    </>
  );
}
