# MainContainer Component

A layout wrapper component that provides consistent padding and structure for page content.

## Import

```tsx
import MainContainer from "@/components/ui/main-container"
```

## Basic Usage

```tsx
import MainContainer from "@/components/ui/main-container"
import { PageHeader } from "@/components/ui/defined-components/page-header"

export default function DashboardPage() {
  return (
    <MainContainer>
      <PageHeader title="Dashboard" subtitle="Welcome to your dashboard" />
      <div className="mt-4">
        {/* Your page content here */}
        <p>Main content goes here</p>
      </div>
    </MainContainer>
  )
}
```

## With Cards Layout

```tsx
import MainContainer from "@/components/ui/main-container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AnalyticsPage() {
  return (
    <MainContainer>
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,234</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$12,345</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">567</p>
          </CardContent>
        </Card>
      </div>
    </MainContainer>
  )
}
```

## With Full Page Layout

```tsx
import MainContainer from "@/components/ui/main-container"
import { PageHeader } from "@/components/ui/defined-components/page-header"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <MainContainer>
      <div className="flex items-center justify-between">
        <PageHeader title="Settings" subtitle="Manage your account settings" />
        <Button>Save Changes</Button>
      </div>
      
      <div className="mt-6 space-y-6">
        {/* Settings sections */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Profile</h2>
          <p className="text-muted-foreground">
            Update your profile information.
          </p>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold mb-2">Notifications</h2>
          <p className="text-muted-foreground">
            Configure your notification preferences.
          </p>
        </section>
      </div>
    </MainContainer>
  )
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | `React.ReactNode` | Content to be rendered inside the container |

## Notes

- The MainContainer provides consistent horizontal padding
- It automatically handles responsive spacing
- Use it as the top-level wrapper for your page content
- Combine with `PageHeader` for consistent page layouts