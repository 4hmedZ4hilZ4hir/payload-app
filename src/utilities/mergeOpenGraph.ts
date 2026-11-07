import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'An open-source website built with Payload and Next.js.',
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  siteName: 'Payload Website Template',
  title: 'Payload Website Template',
}

// Combines the given sharing details with the defaults.
export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  // Returns the combined sharing details.
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
