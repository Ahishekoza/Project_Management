"use client";

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Monitor } from "lucide-react";

const designerData = [
  { designer: "Yogesh Vyas", total: 12 },
  { designer: "Pranjal Vyas", total: 8 },
  { designer: "Rahul Sharma", total: 15 },
];

const designerConfig = {
  total: {
    label: "Total Projects",
    icon: Monitor,
    // A color like 'hsl(220, 98%, 61%)' or 'var(--color-name)'
    color: "var(--chart-2)",
  },
};

export default function BarChartComp() {
  return (
    <ChartContainer className={"h-full w-full"} config={designerConfig}>
      <BarChart accessibilityLayer data={designerData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="designer"
          tickLine={false}
          tickMargin={10}
          axisLine={true}
        />
        <YAxis />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent  />}
        />
        <Bar dataKey="total" fill="var(--color-total)" radius={8} />
      </BarChart>
    </ChartContainer>
  );
}
