# Sidebar Component

A comprehensive sidebar component with collapsible sections, navigation items, and responsive behavior.

## Import

```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
```

## Basic Usage

```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Home, Users, Settings } from "lucide-react"

const menuItems = [
  { title: "Home", icon: Home, href: "/" },
  { title: "Users", icon: Users, href: "/users" },
  { title: "Settings", icon: Settings, href: "/settings" },
]

export function BasicSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.href}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
```

## With Header and Footer

```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LayoutDashboard, Home, Settings } from "lucide-react"

export function SidebarWithHeaderFooter() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutDashboard className="size-4" />
            </div>
            <span className="font-semibold">Dashboard</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/">
                      <Home className="size-4" />
                      <span>Home</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/settings">
                      <Settings className="size-4" />
                      <span>Settings</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t">
          <div className="flex items-center gap-2 px-4 py-3">
            <Avatar className="size-8">
              <AvatarImage src="/avatar.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">
                john@example.com
              </span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
```

## Complete Dashboard Layout

```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  FileText,
  Calendar,
  Inbox,
} from "lucide-react"

const navigationItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/" },
  { title: "Analytics", icon: BarChart3, href: "/analytics" },
  { title: "Users", icon: Users, href: "/users" },
  { title: "Reports", icon: FileText, href: "/reports" },
  { title: "Calendar", icon: Calendar, href: "/calendar" },
  { title: "Messages", icon: Inbox, href: "/messages" },
]

const settingsItems = [
  { title: "Settings", icon: Settings, href: "/settings" },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutDashboard className="size-4" />
            </div>
            <span className="font-semibold">My App</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.href}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </a>
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
                {settingsItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.href}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t p-4">
          <p className="text-xs text-muted-foreground">© 2024 My App</p>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b px-4">
          <SidebarTrigger />
          <h1 className="font-semibold">Page Title</h1>
        </header>
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

## With i18n Support

```tsx
"use client"

import { useTranslation } from "react-i18next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Users, Settings } from "lucide-react"

export function I18nSidebar() {
  const { t } = useTranslation()

  const navigationItems = [
    { titleKey: "navigation.dashboard", icon: LayoutDashboard, href: "/" },
    { titleKey: "navigation.users", icon: Users, href: "/users" },
    { titleKey: "navigation.settings", icon: Settings, href: "/settings" },
  ]

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("navigation.menu")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.titleKey}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon className="size-4" />
                      <span>{t(item.titleKey)}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
```

## Components

| Component | Description |
|-----------|-------------|
| `SidebarProvider` | Context provider for sidebar state |
| `Sidebar` | Main sidebar container |
| `SidebarHeader` | Top section of sidebar |
| `SidebarContent` | Scrollable content area |
| `SidebarFooter` | Bottom section of sidebar |
| `SidebarGroup` | Groups related menu items |
| `SidebarGroupLabel` | Label for a group |
| `SidebarGroupContent` | Container for group items |
| `SidebarMenu` | Container for menu items |
| `SidebarMenuItem` | Individual menu item wrapper |
| `SidebarMenuButton` | Clickable button for menu items |
| `SidebarTrigger` | Toggle button for sidebar |
| `SidebarInset` | Main content area next to sidebar |

## Notes

- Always wrap your app with `SidebarProvider`
- Use `SidebarTrigger` to toggle the sidebar on mobile
- The sidebar automatically collapses on smaller screens
- Combine with `SidebarInset` for proper layout structure