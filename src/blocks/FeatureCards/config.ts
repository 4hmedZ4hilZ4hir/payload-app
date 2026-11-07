import type { Block } from 'payload'

import { link } from '@/fields/link'

// Shows a field only for the given card types.
const is = (...types: string[]) => {
  // Returns the condition function.
  return (_: unknown, siblingData: Record<string, any> = {}) => types.includes(siblingData?.cardType)
}

// Defines the Feature Cards block.
export const FeatureCards: Block = {
  slug: 'featureCards',
  interfaceName: 'FeatureCardsBlock',
  labels: {
    singular: 'Feature cards (3 cards)',
    plural: 'Feature cards (3 cards)',
  },
  fields: [
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      admin: {
        initCollapsed: true,
        description: 'Design uses 3 cards: Dark text card, Image card, Stat + chart card.',
      },
      fields: [
        {
          name: 'cardType',
          type: 'select',
          required: true,
          defaultValue: 'highlight',
          options: [
            { label: 'Dark text card', value: 'highlight' },
            { label: 'Image card', value: 'image' },
            { label: 'Stat + chart card', value: 'stat' },
          ],
        },

        {
          name: 'badge',
          type: 'text',
          label: 'Badge text (shown in the circle)',
          admin: { condition: is('highlight') },
        },
        {
          name: 'footnote',
          type: 'textarea',
          label: 'Small footnote',
          admin: { condition: is('highlight') },
        },

        {
          name: 'text',
          type: 'textarea',
          label: 'Main text',
          admin: { condition: is('highlight', 'image') },
        },

        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: { condition: is('image') },
        },
        {
          name: 'tag',
          type: 'text',
          label: 'Tag (small pill)',
          admin: { condition: is('image') },
        },
        {
          name: 'enableLink',
          type: 'checkbox',
          label: 'Make the arrow button a link',
          admin: { condition: is('image') },
        },
        link({
          appearances: false,
          disableLabel: true,
          overrides: {
            admin: {
              condition: (_data, siblingData) =>
                siblingData?.cardType === 'image' && Boolean(siblingData?.enableLink),
            },
          },
        }),

        {
          name: 'value',
          type: 'text',
          label: 'Big value',
          admin: { condition: is('stat') },
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Caption under the value',
          admin: { condition: is('stat') },
        },
        {
          name: 'bars',
          type: 'array',
          label: 'Chart bars',
          maxRows: 12,
          admin: { initCollapsed: true, condition: is('stat') },
          fields: [
            { name: 'label', type: 'text', required: true, label: 'Label' },
            {
              name: 'value',
              type: 'number',
              required: true,
              min: 0,
              max: 100,
              label: 'Height (0-100)',
            },
            {
              name: 'highlight',
              type: 'checkbox',
              label: 'Highlight this label (bold)',
            },
          ],
        },
      ],
    },
  ],
}
