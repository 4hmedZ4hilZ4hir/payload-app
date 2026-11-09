'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { cn } from '@/utilities/ui'

export type RotatingItem = {
  key: string
  small: React.ReactNode
  big: React.ReactNode
}

// Reports whether the screen is wide (the desktop layout).
const useIsWide = () => {
  const [wide, setWide] = useState<boolean | null>(null)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setWide(mq.matches)
    update()
    mq.addEventListener('change', update)

    // Returns a cleanup that stops listening.
    return () => mq.removeEventListener('change', update)
  }, [])
  return wide
}

// Cards that rotate: one big card and a row of small ones swap places when an arrow is pressed.
export const RotatingCards: React.FC<{
  header: React.ReactNode
  items: RotatingItem[]
}> = ({ header, items }) => {
  const wide = useIsWide()
  const isWide = wide ?? true
  const [order, setOrder] = useState(() => items.map((_, i) => i))
  const count = items.length

  // Moves the big card to the end of the small row; the first small card becomes big.
  const rotateLeft = () => setOrder((o) => [...o.slice(1), o[0]!])
  // Moves the big card to the start of the small row; the last small card becomes big.
  const rotateRight = () => setOrder((o) => [o[o.length - 1]!, ...o.slice(0, -1)])

  // Works out where and how big one card should be.
  const place = (position: number): React.CSSProperties => {
    // Big card.
    if (position === 0) {
      return isWide
        ? { left: '66%', width: '34%', top: 0, height: '100%', opacity: 1, zIndex: 10 }
        : { left: 0, width: '84%', top: 0, height: '100%', opacity: 1, zIndex: 10 }
    }
    const slot = position - 1
    const visible = isWide ? slot < 2 : slot < 1
    // Small cards.
    if (isWide) {
      return {
        left: visible ? `${slot * 24.6}%` : '105%',
        width: '22.6%',
        bottom: 0,
        height: 'calc(var(--u) * 342)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        zIndex: 1,
      }
    }
    return {
      left: visible ? '88%' : '190%',
      width: '84%',
      top: 0,
      height: '100%',
      opacity: visible ? 1 : 0,
      pointerEvents: 'none',
      zIndex: 1,
    }
  }

  const btn =
    'flex size-10 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-neutral-700 lg:size-44'

  const arrows = (
    <div className="flex gap-2 lg:gap-10">
      <button type="button" aria-label="Previous" onClick={rotateLeft} className={btn}>
        <ArrowLeft className="size-5 lg:size-22" />
      </button>
      <button type="button" aria-label="Next" onClick={rotateRight} className={btn}>
        <ArrowRight className="size-5 lg:size-22" />
      </button>
    </div>
  )

  // Returns the heading, the arrows and the stage with all cards.
  return (
    <div className="relative">
      <div className="lg:absolute lg:left-0 lg:top-0 lg:z-20 lg:w-[62%]">{header}</div>

      {count > 1 && (
        <div className="absolute bottom-0 left-[50.5%] z-20 hidden lg:block">{arrows}</div>
      )}

      <div className="relative mt-10 h-[30rem] overflow-hidden sm:h-[34rem] lg:mt-0 lg:h-600">
        {items.map((item, i) => {
          const position = order.indexOf(i)
          const isBig = position === 0
          // Returns one card that moves between its big and small spot.
          return (
            <div
              key={item.key}
              style={place(position)}
              className={cn(
                'absolute overflow-hidden rounded-3xl lg:rounded-d36',
                wide !== null && 'transition-all duration-700 ease-in-out motion-reduce:transition-none',
              )}
            >
              <div
                className={cn(
                  'absolute inset-0 transition-opacity duration-500',
                  isBig ? 'opacity-100' : 'pointer-events-none opacity-0',
                )}
              >
                {item.big}
              </div>
              <div
                className={cn(
                  'absolute inset-0 transition-opacity duration-500',
                  isBig ? 'pointer-events-none opacity-0' : 'opacity-100',
                )}
              >
                {item.small}
              </div>
            </div>
          )
        })}
      </div>

      {count > 1 && <div className="mt-4 lg:hidden">{arrows}</div>}
    </div>
  )
}
