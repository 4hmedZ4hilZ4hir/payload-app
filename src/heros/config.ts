import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

// Shows a field only for the given hero types.
const isType =
  (...types: string[]) =>
  (_: unknown, siblingData: Record<string, any> = {}) =>
    types.includes(siblingData?.type)

// Defines the hero field.
export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Hero', value: 'hero' },
        { label: 'Alt Hero', value: 'altHero' },
        { label: 'High Impact', value: 'highImpact' },
        { label: 'Medium Impact', value: 'mediumImpact' },
        { label: 'Low Impact', value: 'lowImpact' },
      ],
      required: true,
    },

    {
      name: 'title',
      type: 'text',
      label: 'Title',
      admin: {
        description: 'Alt Hero: this is the big name in the middle.',
        condition: isType('hero', 'altHero'),
      },
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Image',
      relationTo: 'media',
      admin: {
        description:
          'Alt Hero: upload a transparent PNG cut-out of the person so the head overlaps the frame.',
        condition: isType('hero', 'altHero'),
      },
    },

    {
      name: 'portraitStyle',
      type: 'select',
      label: 'Portrait style',
      defaultValue: 'fill',
      options: [
        { label: 'Fill the frame (normal photo)', value: 'fill' },
        { label: 'Cut-out (transparent PNG, head overlaps the frame)', value: 'cutout' },
      ],
      admin: { condition: isType('altHero') },
    },

    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: { condition: isType('hero') },
    },

    {
      name: 'servicesTitle',
      type: 'text',
      label: 'Left column heading',
      defaultValue: 'Service',
      admin: { condition: isType('altHero') },
    },
    {
      name: 'services',
      type: 'array',
      label: 'Left column items',
      maxRows: 4,
      admin: { initCollapsed: true, condition: isType('altHero') },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Small square icon (SVG or PNG).' },
        },
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'aboutHeading',
      type: 'text',
      label: 'Right column heading',
      admin: { condition: isType('altHero') },
    },
    {
      name: 'aboutText',
      type: 'textarea',
      label: 'Right column text',
      admin: {
        description: 'Leave a blank line between paragraphs.',
        condition: isType('altHero'),
      },
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Stats row',
      maxRows: 4,
      admin: { initCollapsed: true, condition: isType('hero', 'altHero') },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo / icon (optional)',
        },
        { name: 'title', type: 'text', label: 'Top name (optional)' },
        {
          name: 'badge',
          type: 'text',
          label: 'Top-right chip (optional)',
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
        },
        {
          name: 'value',
          type: 'text',
          label: 'Big value (optional)',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Small text (optional)',
        },
        {
          name: 'currencies',
          type: 'array',
          label: 'Currency switcher (optional)',
          admin: {
            description:
              'The first currency is the one the big value is typed in. Others are converted with their rate.',
          },
          maxRows: 6,
          fields: [
            { name: 'code', type: 'text', required: true, label: 'Code (USD)' },
            { name: 'symbol', type: 'text', label: 'Symbol ($)' },
            { name: 'flag', type: 'text', label: 'Country code for the flag (us)', maxLength: 2 },
            {
              name: 'rate',
              type: 'number',
              label: 'Rate compared to the first currency',
              defaultValue: 1,
            },
          ],
        },
        { name: 'accountLast4', type: 'text', label: 'Account number: last 4 digits', maxLength: 4 },
        { name: 'validThru', type: 'text', label: 'Valid thru (date)' },
        {
          name: 'details',
          type: 'array',
          label: 'Small details at the bottom (optional)',
          maxRows: 3,
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'value', type: 'text', required: true },
          ],
        },
      ],
    },

    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          // Returns the editor features for the hero text.
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
      admin: {
        condition: (_, { type } = {}) => type !== 'hero' && type !== 'altHero',
      },
    },
    linkGroup({
      overrides: {
        maxRows: 2,
        admin: {
          initCollapsed: true,
          condition: (_, { type } = {}) => type !== 'none',
        },
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
