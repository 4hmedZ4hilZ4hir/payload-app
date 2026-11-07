import type { Theme } from './types'

// Holds the key used to save the theme.
export const themeLocalStorageKey = 'payload-theme'

// Holds the theme used when none is chosen.
export const defaultTheme = 'light'

// Finds the theme the visitor device prefers.
export const getImplicitPreference = (): Theme | null => {
  const mediaQuery = '(prefers-color-scheme: dark)'
  const mql = window.matchMedia(mediaQuery)
  const hasImplicitPreference = typeof mql.matches === 'boolean'

  // Checks if it has implicit preference.
  if (hasImplicitPreference) {
    // Returns dark or light based on the device setting.
    return mql.matches ? 'dark' : 'light'
  }

  // Returns nothing when the device has no preference.
  return null
}
