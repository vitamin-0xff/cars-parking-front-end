# Pagination Component

A pagination component for navigating through pages of content with i18n support.

## Import

```tsx
import { Pagination } from "@/components/ui/pagination"
```

## Basic Usage

```tsx
"use client"

import { useState } from "react"
import { Pagination } from "@/components/ui/pagination"

export function PaginationExample() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 10

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  )
}
```

## With Data Table

```tsx
"use client"

import { useState, useMemo } from "react"
import { Pagination } from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const allUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  // ... more users
]

const ITEMS_PER_PAGE = 10

export function PaginatedTableExample() {
  const [currentPage, setCurrentPage] = useState(1)
  
  const totalPages = Math.ceil(allUsers.length / ITEMS_PER_PAGE)
  
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return allUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [currentPage])

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
```

## With API Data

```tsx
"use client"

import { useState, useEffect } from "react"
import { Pagination } from "@/components/ui/pagination"

interface ApiResponse {
  data: any[]
  totalPages: number
}

export function ApiPaginationExample() {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const response = await fetch(`/api/items?page=${currentPage}`)
        const result: ApiResponse = await response.json()
        setData(result.data)
        setTotalPages(result.totalPages)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Optionally scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="space-y-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {/* Render your data */}
          {data.map((item) => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
      )}
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `currentPage` | `number` | The current active page (1-indexed) |
| `totalPages` | `number` | Total number of pages |
| `onPageChange` | `(page: number) => void` | Callback when page changes |

## Features

- **Responsive**: Hides page numbers on mobile, shows on larger screens
- **Ellipsis**: Automatically shows ellipsis for large page counts
- **i18n Support**: Uses translations for "Previous", "Next", and page info
- **Disabled States**: Previous/Next buttons disabled at boundaries

## Internationalization

The component uses `react-i18next` for translations. Make sure your locale files include:

```json
{
  "common": {
    "previous": "Previous",
    "next": "Next",
    "page": "Page {{current}} of {{total}}"
  }
}
```