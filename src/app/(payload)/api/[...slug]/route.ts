/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes'

// Handles GET requests for the API.
export const GET = REST_GET(config)
// Handles POST requests for the API.
export const POST = REST_POST(config)
// Handles DELETE requests for the API.
export const DELETE = REST_DELETE(config)
// Handles PATCH requests for the API.
export const PATCH = REST_PATCH(config)

// Handles PUT requests for the API.
export const PUT = REST_PUT(config)
// Handles OPTIONS requests for the API.
export const OPTIONS = REST_OPTIONS(config)
