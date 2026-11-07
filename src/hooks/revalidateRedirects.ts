import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

// Refreshes the cached redirects after a change.
export const revalidateRedirects: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating redirects`)

  revalidateTag('redirects', 'max')

  // Returns the saved document.
  return doc
}
