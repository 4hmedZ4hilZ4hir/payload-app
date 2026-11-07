// Lists the themes that can be used.
export type Theme = 'dark' | 'light'

// Describes what the theme context holds.
export interface ThemeContextType {
  setTheme: (theme: Theme | null) => void
  theme?: Theme | null
}

// Checks that a text is a valid theme.
export function themeIsValid(string: null | string): string is Theme {
  // Returns whether the text is dark or light.
  return string ? ['dark', 'light'].includes(string) : false
}
