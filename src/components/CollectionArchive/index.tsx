import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'

// Describes the props of the archive.
export type Props = {
  posts: CardPostData[]
}

// Renders a grid of post cards.
export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  // Returns the grid of post cards.
  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {posts?.map((result, index) => {
            // Checks if result is an object and result exists.
            if (typeof result === 'object' && result !== null) {
              // Returns a card for the post.
              return (
                <div className="col-span-4" key={index}>
                  <Card className="h-full" doc={result} relationTo="posts" showCategories />
                </div>
              )
            }

            // Returns nothing when the post is not an object.
            return null
          })}
        </div>
      </div>
    </div>
  )
}
