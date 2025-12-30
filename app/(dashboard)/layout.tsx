'use client'
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { TopNav } from "@/components/dashboard/top-nav"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ReactNode } from "react"

export default ({children}: {children: ReactNode}) => {

    return <>
    <SidebarProvider>
        <DashboardSidebar />
        <div className="w-full">
          <TopNav  />
        {children}
        </div>
    </SidebarProvider> 
    </>
}