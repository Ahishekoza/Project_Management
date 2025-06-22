"use client";

import BarChartComp from "@/components/projectPageComp/barchart";
import { CreateProjectDialog } from "@/components/projectPageComp/createProjectDialog";
import PieChartComp from "@/components/projectPageComp/piechart";
import RadarChartComp from "@/components/projectPageComp/radarchart";
import { Separator } from "@/components/ui/separator";


export default function Project() {

  return (
    <div className="h-full">
      <div className="flex flex-row items-center justify-between">
        <p className="text-lg md:text-3xl  tracking-wide py-3 ">
          Project Status
        </p>
        <CreateProjectDialog/>
      </div>
      <div className=" flex flex-col h-full  gap-4 py-10">
        {/* Pie Chart Section */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* First Pie Chart - Project Status */}
          <div className="flex flex-col items-center w-full md:w-1/2 ">
            <div className="h-[250px] md:h-[300px] lg:h-[350px] w-full">
              <PieChartComp />
            </div>
            <p className="text-lg font-semibold text-center ">Project Status</p>
          </div>

          {/* Radar Chart */}
          <div className="flex flex-col items-center w-full md:w-1/2 ">
            <div className="h-[250px] md:h-[300px] lg:h-[350px] w-full">
              <RadarChartComp />
            </div>
            <p className="text-lg font-semibold text-center">
              Types of Projects
            </p>
          </div>
        </div>
        <Separator className={"bg-amber-600"} />
        {/* Bar Chart Section - Completed Projects */}
        <div className="flex-1 w-full flex flex-col items-center justify-center h-full mt-6">
          <div className="w-full h-[250px] md:h-[350px] ">
            <BarChartComp />
          </div>
          <p className="text-lg font-semibold text-center">
            Completed Projects
          </p>
        </div>
      </div>
    </div>
  );
}
