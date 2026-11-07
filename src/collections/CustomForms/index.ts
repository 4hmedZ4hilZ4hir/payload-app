import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { revalidateCustomForm } from './hooks/revalidateCustomForm'

const textLike = ['text', 'email', 'phone', 'number', 'textarea']
const choiceLike = ['select', 'radio']

// Custom form builder: the admin chooses the inputs and their types.
export const CustomForms: CollectionConfig = {
  slug: 'custom-forms',
  labels: {
    singular: 'Custom Form',
    plural: 'Custom Forms',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Custom Forms',
    defaultColumns: ['title', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Form name',
    },
    {
      name: 'inputs',
      type: 'array',
      label: 'Form inputs',
      labels: {
        singular: 'Input',
        plural: 'Inputs',
      },
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
        {
          name: 'inputType',
          type: 'select',
          required: true,
          defaultValue: 'text',
          label: 'Input type',
          options: [
            { label: 'Short text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Phone number', value: 'phone' },
            { label: 'Number', value: 'number' },
            { label: 'Long text', value: 'textarea' },
            { label: 'Date', value: 'date' },
            { label: 'Dropdown', value: 'select' },
            { label: 'Radio buttons', value: 'radio' },
            { label: 'Checkbox', value: 'checkbox' },
          ],
        },
        {
          name: 'placeholder',
          type: 'text',
          label: 'Placeholder',
          admin: {
            condition: (_data, siblingData) => textLike.includes(siblingData?.inputType),
          },
        },
        {
          name: 'options',
          type: 'array',
          label: 'Choices',
          labels: {
            singular: 'Choice',
            plural: 'Choices',
          },
          admin: {
            condition: (_data, siblingData) => choiceLike.includes(siblingData?.inputType),
          },
          validate: (value, { siblingData }) => {
            const needsChoices = choiceLike.includes((siblingData as { inputType?: string })?.inputType ?? '')
            // Checks if needs choices is set and value is not a list or length is 0.
            if (needsChoices && (!Array.isArray(value) || value.length === 0)) {
              // Returns an error when there are no choices.
              return 'Add at least one choice.'
            }
            // Returns true when the choices are valid.
            return true
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Choice',
            },
          ],
        },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: false,
          label: 'Required',
        },
      ],
    },
    {
      name: 'submitLabel',
      type: 'text',
      defaultValue: 'Submit',
      label: 'Submit button text',
    },
    {
      name: 'successMessage',
      type: 'textarea',
      defaultValue: 'Thank you! Your submission was received.',
      label: 'Message after submitting',
    },
  ],
  hooks: {
    afterChange: [revalidateCustomForm],
  },
}
