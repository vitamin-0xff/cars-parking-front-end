# Input Component Usage Examples

## Basic Usage

```tsx
import { Input } from "@/components/ui/input"

<Input type="text" placeholder="Enter text..." />
```

## Input Types

```tsx
// Text input
<Input type="text" placeholder="Text input" />

// Email input
<Input type="email" placeholder="Email address" />

// Password input
<Input type="password" placeholder="Password" />

// Number input
<Input type="number" placeholder="0" />

// Search input
<Input type="search" placeholder="Search..." />

// URL input
<Input type="url" placeholder="https://example.com" />

// Tel input
<Input type="tel" placeholder="Phone number" />

// Date input
<Input type="date" />

// Time input
<Input type="time" />

// File input
<Input type="file" />
```

## With Labels

```tsx
<div className="space-y-2">
  <label htmlFor="email" className="text-sm font-medium">
    Email
  </label>
  <Input id="email" type="email" placeholder="Enter your email" />
</div>
```

## With Helper Text

```tsx
<div className="space-y-2">
  <label htmlFor="username" className="text-sm font-medium">
    Username
  </label>
  <Input id="username" placeholder="Enter username" />
  <p className="text-sm text-muted-foreground">
    This is how others will see you.
  </p>
</div>
```

## With Error State

```tsx
<div className="space-y-2">
  <label htmlFor="email" className="text-sm font-medium">
    Email
  </label>
  <Input 
    id="email" 
    type="email" 
    placeholder="Enter email" 
    className="border-destructive focus-visible:ring-destructive"
  />
  <p className="text-sm text-destructive">
    Please enter a valid email address.
  </p>
</div>
```

## Disabled Input

```tsx
<Input disabled placeholder="Disabled input" />
```

## With Icon (Left)

```tsx
import { Search, Mail, Lock } from "lucide-react"

<div className="relative">
  <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
  <Input type="search" placeholder="Search..." className="pl-8" />
</div>

<div className="relative">
  <Mail className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
  <Input type="email" placeholder="Email" className="pl-8" />
</div>

<div className="relative">
  <Lock className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
  <Input type="password" placeholder="Password" className="pl-8" />
</div>
```

## With Icon (Right)

```tsx
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false)
  
  return (
    <div className="relative">
      <Input 
        type={showPassword ? "text" : "password"} 
        placeholder="Password" 
        className="pr-10"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
      >
        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  )
}
```

## With Button

```tsx
<div className="flex gap-2">
  <Input type="email" placeholder="Enter your email" />
  <Button>Subscribe</Button>
</div>
```

## Input Group

```tsx
<div className="flex">
  <span className="inline-flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">
    https://
  </span>
  <Input className="rounded-l-none" placeholder="example.com" />
</div>

<div className="flex">
  <span className="inline-flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">
    @
  </span>
  <Input className="rounded-l-none" placeholder="username" />
</div>
```

## Controlled Input

```tsx
import { useState } from "react"

function ControlledInput() {
  const [value, setValue] = useState("")
  
  return (
    <div className="space-y-2">
      <Input 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
      />
      <p className="text-sm text-muted-foreground">
        You typed: {value}
      </p>
    </div>
  )
}
```

## Form Example

```tsx
<form className="space-y-4">
  <div className="space-y-2">
    <label htmlFor="name" className="text-sm font-medium">
      Full Name
    </label>
    <Input id="name" placeholder="John Doe" required />
  </div>
  
  <div className="space-y-2">
    <label htmlFor="email" className="text-sm font-medium">
      Email
    </label>
    <Input id="email" type="email" placeholder="john@example.com" required />
  </div>
  
  <div className="space-y-2">
    <label htmlFor="password" className="text-sm font-medium">
      Password
    </label>
    <Input id="password" type="password" placeholder="••••••••" required />
  </div>
  
  <Button type="submit" className="w-full">
    Sign Up
  </Button>
</form>
```

## With Max Length

```tsx
import { useState } from "react"

function InputWithCounter() {
  const [value, setValue] = useState("")
  const maxLength = 100
  
  return (
    <div className="space-y-2">
      <Input 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={maxLength}
        placeholder="Enter description..."
      />
      <p className="text-xs text-muted-foreground text-right">
        {value.length}/{maxLength}
      </p>
    </div>
  )
}
```