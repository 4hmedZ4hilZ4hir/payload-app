import { ArrowUpRight } from 'lucide-react'
import React from 'react'

import type { FeatureCarouselBlock as FeatureCarouselBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { RotatingCards, type RotatingItem } from './RotatingCards'

type Card = NonNullable<FeatureCarouselBlockProps['cards']>[number]
type Testimonial = NonNullable<FeatureCarouselBlockProps['testimonials']>[number]

// Small version of a card.
const SmallCard: React.FC<{ card: Card }> = ({ card }) => {
  const isImage = card.style === 'image'

  // Returns the card markup.
  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col justify-between overflow-hidden p-4',
        'lg:px-32 lg:pb-36 lg:pt-28',
        isImage ? 'text-white' : 'bg-[#efefef] text-ink',
      )}
    >
      {isImage && card.image && typeof card.image === 'object' && (
        <>
          <Media
            fill
            priority
            htmlElement={null}
            resource={card.image}
            imgClassName="object-cover"
            size="(max-width: 640px) 176px, 313px"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/20" />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
        </>
      )}

      <div className="relative z-10 flex flex-col items-start gap-4 lg:gap-63">
        {card.tag && (
          <span
            className={cn(
              'rounded-full border px-3 py-1 text-xs',
              'lg:flex lg:h-43 lg:items-center lg:px-22 lg:py-0 lg:text-d18',
              isImage ? 'border-white/80 bg-white/10 backdrop-blur-sm' : 'border-neutral-400',
            )}
          >
            {card.tag}
          </span>
        )}
        {!isImage && card.avatars && card.avatars.length > 0 && (
          <div className="flex -space-x-3 lg:-space-x-15">
            {card.avatars.map((a, i) => (
              <span
                key={a.id ?? i}
                className="relative size-10 overflow-hidden rounded-full border-2 border-[#efefef] bg-neutral-300 lg:size-59"
              >
                {a.image && typeof a.image === 'object' && (
                  <Media fill priority resource={a.image} imgClassName="object-cover" />
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="relative z-10 flex items-end justify-between gap-2">
        <p className="max-w-40 text-lg leading-tight lg:max-w-150 lg:text-d28 lg:leading-d37">
          {card.title}
        </p>
        {card.enableLink && card.link && (
          <CMSLink
            {...card.link}
            appearance="inline"
            className={cn(
              'flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors lg:size-55',
              isImage
                ? 'border-white hover:bg-white/20'
                : 'border-ink hover:bg-ink hover:text-white',
            )}
          >
            <ArrowUpRight className="size-4 lg:size-22" />
            <span className="sr-only">{card.title}</span>
          </CMSLink>
        )}
      </div>
    </div>
  )
}

// Big version of a card (the testimonial look).
const BigCard: React.FC<{
  name?: string | null
  role?: string | null
  location?: string | null
  tag?: string | null
  image?: unknown
}> = ({ name, role, location, tag, image }) => {
  // Returns the big card markup.
  return (
    <figure className="relative flex h-full w-full flex-col bg-[#999793] p-5 text-white lg:px-41 lg:pb-50 lg:pt-34">
      {tag && (
        <span className="absolute right-5 top-5 z-10 rounded-full bg-white/25 px-4 py-2 text-xs lg:right-20 lg:top-40 lg:flex lg:h-45 lg:items-center lg:px-26 lg:py-0 lg:text-d16">
          {tag}
        </span>
      )}
      <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-2xl bg-neutral-300 lg:w-245 lg:flex-none lg:h-342 lg:rounded-d22">
        {image && typeof image === 'object' ? (
          <Media fill priority resource={image as never} imgClassName="object-cover" />
        ) : null}
      </div>
      <figcaption className="mt-5 lg:mt-auto">
        <p className="text-xl lg:text-d30 lg:leading-d40">{name}</p>
        {(role || location) && (
          <p className="mt-1 text-sm lg:mt-0 lg:text-d20 lg:leading-d30">
            {role} <span className="text-white/55">{location}</span>
          </p>
        )}
      </figcaption>
    </figure>
  )
}

// Renders the feature carousel block.
export const FeatureCarouselBlock: React.FC<FeatureCarouselBlockProps> = ({
  heading,
  description,
  cards,
  testimonials,
}) => {
  // Turns each testimonial into a card that can be small or big.
  const fromTestimonial = (t: Testimonial, i: number): RotatingItem => ({
    key: `t-${t.id ?? i}`,
    big: <BigCard name={t.name} role={t.role} location={t.location} tag={t.tag} image={t.image} />,
    small: (
      <SmallCard
        card={
          {
            style: 'image',
            tag: t.tag,
            title: t.name,
            image: t.image,
            enableLink: false,
          } as Card
        }
      />
    ),
  })

  // Turns each small card into a card that can be small or big.
  const fromCard = (c: Card, i: number): RotatingItem => ({
    key: `c-${c.id ?? i}`,
    small: <SmallCard card={c} />,
    big: (
      <BigCard
        name={c.title}
        tag={c.tag}
        image={c.style === 'image' ? c.image : c.avatars?.[0]?.image}
      />
    ),
  })

  const testimonialItems = (testimonials || []).map(fromTestimonial)
  const cardItems = (cards || []).map(fromCard)
  // The first testimonial starts as the big card.
  const items = [...testimonialItems.slice(0, 1), ...cardItems, ...testimonialItems.slice(1)]

  // Returns the carousel section.
  return (
    <section className="overflow-hidden bg-white lg:[--spacing:var(--u)]">
      <div className="mx-auto px-4 py-12 sm:px-6 md:py-20 lg:max-w-1440 lg:px-0 lg:py-100 lg:pl-56">
        <RotatingCards
          items={items}
          header={
            <>
              <h2 className="max-w-lg text-4xl font-normal leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl md:text-6xl lg:max-w-660 lg:text-d72 lg:leading-d76">
                {heading}
              </h2>
              {description && (
                <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-500 lg:mt-32 lg:max-w-640 lg:text-d20 lg:leading-d30">
                  {description}
                </p>
              )}
            </>
          }
        />
      </div>
    </section>
  )
}
