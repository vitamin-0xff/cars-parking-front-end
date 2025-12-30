# Sheet Component

A slide-out panel that can appear from any edge of the screen, useful for mobile navigation, settings panels, or additional content.

## Import

```tsx
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
```

## Basic Usage

```tsx
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SheetExample() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          {/* Your content here */}
        </div>
      </SheetContent>
    </Sheet>
  )
}
```

## Different Sides

### Right Side (Default)

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Open Right</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Right Panel</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

### Left Side

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Open Left</Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Left Panel</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

### Top Side

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Open Top</Button>
  </SheetTrigger>
  <SheetContent side="top">
    <SheetHeader>
      <SheetTitle>Top Panel</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

### Bottom Side

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Open Bottom</Button>
  </SheetTrigger>
  <SheetContent side="bottom">
    <SheetHeader>
      <SheetTitle>Bottom Panel</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

## Mobile Navigation

```tsx
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Analytics", href: "/analytics" },
  { label: "Users", href: "/users" },
  { label: "Settings", href: "/settings" },
]

export function MobileNavSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-2 mt-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-4 py-2 rounded-md hover:bg-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
```

## Settings Panel

```tsx
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SettingsSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Configure your application settings here.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Display Name</Label>
            <Input id="name" defaultValue="John Doe" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john@example.com" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
```

## Shopping Cart

```tsx
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const cartItems = [
  { id: 1, name: "Product 1", price: 29.99, quantity: 2 },
  { id: 2, name: "Product 2", price: 49.99, quantity: 1 },
  { id: 3, name: "Product 3", price: 19.99, quantity: 3 },
]

export function CartSheet() {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
            {cartItems.length}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-200px)] my-4">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="h-16 w-16 rounded bg-muted" />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <Separator />
        <div className="py-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <SheetFooter>
          <Button className="w-full">Checkout</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
```

## Props

### SheetContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"right"` | Side from which the sheet appears |
| `className` | `string` | - | Additional CSS classes |

## Components

| Component | Description |
|-----------|-------------|
| `Sheet` | Root component that manages state |
| `SheetTrigger` | Button that opens the sheet |
| `SheetContent` | The slide-out panel content |
| `SheetHeader` | Container for title and description |
| `SheetTitle` | Title of the sheet |
| `SheetDescription` | Description text |
| `SheetFooter` | Footer area for actions |
| `SheetClose` | Button to close the sheet |

## Notes

- Use `side` prop to control where the sheet appears
- Sheet automatically handles focus management
- Press Escape or click outside to close
- Combine with `ScrollArea` for scrollable content