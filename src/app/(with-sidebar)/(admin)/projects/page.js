"use client";

import BarChartComp from "@/components/projectPageComp/barchart";
import PieChartComp from "@/components/projectPageComp/piechart";
import RadarChartComp from "@/components/projectPageComp/radarchart";
import { Separator } from "@/components/ui/separator";

export default function Project() {
  return (
    // <div className=" h-full  bg-red-500">
    //   {/* Heading */}
    //   <p className="text-3xl tracking-wide py-3">Project Status</p>

    //   {/* Grid Container */}
    //   {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 h-full overflow-hidden  ">
    //     <div className="flex flex-col items-center justify-center md:flex-row gap-3">
    //       <PieChartComp/>
    //       <PieChartComp/>
    //     </div>
    //     <div className="xl:flex xl:justify-center xl:items-center h-full w-full">
    //       <BarChartComp/>
    //     </div>
    //   </div> */}

    //   <div className="flex flex-row md:flex-col h-full p-2 gap-2">
    //     <div className="flex flex-col md:flex-row items-center h-full justify-center gap-2">
    //       <div className="h-full w-full bg-yellow-200">1</div>
    //       <div className="h-full w-full bg-yellow-200">2</div>
    //     </div>
    //     <div>

    //     </div>
    //   </div>

    // </div>

    <div className="font-mono h-full">
      <p className="text-3xl tracking-wide py-3">Project Status</p>
      <div className=" flex flex-col   gap-4 py-10">
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
        <Separator className={"bg-amber-600"}/>
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
