'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/utilities/ui'

// Scrolling card row with previous and next buttons.
export const CardsCarousel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scroller = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  // Checks if the row can scroll left or right.
  const update = useCallback(() => {
    const el = scroller.current
    // Stops when the row is missing.
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    update()
    const el = scroller.current
    // Stops when the row is missing.
    if (!el) return
    const ro = new ResizeObserver(update)
    ro.observe(el)

    // Returns a cleanup that stops watching the size.
    return () => ro.disconnect()
  }, [update])

  // Scrolls the row by one card.
  const scrollByCard = (dir: 1 | -1) => {
    const el = scroller.current
    // Stops when the row is missing.
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const step = (card?.offsetWidth ?? 200) + gap
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  const btn =
    'flex size-10 items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed lg:size-44'

  // Returns the card row and the arrow buttons.
  return (
    <div className="flex items-end gap-4 lg:gap-30">
      <div
        ref={scroller}
        onScroll={update}
        className="flex min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [-ms-overflow-style:none] scrollbar-none lg:gap-27 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <div className="flex shrink-0 gap-2 pb-2 lg:gap-10 lg:pb-0">
        <button
          type="button"
          aria-label="Previous"
          disabled={!canPrev}
          onClick={() => scrollByCard(-1)}
          className={cn(btn, canPrev ? 'bg-ink text-white' : 'bg-neutral-200 text-neutral-400')}
        >
          <ArrowLeft className="size-5 lg:size-22" />
        </button>
        <button
          type="button"
          aria-label="Next"
          disabled={!canNext}
          onClick={() => scrollByCard(1)}
          className={cn(btn, canNext ? 'bg-ink text-white' : 'bg-neutral-200 text-neutral-400')}
        >
          <ArrowRight className="size-5 lg:size-22" />
        </button>
      </div>
    </div>
  )
}
