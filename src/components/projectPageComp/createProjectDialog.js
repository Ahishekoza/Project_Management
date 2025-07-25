"use client";

import { useEffect, useState } from "react";

import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  projectType,
  workers,
} from "@/app/constants/utils";
import { formatDateHelpfns, getMonthDifference } from "@/app/helperfns/helperfunctions";
import { useProject } from "@/contexts/ProjectContext";
import { useRouter } from "next/navigation";
import { RotateCw } from "@deemlol/next-icons";
import useGetHook from "@/hooks/useGetHook";
import { toast } from "sonner";
import { createProjectSchema } from "@/app/helperfns/zodSchema";
import { useAuth } from "@/contexts/AuthContext";

// ---- Type for form values ----

export function CreateProjectDialog() {
  const [step, setStep] = useState("client");
  const [isOpen, setisOpen] = useState(false);
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const { handleCreateProject , combinedLoading} = useProject();
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const router = useRouter();
 const {user} =  useAuth()

  // --- Fetching Designers [available-Designers]
  const {
    data: availableDesigners,
    loading:designersLoading,
    error:designersError,
    refetch:refetchDesigners
  } = useGetHook("/api/user?role=designer");

  const form = useForm({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      clientEmail: "",
      clientContact: "",
      clientName: "",
      projectName: "",
      projectType: "",
      designer: "",
      workers: [],
      dateRange: {
        from: new Date(),
        to: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      },
    },
  });

  // --- Shift this in ProjectContext
  const handleOnSubmit =  (data) => {
    // setIsSendingEmail(true);
    // const {
    //   clientEmail,
    //   clientContact,
    //   clientName,
    //   projectName,
    //   projectType,
    //   designer,
    //   workers,
    //   dateRange,
    // } = data;

    // const { from, to } = dateRange;
    // const project_period = getMonthDifference(from, to);

    // // --- there will be no client schema and vendor schema everyone will be saved in user with different role
    // const clientData = {
    //   clientContact,
    //   clientEmail,
    //   clientName,
    //   role: "client",
    // };

    // const projectData = {
    //   id: 2,
    //   projectName,
    //   projectType,
    //   clientName,
    //   designer,
    //   workers,
    //   dateRange,
    //   project_period,
    //   status: "not_started",
    // };

    // try {
    //   const clientResponse = handleCreateClient(clientData);

    //   if (!clientResponse?.success) {
    //     alert(clientResponse?.message || "Client creation failed.");
    //     return;
    //   }

    //   const projectResponse = handleCreateProject(projectData);

    //   if (!projectResponse?.success) {
    //     alert(projectResponse?.message || "Project creation failed.");
    //     return;
    //   }

    //   const response = await fetch("/api/send-email", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       name: `${clientData.clientName}`,
    //       email: `${clientData?.clientEmail}`,
    //       message: `Now you can track your project process on PM . Use the below \n\n email-id and password for login .\n\n Email : ${clientData.clientEmail} Password:AbhishekOza`,
    //     }),
    //   });

    //   if (response.ok) {
    //     setIsSendingEmail(false);

    //     await new Promise((resolve) => setTimeout(resolve, 300));

    //     handleDialogClose(false);
    //     sessionStorage.setItem("showProjectCreationToast", true);
    //     router.push("/admin/dashboard");
    //   }
    // } catch (error) {
    //   console.error("Submission error:", error);
    //   alert("Something went wrong. Please try again.");
    // } finally {
    //   setIsSendingEmail(false);
    // }

    const clientData = {
      name:data?.clientName,
      email:data?.clientEmail,
      contactNumber:data?.clientContact
    }

    const {from,to} = data?.dateRange
    const formatedFrom = formatDateHelpfns(from)
    const formatedTo = formatDateHelpfns(to)

    console.log(data.workers)

    const projectData ={
      projectName:data?.projectName,
      projectType:data?.projectType,
      workers:data?.workers,
      designerId:data?.designer,
      dateRange:{
        from:formatedFrom,
        to:formatedTo
      }
    }

 

    const {success} = handleCreateProject(clientData,projectData)
    if(success){
      handleDialogClose()
    }
  };

  const handleDateSelect = (range) => {
    if (range?.from && range?.to) {
      form.setValue("dateRange", range, { shouldValidate: true });
    }
  };

  const handleWorkerToggle = (worker) => {
    let updatedWorkers;

    if (worker.value === "all") {
      updatedWorkers =
        selectedWorkers.length === workers.length ? [] : [...workers];
    } else {
      const isSelected = selectedWorkers.some((w) => w.value === worker.value);

      const filteredWorkers = selectedWorkers.filter((w) => w.value !== "all");

      updatedWorkers = isSelected
        ? filteredWorkers.filter((w) => w.value !== worker.value)
        : [...filteredWorkers, worker];
    }

    setSelectedWorkers(updatedWorkers);
    form.setValue("workers", updatedWorkers);
  };

  const handleDialogClose = (open) => {
    if (!open) {
      form.reset();
      setStep("client");
      setSelectedWorkers([]);
    }
    setisOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => setisOpen(true)}>
          Create New Project
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] ">
        {combinedLoading && (
          <div className=" absolute inset-0  z-10 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <RotateCw size={24} className="animate-spin" />
              <p className="text-sm">Sending email...</p>
            </div>
          </div>
        )}
        <DialogHeader>
          <DialogTitle className="text-3xl py-3">
            {step === "client" ? "Client Information" : "Project Information"}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSubmit)}>
              {step === "client" && (
                <div className="flex flex-col gap-5 py-5 w-full">
                  <FormField
                    control={form.control}
                    name="clientEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="clientContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+81-7841838287" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === "project" && (
                <div className="flex flex-col gap-5 py-5 w-full">
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Modern Villa Renovation"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Project Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {projectType.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="designer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Designer</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Designer" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableDesigners?.map((designer) => (
                              <SelectItem
                                key={designer?._id}
                                value={designer?._id}
                              >
                                {designer.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="workers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Type Required</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {workers.map((worker) => {
                            const isChecked = selectedWorkers.some(
                              (w) => w.value === worker.value
                            );
                            return (
                              <FormItem
                                key={worker.value}
                                className="flex flex-row items-start space-x-2 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={isChecked}
                                    onCheckedChange={() =>
                                      handleWorkerToggle(worker)
                                    }
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {worker.type}
                                </FormLabel>
                              </FormItem>
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Duration</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className="justify-start text-left font-normal"
                              >
                                {field.value?.from && field.value?.to
                                  ? `${format(
                                      field.value.from,
                                      "PPP"
                                    )} → ${format(field.value.to, "PPP")}`
                                  : "Pick a date range"}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="range"
                              selected={field.value}
                              onSelect={handleDateSelect}
                              numberOfMonths={2}
                              disabled={{ before: new Date() }} // Disable past dates
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <DialogFooter className="flex justify-between pt-4">
                {step === "project" && (
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setStep("client")}
                  >
                    ← Back
                  </Button>
                )}
                {step === "client" && (
                  <Button
                    type="button"
                    disabled={!form.watch("clientEmail")}
                    onClick={() => setStep("project")}
                  >
                    Next →
                  </Button>
                )}
                {step === "project" && (
                  <Button type="submit">Create Project</Button>
                )}
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
