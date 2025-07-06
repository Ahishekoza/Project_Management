"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Image } from "@deemlol/next-icons";
import { useProject } from "@/contexts/ProjectContext";

const TaskDisplayComp = ({ vendor_type, project }) => {
  const { handleTaskCreation } = useProject();

  const selectedWorker = project?.workers.find(
    (worker) => (worker?.type)?.toLowerCase() === vendor_type?.toLowerCase()
  );

  const [tasks, setTasks] = useState(
    selectedWorker?.tasks || [{ id: 1, description: "", imageUrl: "" }]
  );

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setTasks(updatedTasks);
  };
  const handleAddTask = () => {
    setTasks([...tasks, { description: "", imageUrl: "" }]);
  };

  // --- After adding the task add the new task
  const handleSaveTask = () => {
    // -- project, workertype
    handleTaskCreation(project?.id, vendor_type, tasks);
  };

  const handleImageUpload = (index, file) => {
    console.log(file);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-2 mb-2 ">
        <Button className={" w-full md:w-1/2"} onClick={handleAddTask}>
          Add Task
        </Button>
        <Button className={" w-full md:w-1/2"} onClick={handleSaveTask}>
          Save Task
        </Button>
      </div>
      <ScrollArea className={"h-48  "}>
        {tasks?.map((task, index) => {
          return (
            <div key={index} className="border p-4 mb-2 rounded-md">
              <textarea
                value={task.description}
                onChange={(e) =>
                  handleTaskChange(index, "description", e.target.value)
                }
                placeholder="Write task..."
                className="w-full resize-none p-2 border rounded"
              />

              <div className="w-fit">
                <Label htmlFor="imageLabel" className={"my-2 cursor-pointer"}>
                  Upload bills
                  <Image size={20} color="#804E49" />
                </Label>
                <Input
                  type="file"
                  id="imageLabel"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(index, e.target.files[0])}
                  className=" cursor-pointer hidden"
                />
              </div>

              {task.imageUrl && (
                <a
                  href={task.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline mt-1 block"
                >
                  View uploaded image
                </a>
              )}
            </div>
          );
        })}
      </ScrollArea>
    </>
  );
};

export default TaskDisplayComp;
