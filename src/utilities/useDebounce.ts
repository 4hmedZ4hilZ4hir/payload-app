import { useState, useEffect } from 'react'

// Delays a changing value until it stops changing.
export function useDebounce<T>(value: T, delay = 200): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Returns a cleanup that cancels the timer.
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  // Returns the delayed value.
  return debouncedValue
}
