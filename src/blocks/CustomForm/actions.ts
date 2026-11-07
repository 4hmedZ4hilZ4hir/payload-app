'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

// Describes the answer sent back after a submit.
export type SubmitResult = { ok: boolean; message: string }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[0-9+()\-\s.]{5,20}$/
const datePattern = /^\d{4}-\d{2}-\d{2}$/

// Checks a submission against its form and saves it.
export async function submitCustomForm(
  formId: string,
  values: Record<string, string | boolean>,
): Promise<SubmitResult> {
  const payload = await getPayload({ config: configPromise })

  let form
  try {
    form = await payload.findByID({ collection: 'custom-forms', id: formId, depth: 0, overrideAccess: true })
  } catch {
    // Returns an error when the form does not exist.
    return { ok: false, message: 'This form is no longer available.' }
  }

  const answers: { label: string; value: string }[] = []

  for (const [index, input] of (form.inputs ?? []).entries()) {
    const key = input.id ?? String(index)
    const raw = values?.[key]

    // Checks if input type is checkbox.
    if (input.inputType === 'checkbox') {
      // Checks if required is set and raw is not true.
      if (input.required && raw !== true) {
        // Returns an error for an unticked required checkbox.
        return { ok: false, message: `${input.label} is required.` }
      }
      answers.push({ label: input.label, value: raw === true ? 'Yes' : 'No' })
      continue
    }

    const text = String(raw ?? '').trim().slice(0, 5000)

    // Checks if text is missing.
    if (!text) {
      // Checks if required is set.
      if (input.required) {
        // Returns an error for an empty required input.
        return { ok: false, message: `${input.label} is required.` }
      }
      answers.push({ label: input.label, value: '' })
      continue
    }

    const choices = (input.options ?? []).map((option) => option.label)
    const invalid =
      (input.inputType === 'email' && !emailPattern.test(text)) ||
      (input.inputType === 'phone' && !phonePattern.test(text)) ||
      (input.inputType === 'number' && Number.isNaN(Number(text))) ||
      (input.inputType === 'date' && !datePattern.test(text)) ||
      ((input.inputType === 'select' || input.inputType === 'radio') && !choices.includes(text))

    // Checks if invalid is set.
    if (invalid) {
      // Returns an error for a value with the wrong format.
      return { ok: false, message: `${input.label} is not valid.` }
    }

    answers.push({ label: input.label, value: text })
  }

  await payload.create({
    collection: 'custom-submissions',
    data: { form: form.id, formTitle: form.title, answers },
    overrideAccess: true,
  })

  // Returns the success message of the form.
  return { ok: true, message: form.successMessage || 'Thank you! Your submission was received.' }
}
