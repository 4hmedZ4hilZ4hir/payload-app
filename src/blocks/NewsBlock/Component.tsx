import { Eye, MessageSquare, Share2 } from 'lucide-react'
import React from 'react'

import type { NewsBlock as NewsBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { ArticleActions } from './ArticleActions'

// Small category pill.
const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Returns the pill markup.
  return (
  <span className="inline-block rounded-full bg-red-50 px-4 py-2 text-xs font-medium uppercase tracking-wider text-red-700 shadow-sm shadow-red-100 lg:inline-flex lg:h-33 lg:items-center lg:px-25 lg:py-0 lg:text-d14">
    {children}
  </span>
  )
}

// Joins author names into one text.
const joinAuthors = (names: string[]) => {
  // Returns the name as it is.
  if (names.length <= 1) return names.join('')
  // Returns the names joined with commas and and.
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}

// Renders the news block.
export const NewsBlockComponent: React.FC<NewsBlockProps> = ({
  sectionTitle,
  featured,
  relatedTitle,
  enableLink,
  link,
  related,
}) => {
  const authors = (featured?.authors || []).map((a) => a.name).filter(Boolean)
  // Splits the related title into a bold first word and a lighter rest.
  const [relatedFirst, ...relatedRest] = (relatedTitle || '').split(' ')

  // Returns the news section.
  return (
    <section className="bg-[#f7f8fa] lg:[--spacing:var(--u)]">
      <div className="mx-auto max-w-384 px-4 py-12 sm:px-6 md:py-16 lg:max-w-1440 lg:pb-100 lg:pl-26 lg:pr-44 lg:pt-60">
        <div className="grid gap-12 lg:grid-cols-[calc(var(--u)*843)_minmax(0,1fr)] lg:gap-43">
          <div>
            {sectionTitle && (
              <h2 className="text-2xl font-semibold tracking-tight text-ink lg:text-d26 lg:leading-d31">{sectionTitle}</h2>
            )}

            {featured && (
              <article className="mt-6 lg:mt-30">
                <div className="rounded-4xl bg-white p-2.5 shadow-sm shadow-black/3 lg:rounded-d29 lg:p-11">
                  <div className="relative aspect-16/8.5 overflow-hidden rounded-3xl bg-neutral-200 lg:aspect-auto lg:h-348 lg:rounded-d26">
                    {featured.image && typeof featured.image === 'object' && (
                      <Media fill priority resource={featured.image} imgClassName="object-cover" />
                    )}
                  </div>

                  <div className="px-3 pb-5 pt-5 sm:px-6 lg:pb-29 lg:pl-31 lg:pr-29 lg:pt-36">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      {featured.category ? <Tag>{featured.category}</Tag> : <span />}
                      <div className="flex items-center gap-6 text-sm text-ink lg:gap-31 lg:text-d20">
                        {featured.views && (
                          <span className="flex items-center gap-2 lg:gap-9">
                            <Eye className="size-4 text-neutral-400 lg:size-19" /> {featured.views}
                          </span>
                        )}
                        {featured.comments && (
                          <span className="flex items-center gap-2 lg:gap-9">
                            <MessageSquare className="size-4 text-neutral-400 lg:size-19" />{' '}
                            {featured.comments}
                          </span>
                        )}
                        {featured.shares && (
                          <span className="flex items-center gap-2 lg:gap-9">
                            <Share2 className="size-4 text-neutral-400 lg:size-19" /> {featured.shares}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-8 lg:mt-12 lg:gap-0">
                      <div>
                        <h3 className="text-2xl font-medium leading-snug tracking-tight text-ink md:text-3xl lg:max-w-545 lg:text-d28 lg:leading-d40">
                          {featured.title}
                        </h3>
                        {authors.length > 0 && (
                          <p className="mt-4 text-sm text-neutral-500 lg:mt-19 lg:text-d16">
                            By <span className="uppercase text-ink">{joinAuthors(authors)}</span>
                          </p>
                        )}
                        {featured.dateLine && (
                          <p className="mt-2 text-xs text-neutral-500 lg:mt-12 lg:text-d14">{featured.dateLine}</p>
                        )}
                      </div>

                      <ArticleActions
                        title={featured.title}
                        saveLabel={featured.saveLabel}
                        shareLabel={featured.shareLabel}
                      />
                    </div>
                  </div>
                </div>

                {featured.body && (
                  <div className="mt-8 px-2 sm:px-6 lg:mt-34 lg:max-w-797 lg:px-42">
                    <RichText
                      data={featured.body}
                      enableGutter={false}
                      enableProse={false}
                      className="space-y-6 text-[15px] leading-8 text-neutral-500 lg:space-y-31 lg:text-d17 lg:leading-d32 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink [&_a]:text-blue-600 [&_a]:underline"
                    />
                  </div>
                )}
              </article>
            )}
          </div>

          <aside>
            <div className="flex items-baseline justify-between gap-4">
              {relatedTitle && (
                <h2 className="text-2xl tracking-tight text-ink lg:text-d26 lg:leading-d31">
                  <span className="font-semibold">{relatedFirst}</span>
                  {relatedRest.length > 0 && <span className="font-normal"> {relatedRest.join(' ')}</span>}
                </h2>
              )}
              {enableLink && link && (
                <CMSLink
                  {...link}
                  appearance="inline"
                  className="text-sm font-medium text-ink hover:underline lg:text-d16"
                />
              )}
            </div>

            <ul className="mt-6 flex flex-col gap-5 lg:mt-30 lg:gap-24">
              {related?.map((item, i) => (
                <li
                  key={item.id ?? i}
                  className="relative rounded-3xl bg-white p-2.5 shadow-sm shadow-black/3 transition-shadow hover:shadow-md lg:rounded-d24 lg:p-14"
                >
                  <div className="relative aspect-[5/2.4] overflow-hidden rounded-2xl bg-neutral-200 lg:aspect-auto lg:h-179 lg:rounded-d24">
                    {item.image && typeof item.image === 'object' && (
                      <Media fill resource={item.image} imgClassName="object-cover" />
                    )}
                  </div>
                  <div className="px-2 pb-3 pt-4 sm:px-3 lg:px-16 lg:pb-0 lg:pt-22">
                    <div className="flex items-center justify-between gap-3">
                      {item.category ? <Tag>{item.category}</Tag> : <span />}
                      {item.views && (
                        <span className="flex items-center gap-2 text-sm text-ink lg:text-d16">
                          <Eye className="size-4 text-neutral-400 lg:size-17" /> {item.views}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 text-lg font-medium leading-snug text-ink lg:mt-16 lg:text-d20 lg:leading-d28">{item.title}</h3>
                  </div>

                  {item.enableLink && item.link && (
                    <CMSLink
                      {...item.link}
                      appearance="inline"
                      className="absolute inset-0 rounded-3xl"
                    >
                      <span className="sr-only">{item.title}</span>
                    </CMSLink>
                  )}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}
