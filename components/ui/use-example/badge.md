# Badge Component Usage Examples

## Basic Usage

```tsx
import { Badge } from "@/components/ui/badge"

<Badge>Default</Badge>
```

## Variants

```tsx
// Default variant
<Badge variant="default">Default</Badge>

// Secondary variant
<Badge variant="secondary">Secondary</Badge>

// Destructive variant
<Badge variant="destructive">Destructive</Badge>

// Outline variant
<Badge variant="outline">Outline</Badge>
```

## Status Badges

```tsx
// Active status
<Badge className="bg-green-500 hover:bg-green-600">Active</Badge>

// Pending status
<Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>

// Inactive status
<Badge variant="secondary">Inactive</Badge>

// Error status
<Badge variant="destructive">Error</Badge>
```

## With Icons

```tsx
import { Check, X, Clock, AlertCircle } from "lucide-react"

<Badge className="gap-1">
  <Check className="size-3" />
  Completed
</Badge>

<Badge variant="destructive" className="gap-1">
  <X className="size-3" />
  Failed
</Badge>

<Badge variant="secondary" className="gap-1">
  <Clock className="size-3" />
  Pending
</Badge>

<Badge variant="outline" className="gap-1">
  <AlertCircle className="size-3" />
  Warning
</Badge>
```

## Notification Badge

```tsx
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

<Button variant="ghost" size="icon" className="relative">
  <Bell className="size-4" />
  <Badge 
    variant="destructive" 
    className="absolute -top-1 -right-1 size-4 p-0 flex items-center justify-center text-[10px]"
  >
    3
  </Badge>
</Button>
```

## In Tables

```tsx
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

<Table>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>
        <Badge>Admin</Badge>
      </TableCell>
      <TableCell>
        <Badge className="bg-green-500">Active</Badge>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Jane Smith</TableCell>
      <TableCell>
        <Badge variant="secondary">User</Badge>
      </TableCell>
      <TableCell>
        <Badge variant="outline">Pending</Badge>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Tag Cloud

```tsx
<div className="flex flex-wrap gap-2">
  <Badge variant="outline">React</Badge>
  <Badge variant="outline">TypeScript</Badge>
  <Badge variant="outline">Next.js</Badge>
  <Badge variant="outline">Tailwind CSS</Badge>
  <Badge variant="outline">Node.js</Badge>
</div>
```

## Removable Badges

```tsx
import { X } from "lucide-react"

<Badge className="gap-1 pr-1">
  Tag Name
  <button 
    className="ml-1 rounded-full hover:bg-primary-foreground/20 p-0.5"
    onClick={() => console.log('Remove tag')}
  >
    <X className="size-3" />
  </button>
</Badge>
```