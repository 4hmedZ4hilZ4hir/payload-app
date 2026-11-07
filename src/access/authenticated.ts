import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<User>) => boolean

// Allows only logged in users.
export const authenticated: isAuthenticated = ({ req: { user } }) => {
  // Returns whether a user is logged in.
  return Boolean(user)
}
