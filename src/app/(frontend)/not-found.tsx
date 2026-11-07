import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

// Renders the page not found message.
export default function NotFound() {
  // Returns the 404 message with a link home.
  return (
    <div className="container py-28">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p className="mb-4">This page could not be found.</p>
      </div>
      <Button asChild variant="default">
        <Link href="/">Go home</Link>
      </Button>
    </div>
  )
}
