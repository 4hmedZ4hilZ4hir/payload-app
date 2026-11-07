import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

// Stores every user submission of a custom form in its own sidebar entry.
export const CustomSubmissions: CollectionConfig = {
  slug: 'custom-submissions',
  labels: {
    singular: 'Submission',
    plural: 'Submissions',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'formTitle',
    group: 'Submissions',
    defaultColumns: ['formTitle', 'createdAt'],
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'custom-forms',
      required: true,
      label: 'Form',
      admin: { readOnly: true },
    },
    {
      name: 'formTitle',
      type: 'text',
      required: true,
      label: 'Form name',
      admin: { readOnly: true },
    },
    {
      name: 'answers',
      type: 'array',
      label: 'Answers',
      admin: { readOnly: true },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Question',
          admin: { readOnly: true },
        },
        {
          name: 'value',
          type: 'textarea',
          label: 'Answer',
          admin: { readOnly: true },
        },
      ],
    },
  ],
}
