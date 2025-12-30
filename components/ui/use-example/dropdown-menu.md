# Dropdown Menu Component Usage Examples

## Basic Usage

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## With Labels and Separators

```tsx
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">My Account</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## With Icons

```tsx
import { User, CreditCard, Settings, LogOut, Plus, Mail } from "lucide-react"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Account</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <User className="mr-2 size-4" />
      Profile
    </DropdownMenuItem>
    <DropdownMenuItem>
      <CreditCard className="mr-2 size-4" />
      Billing
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Settings className="mr-2 size-4" />
      Settings
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <LogOut className="mr-2 size-4" />
      Log out
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## With Keyboard Shortcuts

```tsx
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Edit</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuItem>
      Cut
      <DropdownMenuShortcut>⌘X</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      Copy
      <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      Paste
      <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## With Checkbox Items

```tsx
import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { useState } from "react"

function CheckboxDropdown() {
  const [showStatusBar, setShowStatusBar] = useState(true)
  const [showPanel, setShowPanel] = useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">View</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          Panel
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

## With Radio Items

```tsx
import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"

function RadioDropdown() {
  const [position, setPosition] = useState("bottom")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Position</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

## With Sub Menu

```tsx
import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuItem>New Tab</DropdownMenuItem>
    <DropdownMenuItem>New Window</DropdownMenuItem>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>More Tools</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem>Save Page As...</DropdownMenuItem>
          <DropdownMenuItem>Create Shortcut...</DropdownMenuItem>
          <DropdownMenuItem>Name Window...</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  </DropdownMenuContent>
</DropdownMenu>
```

## User Avatar Dropdown

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
      <Avatar className="size-8">
        <AvatarImage src="/avatar.jpg" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56" align="end">
    <DropdownMenuLabel className="font-normal">
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium">John Doe</p>
        <p className="text-xs text-muted-foreground">john@example.com</p>
      </div>
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Actions Menu (Table Row)

```tsx
import { MoreHorizontal, Edit, Copy, Trash } from "lucide-react"

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
    <DropdownMenuItem>
      <Copy className="mr-2 size-4" />
      Duplicate
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive">
      <Trash className="mr-2 size-4" />
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```