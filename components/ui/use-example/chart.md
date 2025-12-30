# Chart Component

A wrapper around Recharts library for creating beautiful, responsive charts with built-in theming support.

## Installation

The chart component is built on top of Recharts. Make sure you have the required dependencies:

```bash
pnpm add recharts
```

## Basic Usage

### Area Chart

```tsx
"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function AreaChartExample() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <AreaChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="desktop"
          stroke="var(--color-desktop)"
          fill="var(--color-desktop)"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ChartContainer>
  )
}
```

### Bar Chart

```tsx
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "Jan", revenue: 4000, expenses: 2400 },
  { month: "Feb", revenue: 3000, expenses: 1398 },
  { month: "Mar", revenue: 2000, expenses: 9800 },
  { month: "Apr", revenue: 2780, expenses: 3908 },
  { month: "May", revenue: 1890, expenses: 4800 },
  { month: "Jun", revenue: 2390, expenses: 3800 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function BarChartExample() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
        <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
```

### Line Chart

```tsx
"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { date: "2024-01", users: 100 },
  { date: "2024-02", users: 150 },
  { date: "2024-03", users: 200 },
  { date: "2024-04", users: 180 },
  { date: "2024-05", users: 250 },
  { date: "2024-06", users: 300 },
]

const chartConfig = {
  users: {
    label: "Active Users",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function LineChartExample() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="users"
          stroke="var(--color-users)"
          strokeWidth={2}
          dot={{ fill: "var(--color-users)" }}
        />
      </LineChart>
    </ChartContainer>
  )
}
```

### Pie Chart

```tsx
"use client"

import { Pie, PieChart, Cell } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const chartData = [
  { name: "Chrome", value: 275, fill: "hsl(var(--chart-1))" },
  { name: "Safari", value: 200, fill: "hsl(var(--chart-2))" },
  { name: "Firefox", value: 187, fill: "hsl(var(--chart-3))" },
  { name: "Edge", value: 173, fill: "hsl(var(--chart-4))" },
  { name: "Other", value: 90, fill: "hsl(var(--chart-5))" },
]

const chartConfig = {
  chrome: { label: "Chrome", color: "hsl(var(--chart-1))" },
  safari: { label: "Safari", color: "hsl(var(--chart-2))" },
  firefox: { label: "Firefox", color: "hsl(var(--chart-3))" },
  edge: { label: "Edge", color: "hsl(var(--chart-4))" },
  other: { label: "Other", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig

export function PieChartExample() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
        />
      </PieChart>
    </ChartContainer>
  )
}
```

## Chart Configuration

The `ChartConfig` object defines the labels and colors for each data series:

```tsx
const chartConfig = {
  dataKey: {
    label: "Display Label",
    color: "hsl(var(--chart-1))", // Use CSS variables for theming
    icon: IconComponent, // Optional icon
  },
} satisfies ChartConfig
```

## Available Chart Colors

The theme provides 5 chart colors by default:
- `--chart-1`
- `--chart-2`
- `--chart-3`
- `--chart-4`
- `--chart-5`

## Components

| Component | Description |
|-----------|-------------|
| `ChartContainer` | Wrapper that provides responsive sizing and theming |
| `ChartTooltip` | Tooltip component for showing data on hover |
| `ChartTooltipContent` | Pre-styled tooltip content |
| `ChartLegend` | Legend component for chart series |
| `ChartLegendContent` | Pre-styled legend content |
| `ChartStyle` | Injects chart CSS variables |