import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

// Refreshes cached pages after a form is saved.
export const revalidateCustomForm: CollectionAfterChangeHook = ({ doc, req: { payload, context } }) => {
  // Checks if revalidate is not turned off.
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating pages that use custom forms')
    revalidatePath('/', 'layout')
  }

  // Returns the saved form.
  return doc
}
