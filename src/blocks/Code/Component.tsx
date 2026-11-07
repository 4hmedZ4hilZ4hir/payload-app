import React from 'react'

import { Code } from './Component.client'

// Describes the data of the code block.
export type CodeBlockProps = {
  code: string
  language?: string
  blockType: 'code'
}

type Props = CodeBlockProps & {
  className?: string
}

// Renders the code block.
export const CodeBlock: React.FC<Props> = ({ className, code, language }) => {
  // Returns the code wrapper.
  return (
    <div className={[className, 'not-prose'].filter(Boolean).join(' ')}>
      <Code code={code} language={language} />
    </div>
  )
}
