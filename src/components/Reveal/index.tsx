'use client'

import React, { useEffect, useRef, useState } from 'react'

import { cn } from '@/utilities/ui'

// Fades and lifts its children into view when they scroll on screen.
export const Reveal: React.FC<{
  children: React.ReactNode
  className?: string
  delay?: number
}> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    // Stops when the element is missing.
    if (!el) return
    // Shows everything at once when the visitor prefers less motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        // Shows the element once and stops watching.
        if (entry?.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)

    // Returns a cleanup that stops watching.
    return () => io.disconnect()
  }, [])

  // Returns the animated wrapper.
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-all duration-700 ease-out motion-reduce:transition-none',
        shown ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        className,
      )}
    >
      {children}
    </div>
  )
}
