import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import type { CustomFormBlock as CustomFormBlockProps } from '@/payload-types'

import { FormClient } from './FormClient'

// Renders a custom form chosen in the page editor.
export const CustomFormBlock = async ({ form, heading, description }: CustomFormBlockProps) => {
  let doc = typeof form === 'object' ? form : null

  // Checks if doc is missing and form is a string.
  if (!doc && typeof form === 'string') {
    const payload = await getPayload({ config: configPromise })
    doc = await payload.findByID({ collection: 'custom-forms', id: form, depth: 0 }).catch(() => null)
  }

  // Checks if doc is missing.
  if (!doc) {
    // Returns nothing when the form is missing.
    return null
  }

  // Returns the section with the heading and the form.
  return (
    <section className="bg-[#f6f2e9]">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 md:py-24">
        {heading && (
          <h2 className="text-3xl font-light leading-tight tracking-tight text-ink sm:text-4xl">{heading}</h2>
        )}
        {description && <p className="mt-4 text-sm leading-relaxed text-neutral-500">{description}</p>}
        <div className={heading || description ? 'mt-8' : ''}>
          <FormClient form={doc} />
        </div>
      </div>
    </section>
  )
}
