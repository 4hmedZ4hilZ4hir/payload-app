import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'

// Wraps the page in the theme providers.
export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  // Returns the providers around the children.
  return (
    <ThemeProvider>
      <HeaderThemeProvider>{children}</HeaderThemeProvider>
    </ThemeProvider>
  )
}
