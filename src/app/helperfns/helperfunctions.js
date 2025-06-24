import { format } from "date-fns";

// Helper functions to format the data
export const formatProjectType = (type) => {
  console.log(type)
  const types = {
    whole_house: "Whole House",
    specific_room: "Specific Room",
    "bungalow":"Bungalow"
  };
  return types[type] || type;
};

export const formatStatus = (status) => {
  const statuses = {
    in_progress: "In Progress",
    not_started: "Not Started",
    completed: "Completed",
  };
  return statuses[status] || status;
};

export const formatDateHelpfns = (date) => {
  return format(new Date(date), "dd-MM-yyyy");
};

export const getMonthDifference = (startDate, endDate) => {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();

  return (endYear - startYear) * 12 + (endMonth - startMonth);
};
