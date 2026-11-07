import type { CollectionBeforeChangeHook } from 'payload'

// Sets the publish date when a document is saved without one.
export const populatePublishedAt: CollectionBeforeChangeHook = ({ data, operation, req }) => {
  // Checks if operation is create or operation is update.
  if (operation === 'create' || operation === 'update') {
    // Checks if data is set and published at is missing.
    if (req.data && !req.data.publishedAt) {
      const now = new Date()
      // Returns the data with the publish date added.
      return {
        ...data,
        publishedAt: now,
      }
    }
  }

  // Returns the data as it is.
  return data
}
