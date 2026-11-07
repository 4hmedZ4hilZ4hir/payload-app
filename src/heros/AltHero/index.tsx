import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

// Renders the light portfolio hero.
export const AltHero: React.FC<Page['hero']> = ({
  title,
  image,
  portraitStyle,
  servicesTitle,
  services,
  aboutHeading,
  aboutText,
  stats,
  links,
}) => {
  const paragraphs = (aboutText || '').split(/\n\s*\n/).filter(Boolean)
  const firstLink = Array.isArray(links) ? links[0]?.link : undefined

  // Returns the hero section.
  return (
    <section
      data-hero-theme="light"
      className="overflow-x-clip bg-[#efefee] text-neutral-800 lg:[--spacing:var(--u)]"
      style={{
        backgroundImage:
          'repeating-radial-gradient(circle at 15% 120%, transparent 0 26px, rgba(0,0,0,0.035) 26px 27px), repeating-radial-gradient(circle at 90% -20%, transparent 0 26px, rgba(0,0,0,0.03) 26px 27px)',
      }}
    >
      <div className="mx-auto px-4 pb-16 pt-12 sm:px-6 md:pt-16 lg:max-w-1440 lg:px-0 lg:pb-88 lg:pt-52">
        {title && (
          <div className="mx-auto w-fit text-center">
            <h1 className="font-display text-5xl font-medium leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-d80">
              {title}
            </h1>
            <span className="mt-3 block h-0.75 w-14 bg-neutral-300 lg:mt-10 lg:h-3 lg:w-59" />
          </div>
        )}

        <div className="mt-12 grid items-center gap-12 lg:mx-auto lg:mt-20 lg:grid-cols-[calc(var(--u)*303)_calc(var(--u)*433)_calc(var(--u)*303)] lg:items-end lg:justify-center lg:gap-80">
          <div className="order-2 lg:order-1">
            {servicesTitle && (
              <h2 className="font-display text-2xl font-medium tracking-tight lg:text-d25 lg:leading-d30">
                {servicesTitle}
              </h2>
            )}
            <ul className="mt-6 flex flex-col gap-8 lg:mt-28 lg:gap-23">
              {services?.map((service, i) => (
                <li key={service.id ?? i}>
                  <div className="flex items-center gap-3 lg:gap-13">
                    <span className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-2 shadow-md shadow-black/5 lg:size-45 lg:rounded-d6 lg:p-9">
                      {service.icon && typeof service.icon === 'object' && (
                        <Media
                          resource={service.icon}
                          imgClassName="size-full object-contain"
                          className="size-full"
                        />
                      )}
                    </span>
                    <h3 className="font-display text-base font-medium lg:text-d15">{service.name}</h3>
                  </div>
                  {service.description && (
                    <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-neutral-400 lg:mt-12 lg:max-w-185 lg:text-d14 lg:leading-d25">
                      {service.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto aspect-3/4 w-full max-w-sm lg:aspect-auto lg:h-482 lg:w-433 lg:max-w-none">
              {portraitStyle === 'cutout' ? (
                <>
                  <div className="absolute inset-x-0 bottom-0 top-[14%] rounded-t-3xl bg-[#c9c6bc] shadow-2xl shadow-black/10 ring-8 ring-white/40 lg:inset-x-12 lg:top-92 lg:rounded-t-d18 lg:ring-12" />
                  {image && typeof image === 'object' && (
                    <div className="absolute inset-y-0 left-1/2 w-[135%] -translate-x-1/2">
                      <Media
                        fill
                        priority
                        resource={image}
                        size="(min-width: 1024px) 700px, 100vw"
                        imgClassName="object-contain object-bottom"
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 overflow-hidden rounded-3xl bg-[#c9c6bc] shadow-2xl shadow-black/10 ring-8 ring-white/40 lg:inset-x-12 lg:top-92 lg:rounded-t-d18 lg:rounded-b-none lg:ring-12">
                  {image && typeof image === 'object' && (
                    <Media fill priority resource={image} imgClassName="object-cover object-top" />
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="order-3">
            {aboutHeading && (
              <h2 className="font-display text-2xl font-medium leading-snug tracking-tight lg:text-d24 lg:leading-d31">
                {aboutHeading}
              </h2>
            )}
            <div className="mt-5 flex flex-col gap-6 text-sm leading-relaxed text-neutral-400 lg:mt-20 lg:gap-24 lg:text-d14 lg:leading-d24">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {firstLink && (
              <CMSLink
                {...firstLink}
                appearance="inline"
                className="mt-8 inline-flex items-center rounded-sm bg-[#303030] px-9 py-3.5 text-base text-white transition-colors hover:bg-black lg:mt-37 lg:h-44 lg:w-120 lg:justify-center lg:rounded-d2 lg:px-0 lg:py-0 lg:text-d17"
              />
            )}

            {stats && stats.length > 0 && (
              <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4 lg:mt-61 lg:gap-x-29">
                {stats.map((stat, i) => (
                  <div key={stat.id ?? i}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-display text-3xl font-medium lg:text-d26 lg:leading-d34">
                      {stat.value}
                    </dd>
                    <p className="mt-1 text-sm text-neutral-400 lg:mt-4 lg:text-d14">{stat.label}</p>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
