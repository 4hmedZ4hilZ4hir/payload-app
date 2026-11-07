import RichText from '@/components/RichText'
import React from 'react'

import { Width } from '../Width'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

// Shows a text message inside the form.
export const Message: React.FC<{ message: DefaultTypedEditorState }> = ({ message }) => {
  // Returns the message section.
  return (
    <Width className="my-12" width="100">
      {message && <RichText data={message} />}
    </Width>
  )
}
