'use client'

import * as React from 'react'
import { useFormContext } from 'react-hook-form'

// Shows an error message for a field.
export const Error = ({ name }: { name: string }) => {
  const {
    formState: { errors },
  } = useFormContext()
  // Returns the error message.
  return (
    <div className="mt-2 text-red-500 text-sm">
      {(errors[name]?.message as string) || 'This field is required'}
    </div>
  )
}
