'use client'

import { cn } from '@/utilities/ui'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import * as React from 'react'

// Renders the popover root, which holds the open state.
const Popover: React.FC<React.ComponentProps<typeof PopoverPrimitive.Root>> = (props) => {
  // Returns the popover root.
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

// Renders the element that opens the popover.
const PopoverTrigger: React.FC<React.ComponentProps<typeof PopoverPrimitive.Trigger>> = (props) => {
  // Returns the popover trigger.
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

// Renders the floating panel of the popover.
const PopoverContent: React.FC<React.ComponentProps<typeof PopoverPrimitive.Content>> = ({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}) => {
  // Returns the panel inside a portal, so it is drawn above the page.
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-50 w-72 rounded-md border p-4 shadow-md outline-hidden',
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

// Exports the popover parts.
export { Popover, PopoverContent, PopoverTrigger }
