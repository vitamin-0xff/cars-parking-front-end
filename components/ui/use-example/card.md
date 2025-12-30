# Card Component Usage Examples

## Basic Usage

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
  <CardFooter>
    <p>Card footer</p>
  </CardFooter>
</Card>
```

## Simple Card

```tsx
<Card>
  <CardContent className="p-6">
    <p>Simple card with just content.</p>
  </CardContent>
</Card>
```

## Stats Card

```tsx
import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react"

<Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
    <DollarSign className="size-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">$45,231.89</div>
    <p className="text-xs text-muted-foreground">
      +20.1% from last month
    </p>
  </CardContent>
</Card>
```

## Stats Grid

```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
      <DollarSign className="size-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">$45,231.89</div>
      <p className="text-xs text-muted-foreground">+20.1% from last month</p>
    </CardContent>
  </Card>
  
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Active Users</CardTitle>
      <Users className="size-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">+2,350</div>
      <p className="text-xs text-muted-foreground">+180.1% from last month</p>
    </CardContent>
  </Card>
  
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Sales</CardTitle>
      <ShoppingCart className="size-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">+12,234</div>
      <p className="text-xs text-muted-foreground">+19% from last month</p>
    </CardContent>
  </Card>
  
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Growth</CardTitle>
      <TrendingUp className="size-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">+573</div>
      <p className="text-xs text-muted-foreground">+201 since last hour</p>
    </CardContent>
  </Card>
</div>
```

## Card with Actions

```tsx
import { Button } from "@/components/ui/button"

<Card>
  <CardHeader>
    <CardTitle>Account Settings</CardTitle>
    <CardDescription>Manage your account preferences.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Your account settings content here.</p>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Save Changes</Button>
  </CardFooter>
</Card>
```

## Card with Form

```tsx
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

<Card>
  <CardHeader>
    <CardTitle>Create Project</CardTitle>
    <CardDescription>Add a new project to your workspace.</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="space-y-2">
      <label className="text-sm font-medium">Project Name</label>
      <Input placeholder="Enter project name" />
    </div>
    <div className="space-y-2">
      <label className="text-sm font-medium">Description</label>
      <Input placeholder="Enter description" />
    </div>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Create Project</Button>
  </CardFooter>
</Card>
```

## Clickable Card

```tsx
<Card className="cursor-pointer transition-shadow hover:shadow-lg">
  <CardHeader>
    <CardTitle>Clickable Card</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Click anywhere on this card.</p>
  </CardContent>
</Card>
```

## Card with Image

```tsx
<Card className="overflow-hidden">
  <img 
    src="/placeholder.jpg" 
    alt="Card image" 
    className="h-48 w-full object-cover"
  />
  <CardHeader>
    <CardTitle>Image Card</CardTitle>
    <CardDescription>Card with an image header.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content below the image.</p>
  </CardContent>
</Card>
```

## Horizontal Card

```tsx
<Card className="flex flex-row">
  <img 
    src="/placeholder.jpg" 
    alt="Card image" 
    className="h-auto w-48 object-cover"
  />
  <div>
    <CardHeader>
      <CardTitle>Horizontal Card</CardTitle>
      <CardDescription>Image on the side.</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Content next to the image.</p>
    </CardContent>
  </div>
</Card>
```