'use client'
import type { RefObject } from 'react'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'

type UseClickableCardType<T extends HTMLElement> = {
  card: {
    ref: RefObject<T | null>
  }
  link: {
    ref: RefObject<HTMLAnchorElement | null>
  }
}

interface Props {
  external?: boolean
  newTab?: boolean
  scroll?: boolean
}

// Makes a whole card clickable.
function useClickableCard<T extends HTMLElement>({
  external = false,
  newTab = false,
  scroll = true,
}: Props): UseClickableCardType<T> {
  const router = useRouter()
  const card = useRef<T>(null)
  const link = useRef<HTMLAnchorElement>(null)
  const timeDown = useRef<number>(0)
  const hasActiveParent = useRef<boolean>(false)
  const pressedButton = useRef<number>(0)

  // Handles mouse down.
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      // Checks if target is set.
      if (e.target) {
        const target = e.target as Element

        const timeNow = +new Date()
        const parent = target?.closest('a')

        pressedButton.current = e.button

        // Checks if parent is missing.
        if (!parent) {
          hasActiveParent.current = false
          timeDown.current = timeNow
        } else {
          hasActiveParent.current = true
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, card, link, timeDown],
  )

  // Handles mouse up.
  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      // Checks if href is set.
      if (link.current?.href) {
        const timeNow = +new Date()
        const difference = timeNow - timeDown.current

        // Checks if href is set and difference is at most 250.
        if (link.current?.href && difference <= 250) {
          // Checks if current is missing and current is 0 and ctrl key is missing.
          if (!hasActiveParent.current && pressedButton.current === 0 && !e.ctrlKey) {
            // Checks if external is set.
            if (external) {
              const target = newTab ? '_blank' : '_self'
              window.open(link.current.href, target)
            } else {
              router.push(link.current.href, { scroll })
            }
          }
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, card, link, timeDown],
  )

  useEffect(() => {
    const cardNode = card.current

    const abortController = new AbortController()

    // Checks if card node is set.
    if (cardNode) {
      cardNode.addEventListener('mousedown', handleMouseDown, {
        signal: abortController.signal,
      })
      cardNode.addEventListener('mouseup', handleMouseUp, {
        signal: abortController.signal,
      })
    }

    // Returns a cleanup that removes the listeners.
    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card, link, router])

  // Returns the refs for the card and its link.
  return {
    card: {
      ref: card,
    },
    link: {
      ref: link,
    },
  }
}

// Exports the clickable card hook.
export default useClickableCard
