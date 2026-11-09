'use client'

import { Bookmark, Share2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { cn } from '@/utilities/ui'

const words: Record<string, { unsave: string; copied: string }> = {
  en: { unsave: 'Unsave', copied: 'Link copied' },
  es: { unsave: 'Quitar', copied: 'Enlace copiado' },
  fr: { unsave: 'Retirer', copied: 'Lien copié' },
  it: { unsave: 'Rimuovi', copied: 'Link copiato' },
}

type Props = {
  title: string
  saveLabel?: string | null
  shareLabel?: string | null
}

// Save and share buttons for the featured article.
export const ArticleActions: React.FC<Props> = ({ title, saveLabel, shareLabel }) => {
  const storageKey = `saved-article:${title}`
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [lang, setLang] = useState('en')
  const t = words[lang] ?? words.en!

  useEffect(() => {
    setLang(document.documentElement.lang || 'en')
    try {
      setSaved(localStorage.getItem(storageKey) === '1')
    } catch {
    }
  }, [storageKey])

  // Saves or unsaves the article.
  const toggleSave = () => {
    const next = !saved
    setSaved(next)
    try {
      // Checks if next is set.
      if (next) localStorage.setItem(storageKey, '1')
      else localStorage.removeItem(storageKey)
    } catch {
    }
  }

  // Shares the page or copies its link.
  const share = async () => {
    const url = window.location.href
    try {
      // Checks if share is set.
      if (navigator.share) {
        await navigator.share({ title, url })
      } else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      }
    } catch {
    }
  }

  // Returns the two buttons.
  return (
    <div className="flex w-full flex-col gap-3 md:w-52 lg:mt-30 lg:w-185 lg:gap-26">
      {saveLabel && (
        <button
          type="button"
          onClick={toggleSave}
          aria-pressed={saved}
          aria-label={saved ? 'Unsave this article' : 'Save this article'}
          className={cn(
            'flex items-center justify-center gap-3 rounded-full border border-ink px-5 py-3 text-sm text-ink transition-colors hover:bg-ink hover:text-white lg:h-44 lg:gap-12 lg:py-0 lg:text-d15',
            saved && 'bg-ink text-white',
          )}
        >
          <Bookmark className={cn('size-4 lg:size-17', saved && 'fill-current')} />
          {saved ? t.unsave : saveLabel}
        </button>
      )}
      {shareLabel && (
        <button
          type="button"
          onClick={share}
          className="flex items-center justify-center gap-3 rounded-full bg-blue-50 px-5 py-3 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100 lg:h-43 lg:gap-12 lg:py-0 lg:text-d15"
        >
          <Share2 className="size-4 lg:size-17" />
          {copied ? t.copied : shareLabel}
        </button>
      )}
    </div>
  )
}
