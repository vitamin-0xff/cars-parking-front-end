import type React from "react"
/**
 * Dashboard Template Type Definitions
 *
 * These types can be customized for different dashboard implementations
 */

export interface DashboardConfig {
  name: string
  description?: string
  theme: {
    primaryColor: string
    accentColor: string
    mode: "light" | "dark"
  }
}

export interface NavigationItem {
  title: string
  href: string
  icon?: string
  children?: NavigationItem[]
}

export interface MetricCard {
  id: string
  title: string
  value: string | number
  change?: number
  trend?: "up" | "down" | "neutral"
  format?: "currency" | "percentage" | "number"
}

export interface ChartData {
  id: string
  name: string
  type: "line" | "bar" | "area" | "pie"
  data: Record<string, any>[]
  config: Record<string, any>
}

export interface TableConfig<T> {
  id: string
  columns: Array<{
    key: keyof T
    label: string
    sortable?: boolean
    filterable?: boolean
    render?: (value: any, row: T) => React.ReactNode
  }>
  data: T[]
  actions?: Array<{
    label: string
    handler: (row: T) => void
  }>
}

export interface DashboardSection {
  id: string
  title: string
  description?: string
  type: "stats" | "chart" | "table" | "activity" | "custom"
  layout?: {
    cols?: number
    rows?: number
    span?: number
  }
}
