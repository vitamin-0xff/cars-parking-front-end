# Separator Component

A visual divider that separates content sections horizontally or vertically.

## Import

```tsx
import { Separator } from "@/components/ui/separator"
```

## Basic Usage

### Horizontal Separator (Default)

```tsx
import { Separator } from "@/components/ui/separator"

export function HorizontalSeparatorExample() {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  )
}
```

### Vertical Separator

```tsx
import { Separator } from "@/components/ui/separator"

export function VerticalSeparatorExample() {
  return (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <div>Home</div>
      <Separator orientation="vertical" />
      <div>About</div>
      <Separator orientation="vertical" />
      <div>Contact</div>
    </div>
  )
}
```

## In Navigation

```tsx
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Home, Settings, User, LogOut } from "lucide-react"

export function NavigationSeparatorExample() {
  return (
    <nav className="flex flex-col space-y-1 p-2">
      <Button variant="ghost" className="justify-start">
        <Home className="mr-2 h-4 w-4" />
        Home
      </Button>
      <Button variant="ghost" className="justify-start">
        <User className="mr-2 h-4 w-4" />
        Profile
      </Button>
      <Separator className="my-2" />
      <Button variant="ghost" className="justify-start">
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </Button>
      <Separator className="my-2" />
      <Button variant="ghost" className="justify-start text-destructive">
        <LogOut className="mr-2 h-4 w-4" />
        Log out
      </Button>
    </nav>
  )
}
```

## In Dropdown Menu

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function DropdownSeparatorExample() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

## With Text

```tsx
import { Separator } from "@/components/ui/separator"

export function SeparatorWithTextExample() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <Separator className="w-full" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
  )
}
```

## In Forms

```tsx
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function FormSeparatorExample() {
  return (
    <div className="space-y-4 w-[350px]">
      <div className="space-y-2">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button className="w-full">Sign In</Button>
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline">Google</Button>
        <Button variant="outline">GitHub</Button>
      </div>
    </div>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Direction of the separator |
| `decorative` | `boolean` | `true` | Whether the separator is decorative |
| `className` | `string` | - | Additional CSS classes |

## Notes

- Horizontal separators are `h-[1px] w-full`
- Vertical separators are `h-full w-[1px]`
- Use `decorative={false}` for semantically meaningful separators
- Combine with spacing utilities (`my-4`, `mx-4`) for proper spacing