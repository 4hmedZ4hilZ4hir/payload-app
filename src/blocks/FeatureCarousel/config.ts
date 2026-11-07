import type { Block } from 'payload'

import { link } from '@/fields/link'

// Defines the Feature Carousel block.
export const FeatureCarousel: Block = {
  slug: 'featureCarousel',
  interfaceName: 'FeatureCarouselBlock',
  labels: {
    singular: 'Alt feature (cards + testimonials)',
    plural: 'Alt features (cards + testimonials)',
  },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'cards',
      type: 'array',
      label: 'Small cards (left, with arrows)',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'style',
          type: 'select',
          defaultValue: 'light',
          required: true,
          options: [
            { label: 'Light card (with avatars)', value: 'light' },
            { label: 'Image card', value: 'image' },
          ],
        },
        { name: 'tag', type: 'text', label: 'Tag (small outlined pill)' },
        { name: 'title', type: 'text', required: true },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Background photo of the image card.',
            condition: (_, siblingData) => siblingData?.style === 'image',
          },
        },
        {
          name: 'avatars',
          type: 'array',
          label: 'Avatars (up to 3)',
          maxRows: 3,
          admin: {
            initCollapsed: true,
            condition: (_, siblingData) => siblingData?.style !== 'image',
          },
          fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
        },
        {
          name: 'enableLink',
          type: 'checkbox',
          label: 'Make the arrow button a link',
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
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonial cards (right, scrollable)',
      admin: { initCollapsed: true },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', label: 'Role' },
        { name: 'location', type: 'text', label: 'Location (shown in lighter grey)' },
        { name: 'tag', type: 'text', label: 'Small pill, top right (optional)' },
      ],
    },
  ],
}
