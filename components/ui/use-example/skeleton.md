# Skeleton Component

A placeholder loading component that mimics the shape of content while data is being loaded.

## Import

```tsx
import { Skeleton } from "@/components/ui/skeleton"
```

## Basic Usage

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonExample() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
```

## Card Skeleton

```tsx
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function CardSkeleton() {
  return (
    <Card className="w-[350px]">
      <CardHeader className="gap-2">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-4/5" />
      </CardHeader>
      <CardContent className="h-10" />
    </Card>
  )
}
```

## Stats Card Skeleton

```tsx
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function StatsCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-[120px] mb-1" />
        <Skeleton className="h-3 w-[80px]" />
      </CardContent>
    </Card>
  )
}
```

## Table Skeleton

```tsx
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function TableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead><Skeleton className="h-4 w-[80px]" /></TableHead>
          <TableHead><Skeleton className="h-4 w-[120px]" /></TableHead>
          <TableHead><Skeleton className="h-4 w-[80px]" /></TableHead>
          <TableHead><Skeleton className="h-4 w-[60px]" /></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[60px]" /></TableCell>
          </TableRow>
        ))}
      // filepath: /home/essid/Projects/Programming/Personal-Projects/dashboard-template-generation-nextjs/components/ui/use-example/skeleton.md
# Skeleton Component

A placeholder loading component that mimics the shape of content while data is being loaded.

## Import

```tsx
import { Skeleton } from "@/components/ui/skeleton"
```

## Basic Usage

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonExample() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
```

## Card Skeleton

```tsx
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function CardSkeleton() {
  return (
    <Card className="w-[350px]">
      <CardHeader className="gap-2">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-4/5" />
      </CardHeader>
      <CardContent className="h-10" />
    </Card>
  )
}
```

## Stats Card Skeleton

```tsx
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function StatsCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-[120px] mb-1" />
        <Skeleton className="h-3 w-[80px]" />
      </CardContent>
    </Card>
  )
}
```

## Table Skeleton

```tsx
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function TableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead><Skeleton className="h-4 w-[80px]" /></TableHead>
          <TableHead><Skeleton className="h-4 w-[120px]" /></TableHead>
          <TableHead><Skeleton className="h-4 w-[80px]" /></TableHead>
          <TableHead><Skeleton className="h-4 w-[60px]" /></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[60px]" /></TableCell>
          </TableRow>
        ))}
      