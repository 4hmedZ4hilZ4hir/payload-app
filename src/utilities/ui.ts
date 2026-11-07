/**
 * Utility functions for UI components automatically added by ShadCN and used in a few of our frontend components and blocks.
 *
 * Other functions may be exported from here in the future or by installing other shadcn components.
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Joins class names and merges the Tailwind ones.
export function cn(...inputs: ClassValue[]) {
  // Returns the merged class names.
  return twMerge(clsx(inputs))
}
