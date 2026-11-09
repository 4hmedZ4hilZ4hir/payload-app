import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { HeroStatCard } from '@/components/HeroStatCard'
import { Reveal } from '@/components/Reveal'
import { cn } from '@/utilities/ui'

// Corner of the image where each stat card floats.
const positions = [
  'left-3 top-3 sm:left-6 sm:top-6 lg:left-25 lg:top-25',
  'bottom-3 right-3 sm:bottom-6 sm:right-6 lg:bottom-25 lg:right-25',
  'right-3 top-3 sm:right-6 sm:top-6 lg:right-25 lg:top-25',
  'bottom-3 left-3 sm:bottom-6 sm:left-6 lg:bottom-25 lg:left-25',
]

// Renders the dark main hero.
export const SiteHero: React.FC<Page['hero']> = ({ title, description, links, image, stats }) => {
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
          <div className="relative mt-10 md:mt-14 lg:mt-53">
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl sm:aspect-video lg:aspect-auto lg:h-563 lg:rounded-d19">
              <Media fill priority resource={image} imgClassName="object-cover" />
            </div>

            {stats?.slice(0, 4).map((stat, i) => (
              <div
                key={stat.id ?? i}
                className={cn(
                  'absolute z-10 w-[46%] max-w-56 sm:w-auto sm:max-w-none',
                  positions[i],
                )}
              >
                <Reveal delay={300 + i * 200}>
                  <HeroStatCard
                    floatStyle={{ animation: `hero-float ${6 + i}s ease-in-out ${i * 0.8}s infinite` }}
                    dropUp={i === 1 || i === 3}
                    title={stat.title}
                    badge={stat.badge}
                    label={stat.label}
                    value={stat.value}
                    description={stat.description}
                    details={stat.details}
                    accountLast4={stat.accountLast4}
                    validThru={stat.validThru}
                    currencies={stat.currencies}
                    icon={
                      stat.icon && typeof stat.icon === 'object' ? (
                        <span className="relative size-7 shrink-0 overflow-hidden rounded-full bg-ink lg:size-32">
                          <Media fill resource={stat.icon} imgClassName="object-contain" />
                        </span>
                      ) : null
                    }
                  />
                </Reveal>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
