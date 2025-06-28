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
import { ScrollArea } from "@/components/ui/scroll-area";

const ProjectDisplay = ({
  avaliableVendorList,
  handleValueChange,
  projectId,
  vendorAssignments,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
      {Object.entries(avaliableVendorList)
        .filter(([, vendors]) => vendors.length > 0)
        .map(([type, vendors], index) => {
          // --- checking the status and displaying 
          const assignedStatus = vendorAssignments.find((va)=>va?.project_id === projectId && va?.vendor_type === type)
          return (
            <>
              <Card key={`${type}-${index}`}>
                <CardHeader
                  className={"flex flex-col md:flex-row items-center"}
                >
                  <div className="space-y-2 text-left">
                    <CardTitle>{type.toUpperCase()}</CardTitle>
                    <CardDescription>Maintain data for {type}</CardDescription>
                  </div>
                  {/* --- handle vendor selection */}
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
                </CardHeader>
                <ScrollArea className={"h-48 w-ful"}>
                  <CardContent>
                    <p>
                      Ancient manuscripts also divided sentences into paragraphs
                      with line breaks (newline) followed by an initial at the
                      beginning of the next paragraph. An initial is an
                      oversized capital letter, sometimes outdented beyond the
                      margin of the text. This style can be seen, for example,
                      in the original Old English manuscript of Beowulf.
                      Outdenting is still used in English typography, though not
                      commonly.[2] Modern English typography usually indicates a
                      new paragraph by indenting the first line. This style can
                      be seen in the (handwritten) United States Constitution
                      from 1787. For additional ornamentation, a hedera leaf or
                      other symbol can be added to the inter-paragraph white
                      space, or put in the indentation space. A second common
                      modern English style is to use no indenting, but add
                      vertical white space to create "block paragraphs." On a
                      typewriter, a double carriage return produces a blank line
                      for this purpose; professional typesetters (or word
                      processing software) may put in an arbitrary vertical
                      space by adjusting leading. This style is very common in
                      electronic formats, such as on the World Wide Web and
                      email. Wikipedia itself employs this format. Ancient
                      manuscripts also divided sentences into paragraphs with
                      line breaks (newline) followed by an initial at the
                      beginning of the next paragraph. An initial is an
                      oversized capital letter, sometimes outdented beyond the
                      margin of the text. This style can be seen, for example,
                      in the original Old English manuscript of Beowulf.
                      Outdenting is still used in English typography, though not
                      commonly.[2] Modern English typography usually indicates a
                      new paragraph by indenting the first line. This style can
                      be seen in the (handwritten) United States Constitution
                      from 1787. For additional ornamentation, a hedera leaf or
                      other symbol can be added to the inter-paragraph white
                      space, or put in the indentation space. A second common
                      modern English style is to use no indenting, but add
                      vertical white space to create "block paragraphs." On a
                      typewriter, a double carriage return produces a blank line
                      for this purpose; professional typesetters (or word
                      processing software) may put in an arbitrary vertical
                      space by adjusting leading. This style is very common in
                      electronic formats, such as on the World Wide Web and
                      email. Wikipedia itself employs this format.
                    </p>
                  </CardContent>
                </ScrollArea>
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
