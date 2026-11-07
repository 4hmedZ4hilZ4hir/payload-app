import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

// Defines the News block.
export const NewsBlock: Block = {
  slug: 'newsBlock',
  interfaceName: 'NewsBlock',
  labels: {
    singular: 'News (featured + related)',
    plural: 'News blocks',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      defaultValue: 'Politics',
      label: 'Section title (above the big article)',
    },
    {
      name: 'featured',
      type: 'group',
      label: 'Featured article (left, big)',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'category', type: 'text', label: 'Category tag' },
        {
          type: 'row',
          fields: [
            { name: 'views', type: 'text', label: 'Views', admin: { width: '33%' } },
            { name: 'comments', type: 'text', label: 'Comments', admin: { width: '33%' } },
            { name: 'shares', type: 'text', label: 'Shares', admin: { width: '33%' } },
          ],
        },
        { name: 'title', type: 'text', required: true },
        {
          name: 'authors',
          type: 'array',
          label: 'Authors',
          admin: { initCollapsed: true },
          fields: [{ name: 'name', type: 'text', required: true }],
        },
        {
          name: 'dateLine',
          type: 'text',
          label: 'Date line',
        },
        {
          type: 'row',
          fields: [
            { name: 'saveLabel', type: 'text', defaultValue: 'Save to pocket', admin: { width: '50%' } },
            { name: 'shareLabel', type: 'text', defaultValue: 'Share on media', admin: { width: '50%' } },
          ],
        },
        {
          name: 'body',
          type: 'richText',
          label: 'Article text',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
      ],
    },
    {
      name: 'relatedTitle',
      type: 'text',
      defaultValue: 'Related News',
      label: 'Right column title',
    },
    {
      name: 'enableLink',
      type: 'checkbox',
      label: 'Show the "See all" link',
    },
    link({
      appearances: false,
      overrides: {
        admin: {
          condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
        },
      },
    }),
    {
      name: 'related',
      type: 'array',
      label: 'Related news (right column)',
      admin: { initCollapsed: true },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'category', type: 'text' },
        { name: 'views', type: 'text', label: 'Views' },
        { name: 'title', type: 'text', required: true },
        {
          name: 'enableLink',
          type: 'checkbox',
          label: 'Make this card a link',
        },
        link({
          appearances: false,
          disableLabel: true,
          overrides: {
            admin: {
              condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
            },
          },
        }),
      ],
    },
  ],
}
