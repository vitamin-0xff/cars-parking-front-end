"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: LucideIcon
  trend?: "up" | "down" | "neutral"
  description?: string
}

export function StatsCard({
  title,
  value,
  change,
  changeLabel = "vs last period",
  icon: Icon,
  trend = "neutral",
  description,
}: StatsCardProps) {
  const trendColors = {
    up: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30",
    down: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30",
    neutral: "text-muted-foreground bg-muted/50",
  }

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {Icon && <Icon className="size-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="outline" className={trendColors[trend]}>
              <TrendIcon className="mr-1 size-3" />
              {Math.abs(change)}%
            </Badge>
            <span className="text-xs text-muted-foreground">{changeLabel}</span>
          </div>
        )}
        {description && <p className="mt-2 text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  )
}
