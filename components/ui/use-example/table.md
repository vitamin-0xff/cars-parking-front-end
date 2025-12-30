# Table Component Usage Examples

## Basic Usage

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">INV002</TableCell>
      <TableCell>Pending</TableCell>
      <TableCell>PayPal</TableCell>
      <TableCell className="text-right">$150.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## With Data Mapping

```tsx
const invoices = [
  { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { id: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
]

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {invoices.map((invoice) => (
      <TableRow key={invoice.id}>
        <TableCell className="font-medium">{invoice.id}</TableCell>
        <TableCell>{invoice.status}</TableCell>
        <TableCell>{invoice.method}</TableCell>
        <TableCell className="text-right">{invoice.amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## With Status Badges

```tsx
import { Badge } from "@/components/ui/badge"

const users = [
  { name: "John Doe", email: "john@example.com", status: "active", role: "Admin" },
  { name: "Jane Smith", email: "jane@example.com", status: "inactive", role: "User" },
  { name: "Bob Wilson", email: "bob@example.com", status: "pending", role: "Editor" },
]

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {users.map((user) => (
      <TableRow key={user.email}>
        <TableCell className="font-medium">{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          <Badge 
            variant={
              user.status === "active" ? "default" : 
              user.status === "pending" ? "secondary" : "outline"
            }
          >
            {user.status}
          </Badge>
        </TableCell>
        <TableCell>{user.role}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## With Avatar

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>User</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarImage src="/avatar1.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="font-medium">John Doe</span>
        </div>
      </TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## With Actions

```tsx
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {users.map((user) => (
      <TableRow key={user.email}>
        <TableCell className="font-medium">{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.status}</TableCell>
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 size-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash className="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## Selectable Rows

```tsx
import { useState } from "react"

function SelectableTable() {
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const toggleRow = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(r => r !== id)
        : [...prev, id]
    )
  }

  const toggleAll = () => {
    setSelectedRows(prev => 
      prev.length === users.length ? [] : users.map(u => u.id)
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <input 
              type="checkbox" 
              checked={selectedRows.length === users.length}
              onChange={toggleAll}
            />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow 
            key={user.id}
            className={selectedRows.includes(user.id) ? "bg-muted" : ""}
          >
            <TableCell>
              <input 
                type="checkbox" 
                checked={selectedRows.includes(user.id)}
                onChange={() => toggleRow(user.id)}
              />
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

## Empty State

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell colSpan={3} className="h-24 text-center">
        No results found.
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## In a Card

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>User Management</CardTitle>
    <CardDescription>Manage and view all users in your system.</CardDescription>
  </CardHeader>
  <CardContent>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.email}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </CardContent>
</Card>
```