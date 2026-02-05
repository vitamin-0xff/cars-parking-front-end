'use client';
import { cn } from '@/lib/utils';

type KeyValueSkeletonProps = {
  gridClassName?: string; // e.g. "grid-cols-3 gap-2" or "grid-cols-1 gap-4"
  orientation?: 'row' | 'column';
  rows?: number; // number of key-value pairs to simulate
  className?: string;
};

export function KeyValueSkeleton({
  gridClassName = 'grid-cols-3 gap-2',
  orientation = 'column',
  rows = 6,
  className,
}: KeyValueSkeletonProps) {
  return (
    <div className={cn('grid', gridClassName, className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'p-3',
            orientation === 'row' ? 'flex items-center gap-3' : 'flex flex-col gap-2'
          )}
        >
          <div className="h-3 w-24 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}