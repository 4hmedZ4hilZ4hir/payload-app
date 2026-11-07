import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

// Defines the Header global.
export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logoText',
      type: 'text',
      required: true,
      defaultValue: 'AeroSense',
      label: 'Logo text',
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'showCta',
      type: 'checkbox',
      label: 'Show the dark button on the right',
      defaultValue: true,
    },
    link({
      appearances: false,
      overrides: {
        name: 'cta',
        admin: {
          condition: (_data, siblingData) => Boolean(siblingData?.showCta),
        },
      },
    }),
    {
      name: 'languageLabel',
      type: 'text',
      defaultValue: 'eng',
      label: 'Language pill text (leave empty to hide)',
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
