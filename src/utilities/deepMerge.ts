// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item: unknown): item is object {
  // Returns whether the item is a plain object.
  return typeof item === 'object' && !Array.isArray(item)
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export default function deepMerge<T, R>(target: T, source: R): T {
  const output = { ...target }
  // Checks if target is object and source is object.
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      // Checks if source is object.
      if (isObject(source[key])) {
        // Checks if not (key is in target).
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] })
        } else {
          output[key] = deepMerge(target[key], source[key])
        }
      } else {
        Object.assign(output, { [key]: source[key] })
      }
    })
  }

  // Returns the merged object.
  return output
}
