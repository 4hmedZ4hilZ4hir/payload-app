import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks, fullBleedBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

// Lists the slugs of all pages to build ahead of time.
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      // Returns true for every page except the home page.
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      // Returns the slug of the page.
      return { slug }
    })

  // Returns the list of page slugs.
  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

// Renders a page from the CMS.
export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  // Checks if page is missing.
  if (!page) {
    // Returns a redirect when the page does not exist.
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  // Pages built from full-width sections skip the default top/bottom padding
  const isFullBleed =
    hero?.type === 'hero' ||
    hero?.type === 'altHero' ||
    Boolean(layout?.some((block) => fullBleedBlocks.has(block.blockType)))

  // Returns the page with its hero and blocks.
  return (
    <article className={isFullBleed ? '' : 'pt-16 pb-24'}>
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

// Builds the page metadata for search engines.
export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
  })

  // Returns the metadata of the page.
  return generateMeta({ doc: page })
}

// Finds a page by its slug.
const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  // Returns the first matching page or nothing.
  return result.docs?.[0] || null
})
