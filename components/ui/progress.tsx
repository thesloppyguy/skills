"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const getProgressColor = (progress: number | null | undefined) => {
    const percentage = progress ?? 0;
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 51) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getBackgroundColor = (progress: number | null | undefined) => {
    const percentage = progress ?? 0;
    if (percentage >= 80) return "bg-green-500/20";
    if (percentage >= 51) return "bg-yellow-500/20";
    return "bg-red-500/20";
  };

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full",
        getBackgroundColor(value),
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "h-full w-full flex-1 transition-all",
          getProgressColor(value)
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
