"use client";

import { useState } from "react";
import { z } from "zod";
import { format } from "date-fns";
import { useForm, Controller } from "react-hook-form";
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
  availableDesigners,
  createProjectSchema,
  projectType,
  workers,
} from "@/app/constants/utils";

// ---- Type for form values ----

export function CreateProjectDialog() {
  const [step, setStep] = useState("client");
  const [isOpen, setisOpen] = useState(false);
  const [selectWorkers, setSelectWorkers] = useState([]);

  const form = useForm({
    resolver: zodResolver(createProjectSchema),
    mode: "onTouched",
    defaultValues: {
      clientEmail: "",
      clientContact: "",
      clientName: "",
      project_name: "",
      project_type: "",
      designer: "",
      workers: [],
      dateRange: {
        from: new Date(),
        to: new Date(),
      },
    },
  });

  const onSubmit = (data) => {
    console.log("Submit data:", data);
  };

  const handleWork = (worker) => {
    const current = form.getValues("workers");
    if (worker === "All") {
      const updated = current.length === workers.length ? [] : workers;
      form.setValue("workers", updated);
      setSelectWorkers(updated);
    } else {
      const updated = current.includes(worker)
        ? current.filter((w) => w !== worker)
        : [...current, worker];
      form.setValue("workers", updated);
      setSelectWorkers(updated);
    }
  };

  const handleDialogClose = (open) => {
    console.log(open);
    if (!open) {
      form.reset();
      setStep("client");
      setSelectWorkers([]);
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

      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-3xl py-3">
            {step === "client" ? "Client Information" : "Project Information"}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
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
                    name="project_name"
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
                    name="project_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
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
                            <SelectTrigger>
                              <SelectValue placeholder="Select Designer" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableDesigners.map((designer) => (
                              <SelectItem
                                key={designer.value}
                                value={designer.value}
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
                    render={() => (
                      <FormItem>
                        <FormLabel>Work Type Required</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {workers.map((worker) => (
                            <FormField
                              key={worker}
                              control={form.control}
                              name="workers"
                              render={() => (
                                <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={selectWorkers.includes(worker)}
                                      onCheckedChange={() => handleWork(worker)}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {worker}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
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
                              onSelect={field.onChange}
                              numberOfMonths={2}
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
                  <Button type="button" onClick={() => setStep("project")}>
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
