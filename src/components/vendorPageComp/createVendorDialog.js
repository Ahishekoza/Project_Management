import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { vendorType } from "@/app/constants/utils";
import { ScrollArea } from "../ui/scroll-area";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vendorSchema } from "@/app/helperfns/zodSchema";
import { useState } from "react";
import { useVendor } from "@/contexts/VendorContext";
import { RotateCw } from "@deemlol/next-icons";

const CreateVendorDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleVendorCreation, isLoading } = useVendor();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(vendorSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      name: "",
      vendorType: "",
      contactNumber: "",
    },
  });

  const handleOnSubmit = async (data) => {
    const { success } = await handleVendorCreation(data);
    if (success) {
      handleDialogClose();
    }
  };

  const handleDialogClose = (open) => {
    if (!open) {
      reset();
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => setIsOpen(true)}>
          Register Vendor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-none">
        {isLoading && (
          <div className=" absolute z-10 flex justify-center items-center inset-0 ">
            <RotateCw
              size={36}
              className=" animate-spin w-8 h-8 text-primary"
            />
          </div>
        )}
        <DialogHeader>
          <DialogTitle>Register Vendor</DialogTitle>
          <DialogDescription>
            Enter vendor details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="grid gap-4 mb-3">
            <div className="grid gap-3">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="grid gap-3">
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                placeholder="Enter your name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="grid gap-3">
                <label>Vendor Type</label>
                <Select
                  onValueChange={(value) => setValue("vendorType", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select vendor type" />
                  </SelectTrigger>
                  <SelectContent>
                    <ScrollArea className="h-24">
                      {vendorType?.map((vendor_type) => (
                        <SelectItem
                          value={vendor_type?.value}
                          key={vendor_type?.type}
                        >
                          {vendor_type?.type}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
                {errors.vendorType && (
                  <p className="text-red-500 text-sm">
                    {errors.vendorType.message}
                  </p>
                )}
              </div>

              <div className="grid gap-3">
                <label htmlFor="contactNumber">Contact No.</label>
                <Input
                  id="contactNumber"
                  placeholder="+91-123456789"
                  {...register("contactNumber")}
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.contactNumber.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateVendorDialog;
