'use client'

import { cn } from '@/utilities/ui'
import * as LabelPrimitive from '@radix-ui/react-label'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

// Defines the style options for labels.
const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
)

// Renders a styled form label.
const Label: React.FC<
  { ref?: React.Ref<HTMLLabelElement> } & React.ComponentProps<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
> = ({ className, ref, ...props }) => (
  <LabelPrimitive.Root className={cn(labelVariants(), className)} ref={ref} {...props} />
)

// Exports the label.
export { Label }
