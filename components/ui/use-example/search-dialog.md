# SearchDialog Component

A command palette style search dialog for quick navigation and search functionality.

## Import

```tsx
import { SearchDialog } from "@/components/ui/search-dialog"
```

## Basic Usage

```tsx
"use client"

import { SearchDialog } from "@/components/ui/search-dialog"

export function SearchExample() {
  return <SearchDialog />
}
```

## Keyboard Shortcut

The SearchDialog can be triggered with `Ctrl+K` (or `Cmd+K` on Mac):

```tsx
"use client"

import { useEffect, useState } from "react"
import { SearchDialog } from "@/components/ui/search-dialog"

export function SearchWithShortcut() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return <SearchDialog open={open} onOpenChange={setOpen} />
}
```

## With Search Button in TopNav

```tsx
"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchDialog } from "@/components/ui/search-dialog"

export function TopNavSearch() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
```

## Custom Search Results

```tsx
"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

const searchItems = [
  { id: 1, title: "Dashboard", category: "Pages", href: "/dashboard" },
  { id: 2, title: "Analytics", category: "Pages", href: "/analytics" },
  { id: 3, title: "Users", category: "Pages", href: "/users" },
  { id: 4, title: "Create User", category: "Actions", action: "createUser" },
  { id: 5, title: "Export Data", category: "Actions", action: "exportData" },
]

export function CustomSearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  const filteredItems = searchItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  )

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, typeof searchItems>)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 max-w-lg">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder="Type to search..."
            className="border-0 focus-visible:ring-0"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <ScrollArea className="max-h-[300px]">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="p-2">
              <p className="px-2 text-xs font-medium text-muted-foreground">
                {category}
              </p>
              {items.map((item) => (
                <button
                  key={item.id}
                  className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent"
                  onClick={() => {
                    // Handle navigation or action
                    setOpen(false)
                  }}
                >
                  {item.title}
                </button>
              ))}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `open` | `boolean` | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | Callback when open state changes |

## Features

- Keyboard accessible
- Fuzzy search support
- Grouping by category
- Quick actions support
- Responsive design