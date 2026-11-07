import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

// Defines the Footer global.
export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logoText',
      type: 'text',
      required: true,
      defaultValue: 'AeroSense',
      label: 'Big logo text',
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Link column 1 (pages)',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Link column 2 (social, shown with an arrow)',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: 'All rights reserved.',
      label: 'Copyright text (the © and year are added automatically)',
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Legal links',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 3,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', admin: { width: '50%' } },
        { name: 'email', type: 'text', admin: { width: '50%' } },
      ],
    },
    {
      name: 'address',
      type: 'text',
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
