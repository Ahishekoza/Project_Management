
import { format } from 'date-fns';

// Helper functions to format the data
export const formatProjectType = (type) => {
  const types = {
    whole_house: "Whole House",
    specific_room: "Specific Room",
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

export const formatDateHelpfns =(date)=>{
  return  format(new Date(date),"dd-MM-yyyy")
}
