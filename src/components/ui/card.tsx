import { cn } from '@/utilities/ui'
import * as React from 'react'

// Renders the card box.
const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  // Returns the card container.
  return (
    <div
      data-slot="card"
      className={cn('bg-card text-card-foreground rounded-lg border shadow-sm', className)}
      {...props}
    />
  )
}

// Renders the top part of a card.
const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  // Returns the card header container.
  return (
    <div
      data-slot="card-header"
      className={cn('flex flex-col gap-1.5 p-6', className)}
      {...props}
    />
  )
}

// Renders the title of a card.
const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => {
  // Returns the card title heading.
  return (
    <h3
      data-slot="card-title"
      className={cn('text-2xl leading-none font-semibold tracking-tight', className)}
      {...props}
    />
  )
}

// Renders the short description of a card.
const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => {
  // Returns the card description text.
  return (
    <p
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

// Renders the main content of a card.
const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  // Returns the card content container.
  return <div data-slot="card-content" className={cn('p-6 pt-0', className)} {...props} />
}

// Renders the bottom part of a card.
const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  // Returns the card footer container.
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
}

// Exports the card parts.
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
