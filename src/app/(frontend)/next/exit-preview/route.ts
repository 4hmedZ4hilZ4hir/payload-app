import { draftMode } from 'next/headers'

// Turns off draft mode.
export async function GET(): Promise<Response> {
  const draft = await draftMode()
  draft.disable()
  // Returns a message saying draft mode is disabled.
  return new Response('Draft mode is disabled')
}
