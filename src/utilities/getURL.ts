import canUseDOM from './canUseDOM'

// Gets the site address on the server.
export const getServerSideURL = () => {
  // Returns the server site address.
  return (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000')
  )
}

// Gets the site address in the browser.
export const getClientSideURL = () => {
  // Checks if it can use dom.
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    // Returns the address of the current page.
    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  // Checks if vercel project production url is set.
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    // Returns the Vercel production address.
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  // Returns the configured server address.
  return process.env.NEXT_PUBLIC_SERVER_URL || ''
}
