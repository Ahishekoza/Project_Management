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
  console.log(project)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
      {Object.entries(avaliableVendorList)
        .filter(([, vendors]) => vendors.length > 0)
        .map(([type, vendors], index) => {
          // --- checking the status and displaying
          const assignedStatus = vendorAssignments.find(
            (va) => va?.project_id === String(project?.id) && va?.vendor_type === type
          );
          return (
            <>
              <Card key={`${type}-${index}`}>
                <CardHeader
                  className={"flex flex-col md:flex-row items-center  "}
                >
                  <div className="space-y-2 text-left">
                    <CardTitle>{type.toUpperCase()}</CardTitle>
                    <CardDescription>Maintain data for {type}</CardDescription>
                  </div>
                  {/* --- handle vendor selection */}
                  {assignedStatus?.vendor_name !== null &&
                  assignedStatus?.status === "accepted" ? (
                    <p className="md:text-right text-center w-full md:px-6 px-0">
                      Vendor appointed :- {assignedStatus?.vendor_name}
                    </p>
                  ) : (
                    <Select
                      className="flex-1"
                      onValueChange={(selectedVendorId) => {
                        const selectedVendor = vendors.find(
                          (v) => v?._id === selectedVendorId
                        );
                        handleValueChange(selectedVendor);
                      }}
                    >
                      <SelectTrigger className={"w-full"}>
                        <SelectValue placeholder={`VendorsList ${type}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {vendors.map((vendor) => (
                          <SelectItem value={vendor?._id} key={vendor?._id}>
                            {vendor?.vendor_name}
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
                  <TaskDisplayComp/>
                </CardContent>
                <CardFooter>
                  <p>{assignedStatus?.status}</p>
                </CardFooter>
              </Card>
            </>
          );
        })}
    </div>
  );
};

export default ProjectDisplay;
