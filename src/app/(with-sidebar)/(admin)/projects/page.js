"use client"

import BarChartComp from "@/components/projectPageComp/barchart";
import PieChartComp from "@/components/projectPageComp/piechart";

export default function Project() {
  return (
    <div className="w-full h-full overflow-hidden ">
      {/* Heading */}
      <p className="text-3xl tracking-wide py-3">Project Status</p>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 h-full overflow-hidden  ">
        <div className="flex flex-col items-center justify-center md:flex-row gap-3">
          <PieChartComp/>
          <PieChartComp/>
        </div>
        <div className="xl:flex xl:justify-center xl:items-center h-full w-full">
          <BarChartComp/>
        </div>
      </div>
    </div>
  );
}
