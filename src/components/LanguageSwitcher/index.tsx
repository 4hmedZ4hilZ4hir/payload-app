'use client'

import { Check, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'

export const languages = [
  { code: 'en', label: 'English', short: 'eng' },
  { code: 'es', label: 'Español', short: 'esp' },
  { code: 'fr', label: 'Français', short: 'fra' },
  { code: 'it', label: 'Italiano', short: 'ita' },
] as const

// Dropdown that saves the chosen language in a cookie and reloads the page data.
export const LanguageSwitcher: React.FC<{ current: string }> = ({ current }) => {
  const router = useRouter()
  const ref = useRef<HTMLDetailsElement>(null)
  const active = languages.find((l) => l.code === current) ?? languages[0]

  // Saves the language and refreshes the page.
  const choose = (code: string) => {
    document.cookie = `lang=${code}; path=/; max-age=31536000; samesite=lax`
    document.documentElement.lang = code
    // Closes the dropdown.
    if (ref.current) ref.current.open = false
    router.refresh()
  }

  // Returns the dropdown.
  return (
    <details ref={ref} className="relative hidden sm:block">
      <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-neutral-200 px-4 py-2.5 text-sm text-ink [&::-webkit-details-marker]:hidden">
        {active.short}
        <ChevronDown className="size-4" />
      </summary>
      <ul className="absolute right-0 top-12 z-30 min-w-40 rounded-2xl border border-neutral-200 bg-white p-2 shadow-lg">
        {languages.map((l) => (
          <li key={l.code}>
            <button
              type="button"
              onClick={() => choose(l.code)}
              className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm text-ink hover:bg-neutral-100"
            >
              {l.label}
              {l.code === active.code && <Check className="size-4" />}
            </button>
          </li>
        ))}
      </ul>
    </details>
  )
}
