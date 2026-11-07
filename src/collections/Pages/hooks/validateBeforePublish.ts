import type { CollectionBeforeChangeHook } from 'payload'
import { ValidationError } from 'payload'

// Checks a page before it is published.
export const validateBeforePublish: CollectionBeforeChangeHook = ({ data, originalDoc, req }) => {
  // Returns the data for drafts.
  if (data?._status !== 'published') return data

  const hero = { ...(originalDoc?.hero || {}), ...(data.hero || {}) }

  const errors: { message: string; path: string }[] = []

  // Checks if type is hero or type is altHero.
  if (hero.type === 'hero' || hero.type === 'altHero') {
    // Checks if title is empty.
    if (!hero.title?.trim()) {
      errors.push({ path: 'hero.title', message: 'A hero title is required before publishing.' })
    }
    // Checks if image is missing.
    if (!hero.image) {
      errors.push({ path: 'hero.image', message: 'A hero image is required before publishing.' })
    }
  }

  // Checks if errors has items.
  if (errors.length > 0) {
    throw new ValidationError({ errors, collection: 'pages', req })
  }

  // Returns the checked data.
  return data
}
