'use client'

import React, { useEffect, useRef, useState } from 'react'

// Splits text like "$24,872.90" into the whole part and the lighter decimal part.
const Decimals: React.FC<{ text: string; light?: boolean }> = ({ text, light }) => {
  const i = text.lastIndexOf('.')
  // Shows the text as it is when there is nothing to lighten.
  if (!light || i === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <span className="text-neutral-400">{text.slice(i)}</span>
    </>
  )
}

// Counts a number like "$24,872.90" or "120+" up from zero when it scrolls into view.
export const CountUp: React.FC<{ value: string; lightDecimals?: boolean }> = ({
  value,
  lightDecimals,
}) => {
  const match = value.match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/)
  const ref = useRef<HTMLSpanElement>(null)
  const [text, setText] = useState(value)

  useEffect(() => {
    const el = ref.current
    // Keeps the text as it is when it has no number.
    if (!el || !match) return
    // Skips the animation when the visitor prefers less motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const [, prefix, num, suffix] = match
    const target = parseFloat(num!.replace(/,/g, ''))
    const decimals = num!.split('.')[1]?.length ?? 0
    const grouped = num!.includes(',')
    // Formats one step of the count.
    const format = (n: number) =>
      `${prefix}${n.toLocaleString('en-US', {
        useGrouping: grouped,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`
    setText(format(0))
    let raf = 0
    const io = new IntersectionObserver(([entry]) => {
      // Waits until the number is visible.
      if (!entry?.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      // Draws one frame of the count.
      const tick = (now: number) => {
        const t = Math.min((now - start) / 1400, 1)
        const eased = 1 - Math.pow(1 - t, 3)
        setText(format(target * eased))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(el)

    // Returns a cleanup that stops the animation.
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  // Returns the animated number.
  return (
    <span ref={ref}>
      <Decimals text={text} light={lightDecimals} />
    </span>
  )
}
