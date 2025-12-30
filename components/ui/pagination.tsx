"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const getVisiblePages = () => {
    if (totalPages <= 7) return pages

    if (currentPage <= 3) {
      return [...pages.slice(0, 5), -1, totalPages]
    }

    if (currentPage >= totalPages - 2) {
      return [1, -1, ...pages.slice(totalPages - 5)]
    }

    return [1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages]
  }

  return (
    <div className="flex items-center justify-between px-2">
      <div className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" className="dark:hover:text-[var(--muted-foreground)]" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="hidden sm:flex items-center gap-1">
          {getVisiblePages().map((page, idx) =>
            page === -1 ? (
              <span key={`ellipsis-${idx}`} className="px-2">
                ...
              </span>
            ) : (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page)}
                className="w-9 dark:hover:text-[var(--muted-foreground)]"
              >
                {page}
              </Button>
            ),
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="dark:hover:text-[var(--muted-foreground)]"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
