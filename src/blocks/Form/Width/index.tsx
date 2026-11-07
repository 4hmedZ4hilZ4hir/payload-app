import * as React from 'react'

// Limits the width of a field.
export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  // Returns the width wrapper.
  return (
    <div className={className} style={{ maxWidth: width ? `${width}%` : undefined }}>
      {children}
    </div>
  )
}
