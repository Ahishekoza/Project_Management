"use client";

import { useContext, createContext, useState, useEffect } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  // -- create a state which will always watch status changes for the of the assigned vendor
  // -- to notify the admin/designer
  const [clients, setClients] = useState([]);
  const [vendorAssignments, setVendorAssignments] = useState([]);

  // --Projects
  useEffect(() => {
    const storedProjects = localStorage.getItem("projects");
    storedProjects ? setProjects(JSON.parse(storedProjects)) : setProjects([]);
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  // --Clients
  useEffect(() => {
    const storedClients = localStorage.getItem("clients");
    if (storedClients) {
      setClients(JSON.parse(storedClients));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  // --- vendor Assignments
  // --- every time useContext is called render / check if vendorAssignments is stored in localstorage
  useEffect(() => {
    const storedVendorAssignments = localStorage.getItem("vendorsAssignment");
    if (storedVendorAssignments) {
      setVendorAssignments(JSON.parse(storedVendorAssignments));
    }
  }, []);

  // ---check wether vendor Assignment List is changed if yes then fetch the new list everytime
  useEffect(() => {
    localStorage.setItem(
      "vendorsAssignment",
      JSON.stringify(vendorAssignments)
    );
  }, [vendorAssignments]);


  const handleCreateClient = (clientData) => {
    const ispresent = clients.some(
      (c) => c.clientEmail === clientData?.clientEmail
    );

    if (ispresent) {
      alert("Client is already present you can add new project in to it");
      return;
    }

    try {
      setClients((preClients) => [...preClients, clientData]);
      return { success: true, message: "clientAdded" };
    } catch (error) {
      return {
        success: false,
        message: `Error registering client ${error.message}`,
      };
    }
  };

  // --- create project
  const handleCreateProject = (projectData) => {
    console.log(projectData);
    const ispresent = projects.some(
      (c) => c.project_name === projectData.project_name
    );

    if (ispresent) {
      alert("Project is already present edit it");
      return;
    }

    try {
      setProjects((preProjects) => [...preProjects, projectData]);

      return { success: true, message: "project added Successfully" };
    } catch (error) {
      return {
        success: false,
        message: `Error registering project ${error.message}`,
      };
    }
  };

  // ---Assign to vendor and then notify
  const handleAssignToVendor = (projectId, vendorInfo) => {
    //  --- check in the vendor list does project exist  and vendor id and type exist if yes the then display the vendor status
    // ---if not registered then push the new vendor assignment in the array
    const isPresent = vendorAssignments.find(
      (va) => va.project_id === projectId && va.vendor_id === vendorInfo?._id
    );

    if (isPresent) {
      alert(
        `Project has been assigned to the vendor . current status is ${isPresent?.status}`
      );
      return;
    }

    const assignToVendor = {
      project_id: projectId,
      vendor_id: vendorInfo?.id,
      status: "requested",
      vendor_name: vendorInfo?.vendor_name,
      vendor_type: vendorInfo?.vendor_type,
    };

    setVendorAssignments((prev) => [...prev, assignToVendor]);
    alert(
      `Project has been assigned for worker type ${vendorInfo?.vendor_type} `
    );
    return;
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
    vendorAssignments,
    setVendorAssignments,
    handleCreateClient,
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
