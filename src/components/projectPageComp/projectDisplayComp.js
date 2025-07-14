import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TaskDisplayComp from "./taskDisplayComp";

const ProjectDisplay = ({
  avaliableVendorList,
  handleValueChange,
  project,
  vendorAssignments,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
      {Object.entries(avaliableVendorList)
        .filter(([, vendors]) => vendors.length > 0)
        .map(([type, vendors], index) => {
          // --- checking the status and displaying
          const assignedVendor = vendorAssignments.find(
            (va) =>
              va?.projectId?._id === project?._id &&
              va?.vendorId?.vendorType === type
          );
          console.log(vendorAssignments);
          return (
            <>
              <Card key={`${type}`}>
                <CardHeader
                  className={"flex flex-col md:flex-row items-center  "}
                >
                  <div className="space-y-2 text-left">
                    <CardTitle>{type.toUpperCase()}</CardTitle>
                    <CardDescription>Maintain data for {type}</CardDescription>
                  </div>
                  {/* --- handle vendor selection */}
                  {assignedVendor?.vendorName !== null &&
                  assignedVendor?.status === "accepted" ? (
                    <p className="md:text-right text-center w-full md:px-6 px-0">
                      Vendor appointed :- {assignedVendor?.vendorName}
                    </p>
                  ) : assignedVendor?.vendorName === "requested" ? (
                    <p className="md:text-right text-center w-full md:px-6 px-0">
                      Vendor appointed :- {assignedVendor?.vendorName}
                    </p>
                  ) : (
                    <Select
                      className="flex-1"
                      onValueChange={(selectedVendorInfo) => {
                        const selectedVendor = vendors.find(
                          (v) => v?._id === selectedVendorInfo?._id
                        );
                        handleValueChange(selectedVendor);
                      }}
                    >
                      <SelectTrigger className={"w-full"}>
                        <SelectValue placeholder={`VendorsList ${type}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {vendors.map((vendor) => (
                          <SelectItem value={vendor} key={vendor?._id}>
                            {vendor?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </CardHeader>
                {/* -- create a component and pass 
                show you can create task ones the worker accepts the request
                */}
                <CardContent>
                  <TaskDisplayComp
                    vendor_type={assignedVendor?.vendorId?.vendorType}
                    project={project}
                  />
                </CardContent>
                <CardFooter>
                  <p>{assignedVendor?.vendorAcceptanceStatus}</p>
                </CardFooter>
              </Card>
            </>
          );
        })}
    </div>
  );
};

export default ProjectDisplay;
