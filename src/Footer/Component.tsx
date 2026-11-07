import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { getCachedGlobal } from '@/utilities/getGlobals'

// Renders the site footer.
export async function Footer() {
  const footer = await getCachedGlobal('footer', 1)()

  const navItems = footer?.navItems || []
  const socialLinks = footer?.socialLinks || []
  const legalLinks = footer?.legalLinks || []

  // Returns the footer markup.
  return (
    <footer className="mt-auto bg-ink lg:[--spacing:var(--u)]">
      <div className="rounded-b-4xl bg-white">
        <div className="mx-auto max-w-384 px-4 pb-6 pt-14 sm:px-6 md:pt-20 lg:max-w-1440 lg:px-26 lg:pb-26 lg:pt-100">
          {/* Top row: on desktop a 12 column grid. The logo takes columns 1 to 8, the nav starts in column 9 and the social links in column 11. */}
          <div className="flex flex-col gap-12 md:grid md:grid-cols-3 md:items-start lg:grid-cols-12 lg:gap-0">
            <Link
              href="/"
              className="text-6xl font-semibold leading-none tracking-[-0.06em] text-ink sm:text-7xl md:text-8xl lg:col-span-8 lg:text-d80"
            >
              {footer?.logoText}
            </Link>

            <div className="grid grid-cols-2 gap-10 text-sm text-ink md:col-start-3 md:justify-self-start md:gap-x-12 lg:contents lg:text-d15 lg:leading-d24">
              <ul className="flex flex-col gap-3.5 lg:col-span-2 lg:col-start-9 lg:gap-5">
                {navItems.map(({ link }, i) => (
                  <li key={i}>
                    <CMSLink {...link} appearance="inline" />
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-3.5 lg:col-span-2 lg:col-start-11 lg:gap-5">
                {socialLinks.map(({ link }, i) => (
                  <li key={i}>
                    <CMSLink
                      {...link}
                      appearance="inline"
                      className="inline-flex items-center gap-2 underline underline-offset-2"
                    >
                      <ArrowUpRight className="size-4 lg:size-14" />
                    </CMSLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom row: on desktop a 12 column grid. The legal text is in columns 1 to 3, the phone and email start in column 4, and the address is pushed to the right edge. */}
          <div className="mt-20 flex flex-col gap-3 text-sm text-ink md:mt-28 md:flex-row md:items-center md:justify-between lg:mt-87 lg:grid lg:grid-cols-12 lg:gap-0 lg:text-d15 lg:leading-d24">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 lg:col-span-3 lg:gap-x-10">
              <span>
                © {new Date().getFullYear()} {footer?.copyright}
              </span>
              {legalLinks.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  appearance="inline"
                  className="underline underline-offset-2"
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-3 lg:col-span-6 lg:col-start-4 lg:gap-x-13">
              {footer?.phone && <span>{footer.phone}</span>}
              {footer?.phone && footer?.email && <span aria-hidden>•</span>}
              {footer?.email && <a href={`mailto:${footer.email}`}>{footer.email}</a>}
            </div>

            {footer?.address && <span className="lg:col-span-3 lg:justify-self-end">{footer.address}</span>}
          </div>
        </div>
      </div>
    </footer>
  )
}
