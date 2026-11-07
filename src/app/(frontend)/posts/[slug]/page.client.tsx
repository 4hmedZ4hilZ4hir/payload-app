'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

// Keeps the header theme dark while the page is shown.
const PageClient: React.FC = () => {
  /* Force the header to be dark mode while we have an image behind it */
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])
  // Returns an empty fragment.
  return <React.Fragment />
}

// Exports the page client component.
export default PageClient
