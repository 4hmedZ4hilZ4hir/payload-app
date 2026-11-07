import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

// Defines the Feature Split block.
export const FeatureSplit: Block = {
  slug: 'featureSplit',
  interfaceName: 'FeatureSplitBlock',
  labels: {
    singular: 'Feature (image + text)',
    plural: 'Features (image + text)',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
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
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
        admin: {
          initCollapsed: true,
          description: 'First button: use "Default" (dark). Second: use "Outline" (white).',
        },
      },
    }),
  ],
}
