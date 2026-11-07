import { ArrowUpRight } from 'lucide-react'
import React from 'react'

import type { FaqListBlock as FaqListBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

// Renders the FAQ list block.
export const FaqListBlock: React.FC<FaqListBlockProps> = ({
  label,
  heading,
  enableLink,
  link,
  items,
}) => {
  // Returns the FAQ section.
  return (
    <section className="bg-[#f5f5f0] lg:[--spacing:var(--u)]">
      <div className="mx-auto px-4 py-12 sm:px-6 md:py-20 lg:max-w-1440 lg:px-24 lg:pb-64 lg:pt-96">
        <div className="grid items-start gap-6 md:grid-cols-12 lg:grid-cols-12 lg:items-end lg:gap-0">
          <div className="md:col-span-3 lg:self-start lg:pt-6">
            {label && (
              <span className="inline-block rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-semibold text-ink lg:inline-flex lg:h-27 lg:items-center lg:px-17 lg:py-0 lg:text-d14">
                {label}
              </span>
            )}
          </div>

          <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:col-span-7 md:text-6xl lg:max-w-520 lg:text-d52 lg:leading-d57 lg:tracking-[-0.03em]">
            {heading}
          </h2>

          <div className="md:col-span-2 md:flex md:justify-end">
            {enableLink && link && (
              <CMSLink
                {...link}
                appearance="inline"
                className="inline-flex items-center rounded-full bg-[#232325] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700 lg:h-40 lg:px-24 lg:py-0 lg:text-d14"
              />
            )}
          </div>
        </div>

        <ul className="mt-12 divide-y divide-[#e6e6e1] border-t border-[#e6e6e1] md:mt-16 lg:mt-75">
          {items?.map((item, i) => (
            <li
              key={item.id ?? i}
              className="grid items-center gap-4 py-5 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] md:gap-6 lg:grid-cols-[calc(var(--u)*689)_minmax(0,1fr)_calc(var(--u)*35)] lg:gap-0 lg:py-15"
            >
              <div className="flex items-center gap-5 lg:gap-24">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-neutral-200 lg:size-104 lg:rounded-d20">
                  {item.image && typeof item.image === 'object' && (
                    <Media fill resource={item.image} imgClassName="object-cover" />
                  )}
                </div>
                <h3 className="text-xl font-semibold leading-tight tracking-tight text-ink md:text-2xl lg:max-w-330 lg:text-d23 lg:leading-d35 lg:tracking-[-0.02em]">
                  {item.title}
                </h3>
              </div>

              <div className="md:border-l md:border-[#e6e6e1] md:pl-6 lg:flex lg:h-66 lg:items-center lg:pl-16">
                <p className="text-sm leading-relaxed text-ink lg:max-w-470 lg:text-d15 lg:leading-d24">
                  {item.description}
                </p>
              </div>

              <div className="flex md:justify-end">
                {item.enableLink && item.link && (
                  <CMSLink
                    {...item.link}
                    appearance="inline"
                    className="flex size-12 items-center justify-center rounded-xl border border-neutral-300 text-ink transition-colors hover:bg-white lg:size-35 lg:rounded-d10"
                  >
                    <ArrowUpRight className="size-5 lg:size-16" />
                    <span className="sr-only">{item.title}</span>
                  </CMSLink>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
