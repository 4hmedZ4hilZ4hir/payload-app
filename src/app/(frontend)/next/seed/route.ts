import { createLocalReq, getPayload } from 'payload'
import { seed } from '@/endpoints/seed'
import config from '@payload-config'
import { headers } from 'next/headers'

// Sets how long the seed route may run.
export const maxDuration = 60 // This function can run for a maximum of 60 seconds

// Fills the database with sample data for logged in users.
export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  // Authenticate by passing request headers
  const { user } = await payload.auth({ headers: requestHeaders })

  // Checks if user is missing.
  if (!user) {
    // Returns an error when there is no logged in user.
    return new Response('Action forbidden.', { status: 403 })
  }

  try {
    // Create a Payload request object to pass to the Local API for transactions
    // At this point you should pass in a user, locale, and any other context you need for the Local API
    const payloadReq = await createLocalReq({ user }, payload)

    await seed({ payload, req: payloadReq })

    // Returns a success message after seeding.
    return Response.json({ success: true })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error seeding data' })
    // Returns an error when seeding fails.
    return new Response('Error seeding data.', { status: 500 })
  }
}
