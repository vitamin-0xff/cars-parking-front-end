# Tooltip Component Usage Examples

## Basic Usage

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>This is a tooltip</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Different Positions

```tsx
// Top (default)
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Top</Button>
  </TooltipTrigger>
  <TooltipContent side="top">
    <p>Tooltip on top</p>
  </TooltipContent>
</Tooltip>

// Bottom
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Bottom</Button>
  </TooltipTrigger>
  <TooltipContent side="bottom">
    <p>Tooltip on bottom</p>
  </TooltipContent>
</Tooltip>

// Left
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Left</Button>
  </TooltipTrigger>
  <TooltipContent side="left">
    <p>Tooltip on left</p>
  </TooltipContent>
</Tooltip>

// Right
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Right</Button>
  </TooltipTrigger>
  <TooltipContent side="right">
    <p>Tooltip on right</p>
  </TooltipContent>
</Tooltip>
```

## With Icon Buttons

```tsx
import { Plus, Settings, Trash2, Edit, Download } from "lucide-react"

<TooltipProvider>
  <div className="flex gap-2">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" variant="outline">
          <Plus className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add new item</p>
      </TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" variant="outline">
          <Edit className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Edit item</p>
      // filepath: /home/essid/Projects/Programming/Personal-Projects/dashboard-template-generation-nextjs/components/ui/use-example/tooltip.txt

# Tooltip Component Usage Examples

## Basic Usage

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>This is a tooltip</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Different Positions

```tsx
// Top (default)
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Top</Button>
  </TooltipTrigger>
  <TooltipContent side="top">
    <p>Tooltip on top</p>
  </TooltipContent>
</Tooltip>

// Bottom
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Bottom</Button>
  </TooltipTrigger>
  <TooltipContent side="bottom">
    <p>Tooltip on bottom</p>
  </TooltipContent>
</Tooltip>

// Left
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Left</Button>
  </TooltipTrigger>
  <TooltipContent side="left">
    <p>Tooltip on left</p>
  </TooltipContent>
</Tooltip>

// Right
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Right</Button>
  </TooltipTrigger>
  <TooltipContent side="right">
    <p>Tooltip on right</p>
  </TooltipContent>
</Tooltip>
```

## With Icon Buttons

```tsx
import { Plus, Settings, Trash2, Edit, Download } from "lucide-react"

<TooltipProvider>
  <div className="flex gap-2">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" variant="outline">
          <Plus className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add new item</p>
      </TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" variant="outline">
          <Edit className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Edit item</p>
      