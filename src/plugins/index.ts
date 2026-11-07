import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

// Builds the page title for search engines.
const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  // Returns the title with the site name.
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

// Builds the page address for search engines.
const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  // Returns the full address of the page.
  return doc?.slug ? `${url}/${doc.slug}` : url
}

// Lists the plugins used by the site.
export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        // Returns the fields with a note on the from field.
        return defaultFields.map((field) => {
          // Checks if name is in field and name is from.
          if ('name' in field && field.name === 'from') {
            // Returns the from field with its note added.
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          // Returns the field as it is.
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        // Returns the fields with a richer confirmation message editor.
        return defaultFields.map((field) => {
          // Checks if name is in field and name is confirmationMessage.
          if ('name' in field && field.name === 'confirmationMessage') {
            // Returns the confirmation field with a custom editor.
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  // Returns the editor features with headings and a toolbar.
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          // Returns the field as it is.
          return field
        })
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        // Returns the default fields plus the search fields.
        return [...defaultFields, ...searchFields]
      },
    },
  }),
]
