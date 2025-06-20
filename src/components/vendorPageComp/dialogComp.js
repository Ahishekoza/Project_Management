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

const DialogComp = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="default">Register Vendor</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]   border-none">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="grid gap-3">
                <label htmlFor="name-1">Name</label>
                <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
              </div>

              {/* ---vendor Type */}
              <div className="grid gap-3 ">
                <label>Vendor Type</label>
                <Select>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendorType?.map((vendor_type) => (
                      <SelectItem
                        value={vendor_type?.value}
                        key={vendor_type?.type}
                      >
                        {vendor_type?.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-3">
              <label htmlFor="phonenumber">Contact No.</label>
              <Input  id="phonenumber" name="phonenumber" placeholder="+91-123456789" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default DialogComp;
