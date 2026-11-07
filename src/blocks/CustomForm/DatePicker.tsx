'use client'

import { CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/utilities/ui'

// Turns yyyy-mm-dd text into a Date without time zone shifts.
const parseDate = (value: string) => {
  const [year, month, day] = value.split('-').map(Number)

  // Checks if the text is not a full date.
  if (!year || !month || !day) {
    // Returns nothing for an incomplete date.
    return undefined
  }

  // Returns the date at local midnight.
  return new Date(year, month - 1, day)
}

// Turns a Date into yyyy-mm-dd text.
const toIso = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  // Returns the date text.
  return `${date.getFullYear()}-${month}-${day}`
}

// Shows a date picker made of a Radix popover and a calendar.
export const DatePicker: React.FC<{
  id: string
  value: string
  onChange: (value: string) => void
}> = ({ id, value, onChange }) => {
  const [open, setOpen] = React.useState(false)
  const selected = parseDate(value)

  // Returns the button that opens the calendar popover.
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          className={cn(
            'h-auto w-full justify-start rounded-xl border-neutral-300 bg-white px-4 py-3 text-left text-sm font-normal text-ink',
            !selected && 'text-neutral-400',
          )}
        >
          <CalendarIcon />
          {selected
            ? selected.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            : 'Pick a date'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          defaultMonth={selected}
          onSelect={(date) => {
            // Checks if a date was chosen.
            if (date) {
              onChange(toIso(date))
              setOpen(false)
            }
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
