'use client'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'
import { DayPicker } from 'react-day-picker'

// Draws the arrow icons of the month buttons.
const Chevron: React.FC<{ orientation?: 'left' | 'right' | 'up' | 'down' }> = ({ orientation }) => {
  // Checks if the arrow points left.
  if (orientation === 'left') {
    // Returns the left arrow.
    return <ChevronLeft className="size-4" />
  }

  // Returns the right arrow.
  return <ChevronRight className="size-4" />
}

// Renders a month calendar built on react-day-picker.
const Calendar: React.FC<React.ComponentProps<typeof DayPicker>> = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) => {
  // Returns the calendar with shadcn styles.
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'relative flex flex-col gap-4 sm:flex-row',
        month: 'flex flex-col gap-4',
        month_caption: 'flex h-9 items-center justify-center',
        caption_label: 'text-sm font-medium',
        nav: 'absolute inset-x-0 top-0 flex items-center justify-between',
        button_previous: cn(
          buttonVariants({ variant: 'outline' }),
          'size-9 bg-transparent p-0 opacity-70 hover:opacity-100',
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline' }),
          'size-9 bg-transparent p-0 opacity-70 hover:opacity-100',
        ),
        month_grid: 'w-full border-collapse',
        weekdays: 'flex',
        weekday: 'text-muted-foreground w-9 text-[0.8rem] font-normal',
        week: 'mt-2 flex w-full',
        day: 'relative size-9 p-0 text-center text-sm',
        day_button: cn(buttonVariants({ variant: 'ghost' }), 'size-9 p-0 font-normal'),
        selected:
          '[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary',
        today: '[&>button]:bg-accent [&>button]:text-accent-foreground',
        outside: 'text-muted-foreground opacity-50',
        disabled: 'text-muted-foreground opacity-50',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{ Chevron }}
      {...props}
    />
  )
}

// Exports the calendar.
export { Calendar }
