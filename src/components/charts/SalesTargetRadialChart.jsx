import {
    Label,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
    ResponsiveContainer
} from "recharts";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { getDynamicColor } from "@/utils/getDynamicColor";


const palette = ["#ef4444", "#f97316", "#f59e0b", "#10b981", "#6366f1", "#8b5cf6"];

const totalSales = Math.floor(Math.random() * 100);
const target = 100;
const percentage = (totalSales / target) * 100;
const remaining = target - percentage;

const salesTargetChartConfig = {
    sales: {
        label: "Sales Target",
    },
};

const salesTargetChartData = [
    {
        Month: "january",
        TotalSales: totalSales,
        Target: target,
        Percentage: percentage,
        Remaining: remaining,
    },
];

const SalesTargetRadialChart = () => {
    const formattedPercentage = percentage.toFixed(0);
    const dynamicColor = getDynamicColor(percentage);
    return (
        <ResponsiveContainer width="100%" height={200}>
            <ChartContainer
                config={salesTargetChartConfig}
                className="mx-auto aspect-square w-full max-w-[250px]"
            >
                <RadialBarChart
                    data={salesTargetChartData}
                    startAngle={360}
                    endAngle={0}
                    innerRadius={80}
                    outerRadius={130}
                >
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                        <Label
                            content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle"
                                            dominantBaseline="middle" className="fill-slate-900 dark:fill-slate-50">
                                            <tspan
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                className="text-4xl font-bold"
                                            >
                                                {formattedPercentage}%
                                            </tspan>
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) + 24}
                                                className="text-sm"
                                            >
                                                out of {target}
                                            </tspan>
                                        </text>
                                    );
                                }
                            }}
                        />
                    </PolarRadiusAxis>
                    <RadialBar
                        dataKey="Percentage"
                        stackId="a"
                        cornerRadius={5}
                        fill={dynamicColor}
                        className="stroke-transparent stroke-2"
                    />
                    <RadialBar
                        dataKey="Remaining"
                        stackId="a"
                        cornerRadius={5}
                        fill="#f3f4f6"
                        className="stroke-transparent stroke-2"
                    />
                </RadialBarChart>
            </ChartContainer>
        </ResponsiveContainer>

    )
}

export default SalesTargetRadialChart
