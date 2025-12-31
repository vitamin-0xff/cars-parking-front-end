"use client"
import { LayoutDashboard, BarChart3, Users, Settings, FileText, Calendar, Inbox, ParkingCircle, SquareParking, FlagIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Customizable navigation items
const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Parkings",
    icon: SquareParking,
    href: "/parkings",
  },
  {
    title: "Countries",
    icon: FlagIcon,
    href: "/countries",
  }
]

const secondaryItems = [
  {
    title: "Settings",
    icon: Settings,
    href: "#settings",
  },
]

export function DashboardSidebar() {
  const navigator = useRouter();

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LayoutDashboard className="size-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Dashboard</span>
            <span className="text-xs text-muted-foreground">Template v1.0</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <button onClick={() => navigator.replace(item.href)}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <div className="flex items-center gap-2 px-4 py-3">
          <Avatar className="size-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">john@example.com</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
