"use client";

import { vendors } from "@/app/constants/dummyData";
import { useContext, createContext, useState, useEffect } from "react";
import { useProject } from "./ProjectContext";
import { useAuth } from "./AuthContext";
import { generateRandomPassword } from "@/app/helperfns/helperfunctions";
import { toast } from "sonner";
import useGetHook from "@/hooks/useGetHook";

const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
  const { vendorAssignments, setVendorAssignments } = useProject();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const [avaliableVendorList, setAvaliableVendorList] = useState([]);
  const [vendorsData, setVendorsData] = useState();

  // Use custom hook to fetch vendors
  const {
    data: vendorData,
    loading: vendorLoading,
    refetch,
  } = useGetHook("/api/user?role=vendor");

  // Update vendorsData when vendorData changes
  useEffect(() => {
    if (!vendorLoading && vendorData) {
      setVendorsData(vendorData);
    }
  }, [vendorData, vendorLoading]);

  // Combine isLoading with vendorLoading
  const combinedLoading = isLoading || vendorLoading;

  const handleVendorCreation = async (data) => {
    setIsLoading(true);
    try {
      const tempPassword = generateRandomPassword(8);
      const redefinedData = {
        ...data,
        role: "vendor",
        password: tempPassword,
      };

      // Create vendor
      const vendorCreationResponse = await fetch("/api/auth/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(redefinedData),
        credentials: "include",
      });

      let vendorResponseBody;
      try {
        vendorResponseBody = await vendorCreationResponse.json();
      } catch (jsonError) {
        console.error("Vendor creation JSON error:", jsonError);
        toast.error("Invalid vendor creation response format");
        return { success: false };
      }

      if (!vendorCreationResponse.ok || !vendorResponseBody.success) {
        toast.error(vendorResponseBody.message || "Error creating vendor");
        return { success: false };
      }

      // Send email
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          template: "newuser",
          email: redefinedData.email,
          name: redefinedData.name,
          password: redefinedData.password,
        }),
      });

      let emailResponseBody;
      try {
        emailResponseBody = await emailResponse.json();
      } catch (jsonError) {
        console.error("Email response JSON error:", jsonError);
        toast.error("Invalid email response format");
        return { success: false };
      }
      console.log("Email response:", emailResponse.status, emailResponseBody);

      if (emailResponse.status !== 200 || !emailResponseBody.success) {
        console.log("Email response failed with status:", emailResponse.status);
        toast.error(
          emailResponseBody.message || "Error sending email to vendor"
        );
        return { success: false };
      }
      
      await refetch();

      toast.success(
        "Vendor created successfully and password sent successfully"
      );
      return { success: true };
    } catch (error) {
      console.error("Vendor creation error:", error.message, error.stack);
      toast.error(error.message || "Unexpected error occurred");
      return { success: false };
    } finally {
      setIsLoading(false);
      console.log("Finished vendor creation process");
    }
  };

  const handleAvailablevendorsPerProject = (projectWorkers) => {
    // --- first get the all available vendors
    // --- list required types
    // --- data type
    // --- add the vendors as per type in segregated List
    const availablevendors = vendorsData.filter((v) => v.availabilityStatus);
    
    const requiredtypes = projectWorkers.map((w) => w?.type?.toLowerCase());

    const segregatedVendors = {
      carpenter: [],
      electrician: [],
      plumber: [],
      construction: [],
      painter: [],
    };

    availablevendors.forEach((vendor) => {
      const type = vendor.vendorType.toLowerCase();

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
    handleVendorCreation,
    isLoading: combinedLoading,
  };

  return (
    <VendorContext.Provider value={value}>{children}</VendorContext.Provider>
  );
};

export const useVendor = () => {
  return useContext(VendorContext);
};
