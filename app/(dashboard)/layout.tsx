'use client'
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { TopNav } from "@/components/dashboard/top-nav"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()


export default ({children}: {children: ReactNode}) => {

    return <>
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
          <DashboardSidebar />
          <div className="w-full">
            <TopNav  />
          {children}
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
      </SidebarProvider> 
    </QueryClientProvider>
    </>
}