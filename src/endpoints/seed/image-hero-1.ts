import type { Media } from '@/payload-types'

// Defines the seed data for the hero image.
export const imageHero1: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Straight metallic shapes with a blue gradient',
}
