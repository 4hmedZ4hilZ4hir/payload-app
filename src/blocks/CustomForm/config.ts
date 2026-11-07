import type { Block } from 'payload'

// Page block that shows one custom form.
export const CustomForm: Block = {
  slug: 'customForm',
  interfaceName: 'CustomFormBlock',
  labels: {
    singular: 'Custom form',
    plural: 'Custom forms',
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'custom-forms',
      required: true,
      label: 'Form to show',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Text under the heading',
    },
  ],
}
