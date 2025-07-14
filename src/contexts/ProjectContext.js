"use client";

import useGetHook from "@/hooks/useGetHook";
import { useContext, createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";
import { generateRandomPassword } from "@/app/helperfns/helperfunctions";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  // -- create a state which will always watch status changes for the of the assigned vendor
  // -- to notify the admin/designer
  const [clients, setClients] = useState([]);
  const [vendorAssignments, setVendorAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // ---get all projects if role is admin if designer and vendor get projects assigned to him
  const {
    data: projectsData,
    loading: projectLoading,
    error: projectError,
    refetch,
  } = useGetHook("/api/project");

  const {
    data: projectAssignData,
    loading: projectAssignLoading,
    error: projectAssignError,
  } = useGetHook("/api/assign-project");

  console.log(projectAssignData)

  useEffect(() => {
    if (!projectLoading && projectsData) {
      setProjects(projectsData);
    }
  }, [projectsData, projectLoading]);

  useEffect(() => {
    if (!projectAssignLoading && projectAssignData) {
      setVendorAssignments(projectAssignData);
    }
  }, [projectAssignLoading, projectAssignData]);

  const combinedLoading = isLoading || projectLoading || projectAssignLoading;

  // --Projects
  // useEffect(() => {
  //   const storedProjects = localStorage.getItem("projects");
  //   storedProjects ? setProjects(JSON.parse(storedProjects)) : setProjects([]);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("projects", JSON.stringify(projects));
  // }, [projects]);

  // --Clients
  // useEffect(() => {
  //   const storedClients = localStorage.getItem("clients");
  //   if (storedClients) {
  //     setClients(JSON.parse(storedClients));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("clients", JSON.stringify(clients));
  // }, [clients]);

  // --- vendor Assignments
  // --- every time useContext is called render / check if vendorAssignments is stored in localstorage
  // useEffect(() => {
  //   const storedVendorAssignments = localStorage.getItem("vendorsAssignment");
  //   if (storedVendorAssignments) {
  //     setVendorAssignments(JSON.parse(storedVendorAssignments));
  //   }
  // }, []);

  // ---check wether vendor Assignment List is changed if yes then fetch the new list everytime
  // useEffect(() => {
  //   localStorage.setItem(
  //     "vendorsAssignment",
  //     JSON.stringify(vendorAssignments)
  //   );
  // }, [vendorAssignments]);

  // --- create project
  const handleCreateProject = async (clientData, projectData) => {
    // --- create a client ---> send the email and then create a project

    setIsLoading(true);
    try {
      const tempPassword = generateRandomPassword(8);
      const redefinedClientData = {
        ...clientData,
        role: "client",
        password: tempPassword,
      };

      console.log("redinfed Data");
      // Create Client
      const clientCreationResponse = await fetch("/api/auth/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(redefinedClientData),
        credentials: "include",
      });

      let clientResponseBody;
      try {
        clientResponseBody = await clientCreationResponse.json();
      } catch (jsonError) {
        console.error("Client creation JSON error:", jsonError);
        toast.error("Invalid client creation response format");
        return { success: false };
      }

      if (!clientCreationResponse.ok || !clientResponseBody.success) {
        toast.error(clientResponseBody.message || "Error creating client");
        return { success: false };
      }

      console.log("client created ");

      // Send email
      console.log("Sending email to:", redefinedClientData.email);
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          template: "newuser",
          email: redefinedClientData.email,
          name: redefinedClientData.name,
          password: redefinedClientData.password,
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

      console.log("creating project");
      // -- create Project
      const projectCreationResponse = await fetch(
        "/api/project/create-project",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...projectData,
            clientId: clientResponseBody?.userId,
          }),
        }
      );

      let projectResponseBody;
      try {
        projectResponseBody = await projectCreationResponse.json();
      } catch (jsonError) {
        console.error("Project creation JSON error:", jsonError);
        toast.error("Invalid Project creation response format");
        return { success: false };
      }
      console.log(projectResponseBody);
      if (!projectCreationResponse.ok || !projectResponseBody.success) {
        toast.error(projectResponseBody.message || "Error creating client");
        return { success: false };
      }

      await refetch();
      toast.success(projectResponseBody.message);
      return { success: true };
    } catch (error) {
      console.error("Project creation error:", error.message, error.stack);
      toast.error(error.message || "Unexpected error occurred");
      return { success: false };
    } finally {
      setIsLoading(false);
      console.log("Finished project creation process");
    }
  };

  // ---Assign to vendor and then notify
  const handleAssignToVendor = async (project, vendorInfo) => {
    //  --- check in the vendor list does project exist  and vendor id and type exist if yes the then display the vendor status
    // ---if not registered then push the new vendor assignment in the array
    setIsLoading(true);
    try {
      const projectAssigned = await fetch("/api/assign-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: project?._id,
          vendorId: vendorInfo?._id,
          vendorAcceptanceStatus: "requested",
        }),
      });

      let projectAssignedResponseBody;
      try {
        projectAssignedResponseBody = await projectAssigned.json();
      } catch (jsonError) {
        console.error("Project creation JSON error:", jsonError);
        toast.error("Invalid Project creation response format");
        return { success: false };
      }
      console.log(projectAssignedResponseBody);
      if (!projectAssigned.ok || !projectAssignedResponseBody.success) {
        toast.error(
          projectAssignedResponseBody.message || "Error creating client"
        );
        return { success: false };
      }

      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          template: "notification",
          email: vendorInfo?.email,
          name: vendorInfo?.name,
          projectName: project?.projectName,
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

      // --- create a function to handle the vendor assignment updation
      setVendorAssignments((prevAssig) => {
        const existingAssignment = prevAssig.find(
          (va) =>
            va?.vendorId === projectAssignedResponseBody?.data?.vendorId?._id &&
            va?.projectId === projectAssignedResponseBody?.data?.projectId?._id
        );

        if (existingAssignment) {
          // --- Update existing assignment
          return prevAssig;
        } else {
          return [...prevAssig, projectAssignedResponseBody?.data];
        }
      });

      toast.success("Project assigned successfully");
      return { success: true };
    } catch (error) {
      console.error("Project Assign  error:", error.message, error.stack);
      toast.error(error.message || "Unexpected error occurred");
      return { success: false };
    } finally {
      setIsLoading(false);
      console.log("Finished project assignement process");
    }
  };

  // --- Project will be send to vendors
  const handleTaskCreation = (project_id, vendor_type, tasks) => {
    const updatedProjects = projects.map((project) => {
      if (project?.id === project_id) {
        const updatedWorkers = project.workers.map((worker) => {
          if ((worker?.type).toLowerCase() === vendor_type.toLowerCase()) {
            return {
              ...worker,
              tasks, // assign new tasks
            };
          }
          return worker;
        });

        return {
          ...project,
          workers: updatedWorkers,
        };
      }

      return project;
    });

    setProjects(updatedProjects);
  };

  const value = {
    projects,
    combinedLoading,
    vendorAssignments,
    setVendorAssignments,
    handleCreateProject,
    handleAssignToVendor,
    handleTaskCreation,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export const useProject = () => {
  return useContext(ProjectContext);
};
