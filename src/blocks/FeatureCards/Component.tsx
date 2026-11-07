import { ArrowUpRight } from 'lucide-react'
import React from 'react'

import type { FeatureCardsBlock as FeatureCardsBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

type Card = NonNullable<FeatureCardsBlockProps['cards']>[number]

const cardBase =
  'relative flex min-h-[24rem] flex-col overflow-hidden rounded-3xl p-6 md:min-h-[26rem] md:p-8 lg:h-419 lg:min-h-0 lg:rounded-d34 lg:p-30'

// Dark card with a badge, headline and footnote.
const HighlightCard: React.FC<{ card: Card }> = ({ card }) => {
  // Returns the dark card markup.
  return (
    <div className={cn(cardBase, 'bg-[#050505] text-white lg:pb-44')}>
      {card.badge && (
        <div className="flex size-16 items-center justify-center rounded-full bg-white/10 font-serif text-2xl lg:size-104 lg:text-d44">
          {card.badge}
        </div>
      )}
      <div className="mt-auto">
        {card.text && <p className="text-2xl leading-snug lg:text-d27 lg:leading-d37">{card.text}</p>}
        {card.footnote && (
          <p className="mt-5 line-clamp-3 text-[11px] leading-relaxed text-white/50 lg:mt-24 lg:text-d13 lg:leading-d17">
            {card.footnote}
          </p>
        )}
      </div>
    </div>
  )
}

// Photo card with a tag, caption and optional arrow link.
const ImageCard: React.FC<{ card: Card }> = ({ card }) => {
  const hasLink = card.enableLink && card.link

  // Returns the photo card markup.
  return (
    <div className={cn(cardBase, 'text-white lg:pb-48 lg:pt-28')}>
      {card.image && typeof card.image === 'object' && (
        <Media fill htmlElement={null} resource={card.image} imgClassName="object-cover" />
      )}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/10" />

      {card.tag && (
        <span className="relative z-10 w-fit rounded-full bg-black/40 px-3 py-1.5 text-xs backdrop-blur lg:flex lg:h-43 lg:items-center lg:px-26 lg:py-0 lg:text-d15">
          {card.tag}
        </span>
      )}

      <div className="relative z-10 mt-auto flex items-center justify-between gap-4 lg:gap-20">
        {card.text && (
          <p className="max-w-[16rem] text-2xl leading-snug lg:max-w-280 lg:text-d27 lg:leading-d37">
            {card.text}
          </p>
        )}
        {hasLink && (
          <CMSLink
            {...card.link}
            appearance="inline"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform hover:scale-105 lg:size-48"
          >
            <ArrowUpRight className="size-4 lg:size-20" />
            <span className="sr-only">Open</span>
          </CMSLink>
        )}
      </div>
    </div>
  )
}

// White card with a big number and a bar chart.
const StatCard: React.FC<{ card: Card }> = ({ card }) => {
  const bars = card.bars || []

  // Returns the stat card markup.
  return (
    <div className={cn(cardBase, 'bg-white text-ink lg:pb-36 lg:pt-36')}>
      {card.value && (
        <p className="font-serif text-5xl leading-none tracking-tight md:text-6xl lg:text-d70">
          {card.value}
        </p>
      )}
      {card.caption && (
        <p className="mt-3 max-w-56 text-xs text-neutral-500 lg:mt-16 lg:max-w-230 lg:text-d13 lg:leading-d17">
          {card.caption}
        </p>
      )}

      <div className="mt-auto flex h-44 items-end gap-2 pt-8 lg:h-176 lg:gap-3 lg:pt-0">
        {bars.map((bar, i) => {
          const tint = bars.length > 1 ? 90 - (i * 75) / (bars.length - 1) : 90
          // Returns one chart bar column.
          return (
            <div key={i} className="flex h-full flex-1 flex-col gap-3 lg:gap-20">
              <div className="relative min-h-0 flex-1">
                <div
                  className="absolute inset-x-0 bottom-0 border-t-2 border-bar"
                  style={{
                    height: `${Math.min(Math.max(bar.value ?? 0, 0), 100)}%`,
                    backgroundColor: `color-mix(in srgb, var(--color-bar) ${tint}%, white)`,
                  }}
                />
              </div>
              <span
                className={cn(
                  'shrink-0 text-center text-[10px] uppercase tracking-wide text-neutral-400 lg:text-d12',
                  bar.highlight && 'font-bold text-ink',
                )}
              >
                {bar.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Renders the grid of feature cards.
export const FeatureCardsBlock: React.FC<FeatureCardsBlockProps> = ({ cards }) => {
  // Returns nothing when there are no cards.
  if (!cards?.length) return null

  // Returns the card grid section.
  return (
    <section className="bg-[#f3f0ed] lg:[--spacing:var(--u)]">
      <div className="mx-auto grid gap-4 px-4 py-12 sm:px-6 md:grid-cols-3 md:py-16 lg:max-w-1440 lg:grid-cols-3 lg:gap-19 lg:px-82 lg:pb-100 lg:pt-67">
        {cards.map((card, i) => {
          // Returns the photo card.
          if (card.cardType === 'image') return <ImageCard key={i} card={card} />
          // Returns the stat card.
          if (card.cardType === 'stat') return <StatCard key={i} card={card} />
          // Returns the dark card.
          return <HighlightCard key={i} card={card} />
        })}
      </div>
    </section>
  )
}
