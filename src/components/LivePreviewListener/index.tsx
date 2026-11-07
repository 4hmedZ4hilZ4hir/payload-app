'use client'
import { getClientSideURL } from '@/utilities/getURL'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import React from 'react'

// Refreshes the page when the content is saved in live preview.
export const LivePreviewListener: React.FC = () => {
  const router = useRouter()
  // Returns the live preview listener.
  return <PayloadLivePreview refresh={router.refresh} serverURL={getClientSideURL()} />
}
