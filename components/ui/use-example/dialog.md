# Dialog Component Usage Examples

## Basic Usage

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        This is a dialog description.
      </DialogDescription>
    </DialogHeader>
    <p>Dialog content goes here.</p>
  </DialogContent>
</Dialog>
```

## With Footer Actions

```tsx
import { DialogFooter } from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button>Edit Profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here.
      </DialogDescription>
    </DialogHeader>
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Name</label>
        <Input placeholder="Your name" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <Input type="email" placeholder="your@email.com" />
      </div>
    </div>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Controlled Dialog

```tsx
"use client"
import { useState } from "react"

function ControlledDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Open Controlled Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Controlled Dialog</DialogTitle>
          <DialogDescription>
            This dialog's open state is controlled by React state.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

## Form Dialog

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Create New Item</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Create Item</DialogTitle>
      <DialogDescription>
        Fill in the details to create a new item.
      </DialogDescription>
    </DialogHeader>
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="name" className="text-right text-sm font-medium">
            Name
          </label>
          <Input id="name" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="category" className="text-right text-sm font-medium">
            Category
          </label>
          <Input id="category" className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Create</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
```

## Large Dialog

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Large Dialog</Button>
  </DialogTrigger>
  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>Large Content Dialog</DialogTitle>
      <DialogDescription>
        This dialog can contain a lot of content with scrolling.
      </DialogDescription>
    </DialogHeader>
    <div className="space-y-4">
      {/* Large content here */}
      <p>Lots of content...</p>
    </div>
  </DialogContent>
</Dialog>
```

## Confirmation Dialog

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">Delete Account</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your
        account and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete Account</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Dialog with Custom Close

```tsx
import { DialogClose } from "@/components/ui/dialog"
import { X } from "lucide-react"

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Custom Close</DialogTitle>
    </DialogHeader>
    <p>Content here</p>
    <DialogClose asChild>
      <Button variant="outline" className="mt-4">
        Close Dialog
      </Button>
    </DialogClose>
  </DialogContent>
</Dialog>
```