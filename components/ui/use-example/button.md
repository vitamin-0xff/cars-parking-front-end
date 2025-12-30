# Button Component Usage Examples

## Basic Usage

```tsx
import { Button } from "@/components/ui/button"

<Button>Click me</Button>
```

## Variants

```tsx
// Default
<Button variant="default">Default</Button>

// Destructive
<Button variant="destructive">Delete</Button>

// Outline
<Button variant="outline">Outline</Button>

// Secondary
<Button variant="secondary">Secondary</Button>

// Ghost
<Button variant="ghost">Ghost</Button>

// Link
<Button variant="link">Link</Button>
```

## Sizes

```tsx
// Small
<Button size="sm">Small</Button>

// Default
<Button size="default">Default</Button>

// Large
<Button size="lg">Large</Button>

// Icon only
<Button size="icon">
  <Plus className="size-4" />
</Button>
```

## With Icons

```tsx
import { Plus, Download, Send, Trash2, Settings } from "lucide-react"

// Icon on the left
<Button>
  <Plus className="mr-2 size-4" />
  Add Item
</Button>

// Icon on the right
<Button>
  Download
  <Download className="ml-2 size-4" />
</Button>

// Icon only button
<Button size="icon" variant="outline">
  <Settings className="size-4" />
</Button>

// Destructive with icon
<Button variant="destructive">
  <Trash2 className="mr-2 size-4" />
  Delete
</Button>
```

## Loading State

```tsx
import { Loader2 } from "lucide-react"

<Button disabled>
  <Loader2 className="mr-2 size-4 animate-spin" />
  Please wait
</Button>
```

## Disabled State

```tsx
<Button disabled>Disabled</Button>
<Button variant="outline" disabled>Disabled Outline</Button>
```

## As Child (with Link)

```tsx
import Link from "next/link"

<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

## Button Group

```tsx
<div className="flex gap-2">
  <Button variant="outline">Cancel</Button>
  <Button>Save</Button>
</div>

// Or with joined buttons
<div className="inline-flex rounded-md shadow-sm">
  <Button variant="outline" className="rounded-r-none">Left</Button>
  <Button variant="outline" className="rounded-none border-x-0">Middle</Button>
  <Button variant="outline" className="rounded-l-none">Right</Button>
</div>
```

## Full Width

```tsx
<Button className="w-full">Full Width Button</Button>
```

## With Tooltip

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button size="icon" variant="outline">
        <Settings className="size-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Settings</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Form Submit Button

```tsx
<form onSubmit={handleSubmit}>
  <Button type="submit">
    Submit Form
  </Button>
</form>
```

## With Event Handler

```tsx
<Button 
  onClick={() => {
    console.log("Button clicked!")
    toast.success("Action completed!")
  }}
>
  Click Handler
</Button>
```