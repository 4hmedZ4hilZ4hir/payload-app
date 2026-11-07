import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

// Clears the footer cache after a save.
export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  // Checks if revalidate is not turned off.
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`)

    revalidateTag('global_footer', 'max')
  }

  // Returns the saved document.
  return doc
}
