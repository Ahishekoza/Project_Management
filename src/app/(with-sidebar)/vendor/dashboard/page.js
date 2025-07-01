"use client";

import {  useColumnsProjectRequests } from "@/app/constants/utils";
import { DataTable } from "@/components/dataTable";
import { useAuth } from "@/contexts/AuthContext";
import { useVendor } from "@/contexts/VendorContext";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { handleProjectRequest } = useVendor();
  const { loading ,user} = useAuth();
 const columns =  useColumnsProjectRequests()
  const [requestsData, setRequestsData] = useState();
  useEffect(() => {
    if (!loading && user?.email) {
      const requests = handleProjectRequest();
      setRequestsData(requests);
    }
  }, [loading, user,requestsData]);

  return (
    <div>
      <DataTable
        columns={columns}
        data={requestsData}
        isRoute={false}
      />
    </div>
  );
};

export default Dashboard;
