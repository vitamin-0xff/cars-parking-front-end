"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSearch: (query: string) => void
  placeholder?: string
}

export function SearchDialog({ open, onOpenChange, onSearch, placeholder = "Search..." }: SearchDialogProps) {
  const [query, setQuery] = useState("")

  const handleSearch = (value: string) => {
    setQuery(value)
    onSearch(value)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] -translate-y-[20vh]">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute top-1/2 -translate-y-1/2 left-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={placeholder}
            className="pl-10 h-12"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            autoFocus
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
