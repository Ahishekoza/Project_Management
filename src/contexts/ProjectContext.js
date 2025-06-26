"use client";

import { useContext, createContext, useState, useEffect } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [projectNotification, setProjectNotification] = useState([]);
  const [clients, setClients] = useState([]);

  // Read localStorage only on client after mount
  useEffect(() => {
    const storedProjects = localStorage.getItem("projects");
    storedProjects ? setProjects(JSON.parse(storedProjects)) : setProjects([])
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    const storedClients = localStorage.getItem("clients");
    if (storedClients) {
      setClients(JSON.parse(storedClients));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

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
  const handleCreateProject =  (projectData) => {
    console.log(projectData)
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
  const handleAssignToVendor = (projectId, vendor_type, vendorInfo) => {};

  // --- Project will be send to vendors
  const handleNotification = () => {};

  const value = {
    projects,
    handleCreateClient,
    handleCreateProject,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export const useProject = () => {
  return useContext(ProjectContext);
};
