import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";

// This is the actual data being plotted
const chartConfig = [
  { type: "outdoor", value: 10 },
  { type: "commerical", value: 20 },
  { type: "room", value: 5 },
  { type: "house", value: 15 },
];

const RadarChartComp = () => {
  return (
    <ChartContainer
      config={chartConfig} // probably used internally by ChartContainer for legends or labels
      className="mx-auto aspect-square  h-full  w-full"
    >
      <ResponsiveContainer width="100%" height="100%" >
        <RadarChart data={chartConfig} >
          {/* If ChartTooltip is a custom wrapper for Recharts' Tooltip */}
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <PolarGrid stroke="var(--chart-2)" />
          <PolarAngleAxis dataKey="type" className="bg-red-950" />
          <Radar
            name="Usage"
            dataKey="value"
            fill="var(--chart-2)"
            fillOpacity={0.6}
            dot={{
              r: 4,
              fillOpacity: 1,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default RadarChartComp;
