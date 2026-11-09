'use client'

import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'

import { CountUp } from '@/components/Reveal/CountUp'
import { cn } from '@/utilities/ui'

type Currency = {
  code: string
  symbol?: string | null
  flag?: string | null
  rate?: number | null
}

type Props = {
  icon?: React.ReactNode
  title?: string | null
  badge?: string | null
  label?: string | null
  value?: string | null
  description?: string | null
  details?: { label: string; value: string; id?: string | null }[] | null
  accountLast4?: string | null
  validThru?: string | null
  currencies?: Currency[] | null
  dropUp?: boolean
  floatStyle?: React.CSSProperties
}

// Draws a round country flag from a two-letter country code.
const Flag: React.FC<{ code?: string | null }> = ({ code }) => {
  // Shows nothing without a code.
  if (!code) return null
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      alt=""
      className="size-5 rounded-full object-cover lg:size-24"
    />
  )
}

// One floating card of the hero (notification or balance style).
export const HeroStatCard: React.FC<Props> = ({
  icon,
  title,
  badge,
  label,
  value,
  description,
  details,
  accountLast4,
  validThru,
  currencies,
  dropUp,
  floatStyle,
}) => {
  const list = (currencies || []).filter((c) => c.code)
  const [selected, setSelected] = useState(0)
  const [open, setOpen] = useState(false)
  const current = list[selected]

  // Works out the text of the big value in the chosen currency.
  let shown = value || ''
  // Converts the typed amount when currencies are set.
  if (value && current) {
    const base = parseFloat(value.replace(/[^0-9.]/g, ''))
    // Keeps the typed text when it is not a number.
    if (!Number.isNaN(base)) {
      const rate = selected === 0 ? 1 : (current.rate ?? 1)
      shown = `${current.symbol ?? ''}${(base * rate).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    }
  }

  const hasTop = icon || title || badge || list.length > 0
  const hasBottom = accountLast4 || validThru

  // Returns the card.
  return (
    <div
      style={floatStyle}
      className="rounded-xl bg-white p-3 text-ink shadow-xl shadow-black/20 sm:min-w-56 sm:rounded-2xl sm:p-4 lg:min-w-310 lg:rounded-d19 lg:p-20"
    >
      {hasTop && (
        <div className="mb-3 flex items-center justify-between gap-3 lg:mb-18">
          <div className="flex items-center gap-2 lg:gap-10">
            {icon}
            {title && (
              <span className="text-base font-bold italic tracking-tight lg:text-d18">{title}</span>
            )}
          </div>

          {list.length > 0 ? (
            <div className="relative">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-1.5 rounded-full bg-neutral-100 py-1 pl-1 pr-2.5 text-xs transition-colors hover:bg-neutral-200 lg:gap-6 lg:py-4 lg:pl-4 lg:pr-12 lg:text-d13"
              >
                <Flag code={current?.flag} />
                {current?.code}
                <ChevronDown
                  className={cn('size-3.5 transition-transform lg:size-15', open && 'rotate-180')}
                />
              </button>
              {open && (
                <ul
                  role="listbox"
                  className={cn(
                    'absolute right-0 z-30 min-w-28 rounded-xl border border-neutral-200 bg-white p-1 shadow-lg lg:min-w-120 lg:p-4',
                    dropUp ? 'bottom-full mb-2' : 'top-full mt-2',
                  )}
                >
                  {list.map((c, i) => (
                    <li key={c.code + i}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={i === selected}
                        onClick={() => {
                          setSelected(i)
                          setOpen(false)
                        }}
                        className={cn(
                          'flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs hover:bg-neutral-100 lg:gap-8 lg:px-8 lg:py-6 lg:text-d13',
                          i === selected && 'font-semibold',
                        )}
                      >
                        <Flag code={c.flag} />
                        {c.code}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            badge && (
              <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-600 lg:px-10 lg:text-d12">
                {badge}
              </span>
            )
          )}
        </div>
      )}

      {value ? (
        <>
          {label && <p className="text-xs text-neutral-400 lg:text-d13">{label}</p>}
          <p className="mt-1 text-2xl font-medium tracking-tight sm:text-3xl lg:mt-8 lg:text-d30">
            <CountUp value={shown} lightDecimals />
          </p>
        </>
      ) : (
        label && <p className="text-sm font-semibold lg:text-d15">{label}</p>
      )}

      {description && (
        <p className="mt-1 max-w-64 text-xs leading-snug text-neutral-500 lg:mt-6 lg:max-w-260 lg:text-d12">
          {description}
        </p>
      )}

      {hasBottom && (
        <div className="mt-4 flex items-end justify-between gap-6 lg:mt-24">
          {accountLast4 && (
            <div>
              <p className="text-[10px] text-neutral-400 lg:text-d12">Account Number</p>
              <p className="mt-0.5 text-xs font-medium lg:mt-4 lg:text-d13">
                **** {accountLast4.replace(/\D/g, '').slice(-4)}
              </p>
            </div>
          )}
          {validThru && (
            <div className="text-right">
              <p className="text-[10px] text-neutral-400 lg:text-d12">Valid Thru</p>
              <p className="mt-0.5 text-xs font-medium lg:mt-4 lg:text-d13">{validThru}</p>
            </div>
          )}
        </div>
      )}

      {details && details.length > 0 && (
        <dl className="mt-3 flex gap-6 border-t border-neutral-100 pt-3 lg:mt-14 lg:gap-30 lg:pt-12">
          {details.map((d, j) => (
            <div key={d.id ?? j}>
              <dt className="text-[10px] text-neutral-400 lg:text-d12">{d.label}</dt>
              <dd className="text-xs font-medium lg:text-d13">{d.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
