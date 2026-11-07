import type { Block } from 'payload'

import { link } from '@/fields/link'

// Defines the FAQ list block.
export const FaqList: Block = {
  slug: 'faqList',
  interfaceName: 'FaqListBlock',
  labels: {
    singular: 'Q&A list',
    plural: 'Q&A lists',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: 'FAQ',
      label: 'Small label (pill)',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'enableLink',
      type: 'checkbox',
      label: 'Show a button next to the heading',
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
      name: 'items',
      type: 'array',
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'enableLink',
          type: 'checkbox',
          label: 'Show an arrow button that links somewhere',
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
