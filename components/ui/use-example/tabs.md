# Tabs Component Usage Examples

## Basic Usage

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <p>Account settings content here.</p>
  </TabsContent>
  <TabsContent value="password">
    <p>Password settings content here.</p>
  </TabsContent>
</Tabs>
```

## With Cards

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

<Tabs defaultValue="overview" className="space-y-4">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>View your dashboard overview.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Overview content goes here.</p>
      </CardContent>
    </Card>
  </TabsContent>
  <TabsContent value="analytics">
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>View detailed analytics.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Analytics content goes here.</p>
      </CardContent>
    </Card>
  </TabsContent>
  <TabsContent value="reports">
    <Card>
      <CardHeader>
        <CardTitle>Reports</CardTitle>
        <CardDescription>Generate and view reports.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Reports content goes here.</p>
      </CardContent>
    </Card>
  </TabsContent>
</Tabs>
```

## With Icons

```tsx
import { User, Settings, CreditCard, Bell } from "lucide-react"

<Tabs defaultValue="profile">
  <TabsList>
    <TabsTrigger value="profile" className="gap-2">
      <User className="size-4" />
      Profile
    </TabsTrigger>
    <TabsTrigger value="settings" className="gap-2">
      <Settings className="size-4" />
      Settings
    </TabsTrigger>
    <TabsTrigger value="billing" className="gap-2">
      <CreditCard className="size-4" />
      Billing
    </TabsTrigger>
    <TabsTrigger value="notifications" className="gap-2">
      <Bell className="size-4" />
      Notifications
    </TabsTrigger>
  </TabsList>
  <TabsContent value="profile">Profile settings</TabsContent>
  <TabsContent value="settings">General settings</TabsContent>
  <TabsContent value="billing">Billing information</TabsContent>
  <TabsContent value="notifications">Notification preferences</TabsContent>
</Tabs>
```

## Full Width Tabs

```tsx
<Tabs defaultValue="tab1" className="w-full">
  <TabsList className="w-full">
    <TabsTrigger value="tab1" className="flex-1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2" className="flex-1">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3" className="flex-1">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
  <TabsContent value="tab3">Content 3</TabsContent>
</Tabs>
```

## Controlled Tabs

```tsx
import { useState } from "react"

function ControlledTabs() {
  const [activeTab, setActiveTab] = useState("tab1")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <Button onClick={() => setActiveTab("tab2")}>
          Go to Tab 2
        </Button>
      </TabsContent>
      <TabsContent value="tab2">
        <Button onClick={() => setActiveTab("tab3")}>
          Go to Tab 3
        </Button>
      </TabsContent>
      <TabsContent value="tab3">
        <Button onClick={() => setActiveTab("tab1")}>
          Back to Tab 1
        </Button>
      </TabsContent>
    </Tabs>
  )
}
```

## With Forms

```tsx
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account" className="space-y-4">
    <div className="space-y-2">
      <label className="text-sm font-medium">Name</label>
      <Input placeholder="Your name" />
    </div>
    <div className="space-y-2">
      <label className="text-sm font-medium">Email</label>
      <Input type="email" placeholder="your@email.com" />
    </div>
    <Button>Save Changes</Button>
  </TabsContent>
  <TabsContent value="password" className="space-y-4">
    <div className="space-y-2">
      <label className="text-sm font-medium">Current Password</label>
      <Input type="password" />
    </div>
    <div className="space-y-2">
      <label className="text-sm font-medium">New Password</label>
      <Input type="password" />
    </div>
    <div className="space-y-2">
      <label className="text-sm font-medium">Confirm Password</label>
      <Input type="password" />
    </div>
    <Button>Update Password</Button>
  </TabsContent>
</Tabs>
```

## Disabled Tab

```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Enabled</TabsTrigger>
    <TabsTrigger value="tab2" disabled>Disabled</TabsTrigger>
    <TabsTrigger value="tab3">Enabled</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Tab 1 content</TabsContent>
  <TabsContent value="tab3">Tab 3 content</TabsContent>
</Tabs>
```

## With Badge Count

```tsx
import { Badge } from "@/components/ui/badge"

<Tabs defaultValue="inbox">
  <TabsList>
    <TabsTrigger value="inbox" className="gap-2">
      Inbox
      <Badge variant="secondary" className="size-5 p-0 justify-center">
        12
      </Badge>
    </TabsTrigger>
    <TabsTrigger value="sent">Sent</TabsTrigger>
    <TabsTrigger value="drafts" className="gap-2">
      Drafts
      <Badge variant="secondary" className="size-5 p-0 justify-center">
        3
      </Badge>
    </TabsTrigger>
  </TabsList>
  <TabsContent value="inbox">Inbox messages</TabsContent>
  <TabsContent value="sent">Sent messages</TabsContent>
  <TabsContent value="drafts">Draft messages</TabsContent>
</Tabs>
```

## Vertical Tabs

```tsx
<Tabs defaultValue="general" orientation="vertical" className="flex gap-4">
  <TabsList className="flex-col h-auto">
    <TabsTrigger value="general" className="w-full justify-start">
      General
    </TabsTrigger>
    <TabsTrigger value="security" className="w-full justify-start">
      Security
    </TabsTrigger>
    <TabsTrigger value="notifications" className="w-full justify-start">
      Notifications
    </TabsTrigger>
    <TabsTrigger value="billing" className="w-full justify-start">
      Billing
    </TabsTrigger>
  </TabsList>
  <div className="flex-1">
    <TabsContent value="general">General settings</TabsContent>
    <TabsContent value="security">Security settings</TabsContent>
    <TabsContent value="notifications">Notification settings</TabsContent>
    <TabsContent value="billing">Billing settings</TabsContent>
  </div>
</Tabs>
```