import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

// Clears the header cache after a save.
export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  // Checks if revalidate is not turned off.
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating header`)

    revalidateTag('global_header', 'max')
  }

  // Returns the saved document.
  return doc
}
