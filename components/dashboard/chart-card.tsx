"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

export type ChartType = "line" | "bar" | "area" | "pie"

interface ChartCardProps {
  title: string
  description?: string
  type: ChartType
  data: any[]
  config: ChartConfig
  dataKeys: string[]
  xAxisKey?: string
}

export function ChartCard({ title, description, type, data, config, dataKeys, xAxisKey = "name" }: ChartCardProps) {
  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey={xAxisKey} className="text-xs" />
            <YAxis className="text-xs" />
            <ChartTooltip content={<ChartTooltipContent />} />
            {dataKeys.map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={`var(--color-${key})`}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        )

      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey={xAxisKey} className="text-xs" />
            <YAxis className="text-xs" />
            <ChartTooltip content={<ChartTooltipContent />} />
            {dataKeys.map((key) => (
              <Bar key={key} dataKey={key} fill={`var(--color-${key})`} radius={4} />
            ))}
          </BarChart>
        )

      case "area":
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey={xAxisKey} className="text-xs" />
            <YAxis className="text-xs" />
            <ChartTooltip content={<ChartTooltipContent />} />
            {dataKeys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={`var(--color-${key})`}
                fill={`var(--color-${key})`}
                fillOpacity={0.2}
                stackId={index}
              />
            ))}
          </AreaChart>
        )

      case "pie":
        const colors = dataKeys.map((_, i) => `hsl(var(--chart-${(i % 5) + 1}))`)
        return (
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie data={data} dataKey={dataKeys[0]} nameKey={xAxisKey} cx="50%" cy="50%" outerRadius={80} label>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-[300px] w-full">
          {renderChart()}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
