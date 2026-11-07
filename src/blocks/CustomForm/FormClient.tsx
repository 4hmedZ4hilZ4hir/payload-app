'use client'

import React, { useState } from 'react'

import type { CustomForm } from '@/payload-types'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/utilities/ui'
import { submitCustomForm } from './actions'
import { DatePicker } from './DatePicker'

type Input = CustomForm['inputs'][number]
type Values = Record<string, string | boolean>

const fieldClass =
  'w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-neutral-400 focus:border-ink'

const htmlTypes: Record<string, string> = {
  text: 'text',
  email: 'email',
  phone: 'tel',
  number: 'number',
}

// Draws one input of the form based on its type.
const Field: React.FC<{
  input: Input
  id: string
  value: string | boolean
  onChange: (value: string | boolean) => void
}> = ({ input, id, value, onChange }) => {
  const required = Boolean(input.required)

  // Checks if input type is textarea.
  if (input.inputType === 'textarea') {
    // Returns a multi line text box.
    return (
      <textarea
        id={id}
        rows={5}
        required={required}
        placeholder={input.placeholder ?? ''}
        value={String(value)}
        onChange={(e) => onChange(e.target.value)}
        className={fieldClass}
      />
    )
  }

  // Checks if input type is select.
  if (input.inputType === 'select') {
    // Returns a shadcn dropdown built on Radix Select.
    return (
      <Select value={String(value)} onValueChange={(next) => onChange(next)}>
        <SelectTrigger
          id={id}
          className="h-auto w-full rounded-xl border-neutral-300 bg-white px-4 py-3 text-sm text-ink"
        >
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {(input.options ?? []).map((option, i) => (
            <SelectItem key={option.id ?? i} value={option.label}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }

  // Checks if input type is date.
  if (input.inputType === 'date') {
    // Returns the Radix date picker.
    return <DatePicker id={id} value={String(value)} onChange={onChange} />
  }

  // Checks if input type is radio.
  if (input.inputType === 'radio') {
    // Returns a group of radio buttons.
    return (
      <div className="flex flex-col gap-2">
        {(input.options ?? []).map((option, i) => (
          <label key={option.id ?? i} className="flex items-center gap-3 text-sm text-ink">
            <input
              type="radio"
              name={id}
              required={required}
              checked={value === option.label}
              onChange={() => onChange(option.label)}
              className="size-4 accent-ink"
            />
            {option.label}
          </label>
        ))}
      </div>
    )
  }

  // Checks if input type is checkbox.
  if (input.inputType === 'checkbox') {
    // Returns a single checkbox.
    return (
      <input
        id={id}
        type="checkbox"
        required={required}
        checked={value === true}
        onChange={(e) => onChange(e.target.checked)}
        className="size-5 accent-ink"
      />
    )
  }

  // Returns a standard one line input.
  return (
    <input
      id={id}
      type={htmlTypes[input.inputType] ?? 'text'}
      required={required}
      placeholder={input.placeholder ?? ''}
      value={String(value)}
      onChange={(e) => onChange(e.target.value)}
      className={fieldClass}
    />
  )
}

// Shows a custom form and sends it to the server.
export const FormClient: React.FC<{ form: CustomForm }> = ({ form }) => {
  const [values, setValues] = useState<Values>({})
  const [pending, setPending] = useState(false)
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null)

  // Gets the key of an input.
  const keyOf = (input: Input, index: number) => input.id ?? String(index)

  // Sends the form values and shows the result.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Finds the first required input that is still empty, because dropdowns and dates have no native check.
    const missing = form.inputs.find((input, index) => {
      const current = values[keyOf(input, index)]
      // Returns true when the required input has no value.
      return input.required && (input.inputType === 'checkbox' ? current !== true : !String(current ?? '').trim())
    })

    // Checks if a required input is empty.
    if (missing) {
      setStatus({ ok: false, message: `${missing.label} is required.` })
      return
    }

    setPending(true)
    setStatus(null)

    try {
      const result = await submitCustomForm(form.id, values)
      setStatus(result)
      // Checks if ok is set.
      if (result.ok) setValues({})
    } catch {
      setStatus({ ok: false, message: 'Something went wrong. Please try again.' })
    } finally {
      setPending(false)
    }
  }

  // Returns the form markup with all inputs and the submit button.
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {form.inputs.map((input, index) => {
        const key = keyOf(input, index)
        const inline = input.inputType === 'checkbox'

        // Returns one labelled input.
        return (
          <div key={key} className={cn('flex gap-2', inline ? 'flex-row-reverse items-center justify-end' : 'flex-col')}>
            <label htmlFor={key} className="text-sm font-medium text-ink">
              {input.label}
              {input.required && <span className="ml-1 text-red-600">*</span>}
            </label>
            <Field
              input={input}
              id={key}
              value={values[key] ?? (inline ? false : '')}
              onChange={(value) => setValues((prev) => ({ ...prev, [key]: value }))}
            />
          </div>
        )
      })}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex h-12 w-fit items-center rounded-full bg-[#47493e] px-8 text-sm font-medium text-white transition-colors hover:bg-ink disabled:opacity-60"
      >
        {pending ? 'Sending...' : form.submitLabel || 'Submit'}
      </button>

      {status && (
        <p role="status" className={cn('text-sm', status.ok ? 'text-green-700' : 'text-red-600')}>
          {status.message}
        </p>
      )}
    </form>
  )
}
