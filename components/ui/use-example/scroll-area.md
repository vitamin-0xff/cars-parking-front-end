# ScrollArea Component

A custom scrollable area with styled scrollbars that work consistently across browsers.

## Import

```tsx
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
```

## Basic Usage

### Vertical Scroll

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"

export function VerticalScrollExample() {
  return (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      <div className="space-y-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="text-sm">
            Item {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
```

### Horizontal Scroll

```tsx
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export function HorizontalScrollExample() {
  const images = [
    { id: 1, title: "Photo 1" },
    { id: 2, title: "Photo 2" },
    { id: 3, title: "Photo 3" },
    { id: 4, title: "Photo 4" },
    { id: 5, title: "Photo 5" },
  ]

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {images.map((image) => (
          <figure key={image.id} className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <img
                src={`/placeholder.svg?height=150&width=150`}
                alt={image.title}
                className="aspect-square h-[150px] w-[150px] object-cover"
              />
            </div>
            <figcaption className="pt-2 text-xs text-muted-foreground">
              {image.title}
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
```

## With List Items

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const tags = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Shadcn/ui",
  "Radix UI", "Recharts", "i18next", "Prisma", "PostgreSQL",
]

export function TagListExample() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Technologies</h4>
        {tags.map((tag, index) => (
          <div key={tag}>
            <div className="text-sm">{tag}</div>
            {index < tags.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
```

## In a Card

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CardScrollExample() {
  const notifications = [
    { id: 1, title: "New message", time: "2 min ago" },
    { id: 2, title: "Order shipped", time: "1 hour ago" },
    { id: 3, title: "Payment received", time: "2 hours ago" },
    { id: 4, title: "New follower", time: "3 hours ago" },
    { id: 5, title: "Comment on post", time: "5 hours ago" },
    { id: 6, title: "Mention in story", time: "1 day ago" },
  ]

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between"
              >
                <span className="text-sm">{notification.title}</span>
                <span className="text-xs text-muted-foreground">
                  {notification.time}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
```

## In Sidebar

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"

const menuItems = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  label: `Menu Item ${i + 1}`,
}))

export function SidebarScrollExample() {
  return (
    <aside className="w-64 border-r h-screen">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Navigation</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-60px)]">
        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-accent text-sm"
            >
              {item.label}
            </button>
          ))}
        </div>
      </ScrollArea>
    </aside>
  )
}
```

## Props

### ScrollArea

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Additional CSS classes |
| `children` | `ReactNode` | Content to be scrollable |

### ScrollBar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Scroll direction |

## Notes

- Set a fixed height/width on the ScrollArea for scrolling to work
- Use `ScrollBar` component explicitly for horizontal scrolling
- Works with both mouse and touch scrolling
- Scrollbars are styled to match your theme