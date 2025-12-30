"use client"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { TopNav } from "@/components/dashboard/top-nav"
import {  SidebarProvider } from "@/components/ui/sidebar"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
        <SidebarProvider>
            <DashboardSidebar />
        <div className="w-full">
              <TopNav />
              {children}
        </div>
        </SidebarProvider>
  )
}