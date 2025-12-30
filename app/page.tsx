"use client"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { TopNav } from "@/components/dashboard/top-nav"
import { StatsCard } from "@/components/dashboard/stats-card"
import { DataTable, type Column } from "@/components/dashboard/data-table"
import { ChartCard } from "@/components/dashboard/chart-card"
import { ActivityFeed, type Activity } from "@/components/dashboard/activity-feed"
import { Users, DollarSign, ShoppingCart, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "react-i18next"

// Sample data for demonstration
const statsData = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: 20.1,
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    title: "Active Users",
    value: "2,350",
    change: 12.5,
    trend: "up" as const,
    icon: Users,
  },
  {
    title: "Sales",
    value: "12,234",
    change: -4.3,
    trend: "down" as const,
    icon: ShoppingCart,
  },
  {
    title: "Growth Rate",
    value: "24.5%",
    change: 3.2,
    trend: "up" as const,
    icon: TrendingUp,
  },
]

const chartData = [
  { name: "Jan", revenue: 4000, users: 2400, sales: 1200 },
  { name: "Feb", revenue: 3000, users: 1398, sales: 980 },
  { name: "Mar", revenue: 2000, users: 9800, sales: 2100 },
  { name: "Apr", revenue: 2780, users: 3908, sales: 1800 },
  { name: "May", revenue: 1890, users: 4800, sales: 1500 },
  { name: "Jun", revenue: 2390, users: 3800, sales: 2000 },
]

const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
  users: { label: "Users", color: "hsl(var(--chart-2))" },
  sales: { label: "Sales", color: "hsl(var(--chart-3))" },
}

interface User {
  id: string
  name: string
  email: string
  status: "active" | "inactive" | "pending"
  role: string
  lastActive: string
}

const tableData: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    role: "Admin",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "active",
    role: "User",
    lastActive: "5 hours ago",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "inactive",
    role: "User",
    lastActive: "2 days ago",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice@example.com",
    status: "pending",
    role: "User",
    lastActive: "Never",
  },
]

const tableColumns: Column<User>[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (value) => {
      const colors = {
        active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
        inactive: "bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-400",
        pending: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
      }
      return (
        <Badge variant="outline" className={colors[value as keyof typeof colors]}>
          {value}
        </Badge>
      )
    },
  },
  { key: "role", label: "Role", sortable: true },
  { key: "lastActive", label: "Last Active", sortable: false },
]

const activities: Activity[] = [
  {
    id: "1",
    user: { name: "John Doe", initials: "JD" },
    action: "created a new report",
    target: "Q4 Analytics",
    timestamp: "5 minutes ago",
    type: "success",
  },
  {
    id: "2",
    user: { name: "Jane Smith", initials: "JS" },
    action: "updated user settings for",
    target: "Team Dashboard",
    timestamp: "15 minutes ago",
    type: "info",
  },
  {
    id: "3",
    user: { name: "Bob Johnson", initials: "BJ" },
    action: "deleted",
    target: "Old Project Files",
    timestamp: "1 hour ago",
    type: "warning",
  },
  {
    id: "4",
    user: { name: "Alice Williams", initials: "AW" },
    action: "encountered an error while processing",
    target: "Payment Transaction",
    timestamp: "2 hours ago",
    type: "error",
  },
]

export default function DashboardPage() {
  const handleRowAction = (action: string, row: User) => {
    console.log(`[v0] Action: ${action}, Row:`, row)
  }

  const {t} = useTranslation();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col">
          <TopNav />
          <main className="flex-1 space-y-6 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{t('dashboard.title')}</h1>
                <p className="text-muted-foreground">Welcome back! Here's an overview of your metrics.</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {statsData.map((stat) => (
                <StatsCard key={stat.title} {...stat} />
              ))}
            </div>

            {/* Charts Section */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <ChartCard
                    title="Revenue Overview"
                    description="Monthly revenue for the current year"
                    type="area"
                    data={chartData}
                    config={chartConfig}
                    dataKeys={["revenue"]}
                    xAxisKey="name"
                  />
                  <ChartCard
                    title="User Growth"
                    description="Active users over time"
                    type="line"
                    data={chartData}
                    config={chartConfig}
                    dataKeys={["users"]}
                    xAxisKey="name"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <ChartCard
                    title="Sales Comparison"
                    description="Monthly sales breakdown"
                    type="bar"
                    data={chartData}
                    config={chartConfig}
                    dataKeys={["sales"]}
                    xAxisKey="name"
                  />
                  <ActivityFeed activities={activities} />
                </div>
              </TabsContent>
              <TabsContent value="analytics" className="space-y-4">
                <ChartCard
                  title="Multi-metric Analysis"
                  description="Compare revenue, users, and sales"
                  type="line"
                  data={chartData}
                  config={chartConfig}
                  dataKeys={["revenue", "users", "sales"]}
                  xAxisKey="name"
                />
              </TabsContent>
              <TabsContent value="reports" className="space-y-4">
                <p className="text-muted-foreground">Report data would be displayed here.</p>
              </TabsContent>
            </Tabs>

            {/* Data Table Section */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Users</h2>
                <p className="text-muted-foreground">Manage your user accounts and permissions.</p>
              </div>
              <DataTable columns={tableColumns} data={tableData} onRowAction={handleRowAction} />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
