// ---implement params based project fetching
"use client";

import { useProject } from "@/contexts/ProjectContext";
import { useVendor } from "@/contexts/VendorContext";
import { useEffect } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProjectPage() {
  const { projects } = useProject();
  const { handleAvailablevendorsPerProject, avaliableVendorList } = useVendor();
  useEffect(() => {
    // --- get the project with the projectId from projects
    const project = projects[0];

    if (project?.workers.length > 0)
      handleAvailablevendorsPerProject(project?.workers);

    //   ---also depends on projectId but we haven`t configured here
  }, []);

  // console.log(avaliableVendorList.filter((av)=>av.length).map())

  return (
    <div className="p-4">
      {/* <h1 className="text-xl font-bold mb-4">
        Vendors for Project: {projectId}
      </h1> */}

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
        {avaliableVendorList ? (
          <div className="space-y-4">
            {Object.entries(avaliableVendorList)
              .filter(([, vendors]) => vendors.length > 0)
              .map(([type, vendors]) => (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Card Title</CardTitle>
                      <CardDescription>Card Description</CardDescription>
                      <CardAction>Card Action</CardAction>
                    </CardHeader>
                    <ScrollArea className={"h-48 w-ful"}>
                      <CardContent>
                        <p>
                          Ancient manuscripts also divided sentences into
                          paragraphs with line breaks (newline) followed by an
                          initial at the beginning of the next paragraph. An
                          initial is an oversized capital letter, sometimes
                          outdented beyond the margin of the text. This style
                          can be seen, for example, in the original Old English
                          manuscript of Beowulf. Outdenting is still used in
                          English typography, though not commonly.[2] Modern
                          English typography usually indicates a new paragraph
                          by indenting the first line. This style can be seen in
                          the (handwritten) United States Constitution from
                          1787. For additional ornamentation, a hedera leaf or
                          other symbol can be added to the inter-paragraph white
                          space, or put in the indentation space. A second
                          common modern English style is to use no indenting,
                          but add vertical white space to create "block
                          paragraphs." On a typewriter, a double carriage return
                          produces a blank line for this purpose; professional
                          typesetters (or word processing software) may put in
                          an arbitrary vertical space by adjusting leading. This
                          style is very common in electronic formats, such as on
                          the World Wide Web and email. Wikipedia itself employs
                          this format. Ancient manuscripts also divided
                          sentences into paragraphs with line breaks (newline)
                          followed by an initial at the beginning of the next
                          paragraph. An initial is an oversized capital letter,
                          sometimes outdented beyond the margin of the text.
                          This style can be seen, for example, in the original
                          Old English manuscript of Beowulf. Outdenting is still
                          used in English typography, though not commonly.[2]
                          Modern English typography usually indicates a new
                          paragraph by indenting the first line. This style can
                          be seen in the (handwritten) United States
                          Constitution from 1787. For additional ornamentation,
                          a hedera leaf or other symbol can be added to the
                          inter-paragraph white space, or put in the indentation
                          space. A second common modern English style is to use
                          no indenting, but add vertical white space to create
                          "block paragraphs." On a typewriter, a double carriage
                          return produces a blank line for this purpose;
                          professional typesetters (or word processing software)
                          may put in an arbitrary vertical space by adjusting
                          leading. This style is very common in electronic
                          formats, such as on the World Wide Web and email.
                          Wikipedia itself employs this format.
                        </p>
                      </CardContent>
                    </ScrollArea>
                    <CardFooter>
                      <p>Card Footer</p>
                    </CardFooter>
                  </Card>
                </>
              ))}
          </div>
        ) : (
          <p>Loading vendors...</p>
        )}
      </div>
    </div>
  );
}
