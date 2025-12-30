# Avatar Component Usage Examples

## Basic Usage

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// Simple avatar with image
<Avatar>
  <AvatarImage src="/user-profile.jpg" alt="User Name" />
  <AvatarFallback>UN</AvatarFallback>
</Avatar>
```

## With Fallback (No Image)

```tsx
<Avatar>
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

## Different Sizes (using className)

```tsx
// Small avatar
<Avatar className="size-6">
  <AvatarImage src="/avatar.jpg" />
  <AvatarFallback>SM</AvatarFallback>
</Avatar>

// Default size
<Avatar className="size-8">
  <AvatarImage src="/avatar.jpg" />
  <AvatarFallback>MD</AvatarFallback>
</Avatar>

// Large avatar
<Avatar className="size-12">
  <AvatarImage src="/avatar.jpg" />
  <AvatarFallback>LG</AvatarFallback>
</Avatar>

// Extra large
<Avatar className="size-16">
  <AvatarImage src="/avatar.jpg" />
  <AvatarFallback>XL</AvatarFallback>
</Avatar>
```

## Avatar Group

```tsx
<div className="flex -space-x-2">
  <Avatar className="border-2 border-background">
    <AvatarImage src="/user1.jpg" />
    <AvatarFallback>U1</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarImage src="/user2.jpg" />
    <AvatarFallback>U2</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarImage src="/user3.jpg" />
    <AvatarFallback>U3</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarFallback>+5</AvatarFallback>
  </Avatar>
</div>
```

## With User Info

```tsx
<div className="flex items-center gap-3">
  <Avatar>
    <AvatarImage src="/john-doe.jpg" />
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>
  <div>
    <p className="text-sm font-medium">John Doe</p>
    <p className="text-xs text-muted-foreground">john@example.com</p>
  </div>
</div>
```

## With Status Indicator

```tsx
<div className="relative">
  <Avatar>
    <AvatarImage src="/user.jpg" />
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>
  <span className="absolute bottom-0 right-0 size-3 rounded-full bg-green-500 border-2 border-background" />
</div>
```

## In a Card

```tsx
import { Card, CardContent } from "@/components/ui/card"

<Card>
  <CardContent className="flex items-center gap-4 p-4">
    <Avatar className="size-12">
      <AvatarImage src="/team-member.jpg" />
      <AvatarFallback>TM</AvatarFallback>
    </Avatar>
    <div>
      <h3 className="font-semibold">Team Member</h3>
      <p className="text-sm text-muted-foreground">Software Engineer</p>
    </div>
  </CardContent>
</Card>
```