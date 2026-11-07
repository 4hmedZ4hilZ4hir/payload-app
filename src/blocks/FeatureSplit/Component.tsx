import React from 'react'

import type { FeatureSplitBlock as FeatureSplitBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

// Renders the image and text split block.
export const FeatureSplitBlock: React.FC<FeatureSplitBlockProps> = ({
  image,
  imagePosition,
  title,
  description,
  links,
}) => {
  const imageRight = imagePosition === 'right'

  // Returns the split section.
  return (
    <section className="bg-[#f6f2e9] lg:[--spacing:var(--u)]">
      <div className="mx-auto grid items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-16 md:py-20 lg:flex lg:max-w-1440 lg:gap-63 lg:px-116 lg:pb-62 lg:pt-124">
        <div
          className={cn(
            'relative aspect-4/3 overflow-hidden rounded-2xl lg:aspect-auto lg:h-390 lg:w-598 lg:shrink-0 lg:rounded-d14',
            imageRight && 'md:order-2',
          )}
        >
          {image && typeof image === 'object' && (
            <Media fill resource={image} imgClassName="object-cover" />
          )}
        </div>

        <div className={cn('max-w-md lg:max-w-420', imageRight && 'md:order-1 md:ml-auto')}>
          <h2 className="text-3xl font-light leading-tight tracking-tight text-ink sm:text-4xl lg:text-d44 lg:leading-d52">
            {title}
          </h2>

          {description && (
            <p className="mt-4 text-sm leading-relaxed text-neutral-500 lg:mt-20 lg:text-d16 lg:leading-d27">
              {description}
            </p>
          )}

          {Array.isArray(links) && links.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-3 lg:mt-27 lg:gap-18">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink
                    {...link}
                    appearance="inline"
                    className={cn(
                      'inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors lg:h-48 lg:px-34 lg:py-0 lg:text-d15',
                      link.appearance === 'outline'
                        ? 'bg-white text-ink hover:bg-white/70'
                        : 'bg-[#47493e] text-white hover:bg-ink',
                    )}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
