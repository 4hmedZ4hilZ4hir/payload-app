'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

import { cn } from '@/utilities/ui'

// Row of big cards where only the active one is big: the others shrink, and the next one grows into place.
export const TestimonialsCarousel: React.FC<{ items: React.ReactNode[] }> = ({ items }) => {
  const scroller = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const last = items.length - 1

  // Scrolls the active card to the left edge of the row.
  useEffect(() => {
    const el = scroller.current
    const card = el?.children[active] as HTMLElement | undefined
    // Stops when the card is missing.
    if (!el || !card) return
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: 'smooth' })
  }, [active])

  const btn =
    'flex size-10 items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed lg:size-44'

  // Returns the card row and the arrows.
  return (
    <div className="flex h-full flex-col gap-4 lg:gap-20">
      <div
        ref={scroller}
        className="flex min-h-0 flex-1 items-stretch gap-4 overflow-x-hidden scroll-smooth lg:gap-24"
      >
        {items.map((item, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              'shrink-0 cursor-pointer transition-all duration-500 ease-out',
              i === active
                ? 'w-[88%] opacity-100 lg:w-552'
                : 'w-[55%] scale-95 opacity-60 hover:opacity-90 lg:w-300',
            )}
          >
            <div className="h-full overflow-hidden rounded-3xl lg:rounded-d36">{item}</div>
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <div className="flex gap-2 lg:gap-10">
          <button
            type="button"
            aria-label="Previous"
            disabled={active === 0}
            onClick={() => setActive((a) => Math.max(0, a - 1))}
            className={cn(btn, active === 0 ? 'bg-neutral-200 text-neutral-400' : 'bg-ink text-white')}
          >
            <ArrowLeft className="size-5 lg:size-22" />
          </button>
          <button
            type="button"
            aria-label="Next"
            disabled={active === last}
            onClick={() => setActive((a) => Math.min(last, a + 1))}
            className={cn(btn, active === last ? 'bg-neutral-200 text-neutral-400' : 'bg-ink text-white')}
          >
            <ArrowRight className="size-5 lg:size-22" />
          </button>
        </div>
      )}
    </div>
  )
}
