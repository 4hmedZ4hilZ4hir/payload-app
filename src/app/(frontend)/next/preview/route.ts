import type { PayloadRequest } from 'payload'
import { getPayload } from 'payload'
import { getSafeRedirect } from 'payload/shared'

import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import configPromise from '@payload-config'

// Describes the search params of a preview link.
export type PreviewSearchParams = {
  path: string
  previewSecret: string
}

// Turns on draft mode for logged in users and opens the page.
export async function GET(req: NextRequest): Promise<Response> {
  const payload = await getPayload({ config: configPromise })

  const { searchParams } = new URL(req.url)

  const path = searchParams.get('path')
  const previewSecret = searchParams.get('previewSecret')

  // Checks if preview secret is not preview secret.
  if (previewSecret !== process.env.PREVIEW_SECRET) {
    // Returns an error when the preview secret is wrong.
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  // Checks if path is missing.
  if (!path) {
    // Returns an error when there is no path.
    return new Response('Insufficient search params', { status: 404 })
  }

  const safePath = getSafeRedirect({ fallbackTo: '', redirectTo: path })

  // Checks if safe path is missing.
  if (!safePath) {
    // Returns an error when the path is not a relative one.
    return new Response('This endpoint can only be used for relative previews', { status: 500 })
  }

  let user

  try {
    const authResult = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    })
    user = authResult.user
  } catch (error) {
    payload.logger.error({ err: error }, 'Error verifying token for live preview')
    // Returns an error when the login check fails.
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  const draft = await draftMode()

  // Checks if user is missing.
  if (!user) {
    draft.disable()
    // Returns an error when there is no logged in user.
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  // You can add additional checks here to see if the user is allowed to preview this page

  draft.enable()

  redirect(safePath)
}
