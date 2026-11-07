import React from 'react'

import type { Page } from '@/payload-types'

import { AltHero } from '@/heros/AltHero'
import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { SiteHero } from '@/heros/Hero'

const heroes = {
  altHero: AltHero,
  hero: SiteHero,
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
}

// Picks and renders the hero of a page.
export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  // Returns nothing when there is no hero.
  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  // Returns nothing for an unknown hero.
  if (!HeroToRender) return null

  // Returns the chosen hero.
  return <HeroToRender {...props} />
}
