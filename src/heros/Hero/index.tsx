import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

// Renders the dark main hero.
export const SiteHero: React.FC<Page['hero']> = ({ title, description, links, image }) => {
  // Returns the hero section.
  return (
    <section className="bg-[#181a1c] text-white lg:[--spacing:var(--u)]">
      <div className="mx-auto px-4 pb-4 pt-10 sm:px-6 sm:pb-6 md:pt-16 lg:max-w-1440 lg:px-124 lg:pb-63 lg:pt-77">
        <div className="grid gap-8 md:grid-cols-12 md:items-start lg:flex lg:gap-0">
          {title && (
            <h1 className="text-4xl font-normal leading-[1.05] tracking-tight sm:text-5xl md:col-span-7 lg:w-666 lg:shrink-0 lg:text-d52 lg:leading-d72">
              {title}
            </h1>
          )}

          <div className="flex flex-col items-start gap-6 md:col-span-5 lg:col-span-4 lg:col-start-9 lg:max-w-516 lg:gap-33">
            {description && (
              <p className="max-w-sm text-sm leading-relaxed text-white/60 lg:max-w-516 lg:text-d13 lg:leading-d19">
                {description}
              </p>
            )}

            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex flex-wrap gap-3 lg:gap-12">
                {links.map(({ link }, i) => (
                  <li key={i}>
                    <CMSLink
                      {...link}
                      appearance="inline"
                      className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white/85 lg:h-49 lg:px-34 lg:py-0 lg:text-d14"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {image && typeof image === 'object' && (
          <div className="relative mt-10 aspect-4/3 overflow-hidden rounded-2xl sm:aspect-video md:mt-14 lg:mt-53 lg:aspect-auto lg:h-563 lg:rounded-d19">
            <Media fill priority resource={image} imgClassName="object-cover" />
          </div>
        )}
      </div>
    </section>
  )
}
