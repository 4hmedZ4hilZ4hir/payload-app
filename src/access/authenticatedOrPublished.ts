import type { Access } from 'payload'

// Allows logged in users, and everyone else only for published documents.
export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  // Checks if user is set.
  if (user) {
    // Returns full access for logged in users.
    return true
  }

  // Returns a filter that keeps only published documents.
  return {
    _status: {
      equals: 'published',
    },
  }
}
