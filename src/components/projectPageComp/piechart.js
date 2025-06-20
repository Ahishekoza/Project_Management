import { useMemo } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Label, Pie, PieChart, Cell } from "recharts";

const chartData = [
  { name: "Not Started", value: 5 },
  { name: "In Progress", value: 10 },
  { name: "Completed", value: 20 },
];

const chartConfig = {
  "Not Started": {
    label: "Not Started",
    color: "var(--chart-3)", 
  },
  "In Progress": {
    label: "In Progress",
    color: "var(--chart-2)",
  },
  Completed: {
    label: "Completed",
    color: "var(--chart-1)",
  },
};

export default function PieChartComp() {
  const totalProjects = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-full  w-full"
    >
      <PieChart>
        <ChartTooltip
          cursor={true}
          content={<ChartTooltipContent />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          strokeWidth={5}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={chartConfig[entry.name]?.color || "#000000"}
            />
          ))}

          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalProjects.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Projects
                    </tspan>
                  </text>
                );
              }
              return null;
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
