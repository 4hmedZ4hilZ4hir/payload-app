import { ArrowUpRight, AudioLines, ChevronDown, Menu } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { getCachedGlobal } from '@/utilities/getGlobals'

const pill =
  'inline-flex items-center rounded-full bg-neutral-100 px-3 py-1.5 text-sm text-ink transition-colors hover:bg-neutral-200'

// Renders the site header.
export async function Header() {
  const header = await getCachedGlobal('header', 1)()
  const navItems = header?.navItems || []

  // Returns the header bar.
  return (
    <header data-header-band className="relative z-20 bg-ink p-2 sm:p-3">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-3xl bg-white px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xl font-medium tracking-tight text-ink">
            {header?.logoText}
          </Link>
          <span className="hidden size-10 items-center justify-center rounded-full border border-neutral-200 text-ink sm:flex">
            <AudioLines className="size-4" />
          </span>
        </div>

        <nav className="hidden items-center gap-1.5 md:flex">
          {navItems.map(({ link }, i) => (
            <CMSLink key={i} {...link} appearance="inline" className={pill} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {header?.showCta && header.cta && (
            <CMSLink
              {...header.cta}
              appearance="inline"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
            >
              <ArrowUpRight className="size-4" />
            </CMSLink>
          )}

          {header?.languageLabel && (
            <span className="hidden items-center gap-2 rounded-full border border-neutral-200 px-4 py-2.5 text-sm text-ink sm:inline-flex">
              {header.languageLabel}
              <ChevronDown className="size-4" />
            </span>
          )}

          <details className="relative md:hidden">
            <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-full border border-neutral-200 [&::-webkit-details-marker]:hidden">
              <Menu className="size-5" />
              <span className="sr-only">Menu</span>
            </summary>
            <nav className="absolute right-0 top-12 z-30 flex min-w-48 flex-col gap-1 rounded-2xl border border-neutral-200 bg-white p-2 shadow-lg">
              {navItems.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  appearance="inline"
                  className="rounded-xl px-3 py-2 text-sm text-ink hover:bg-neutral-100"
                />
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  )
}
