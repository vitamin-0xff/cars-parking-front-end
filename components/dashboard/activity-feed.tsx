"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export interface Activity {
  id: string
  user: {
    name: string
    avatar?: string
    initials: string
  }
  action: string
  target?: string
  timestamp: string
  type?: "success" | "warning" | "error" | "info"
}

interface ActivityFeedProps {
  activities: Activity[]
  title?: string
}

export function ActivityFeed({ activities, title = "Recent Activity" }: ActivityFeedProps) {
  const typeColors = {
    success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
    warning: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    error: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400",
    info: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <Avatar className="size-8">
                  <AvatarImage src={activity.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">{activity.user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{activity.user.name}</p>
                    {activity.type && (
                      <Badge variant="outline" className={typeColors[activity.type]}>
                        {activity.type}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activity.action}
                    {activity.target && <span className="font-medium text-foreground"> {activity.target}</span>}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
