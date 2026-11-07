import { Post } from '@/payload-types'

/**
 * Formats an array of populatedAuthors from Posts into a prettified string.
 * @param authors - The populatedAuthors array from a Post.
 * @returns A prettified string of authors.
 * @example
 *
 * [Author1, Author2] becomes 'Author1 and Author2'
 * [Author1, Author2, Author3] becomes 'Author1, Author2, and Author3'
 *
 */
export const formatAuthors = (
  authors: NonNullable<NonNullable<Post['populatedAuthors']>[number]>[],
) => {
  // Ensure we don't have any authors without a name
  const authorNames = authors.map((author) => author.name).filter(Boolean)

  // Returns an empty text when there are no authors.
  if (authorNames.length === 0) return ''
  // Returns the name when there is one author.
  if (authorNames.length === 1) return authorNames[0]
  // Returns the two names joined with "and".
  if (authorNames.length === 2) return `${authorNames[0]} and ${authorNames[1]}`

  // Returns the names as a list ending with "and".
  return `${authorNames.slice(0, -1).join(', ')} and ${authorNames[authorNames.length - 1]}`
}
