import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { CustomFormBlock } from '@/blocks/CustomForm/Component'
import { FaqListBlock } from '@/blocks/FaqList/Component'
import { FeatureCardsBlock } from '@/blocks/FeatureCards/Component'
import { FeatureCarouselBlock } from '@/blocks/FeatureCarousel/Component'
import { FeatureSplitBlock } from '@/blocks/FeatureSplit/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { NewsBlockComponent } from '@/blocks/NewsBlock/Component'
import { Reveal } from '@/components/Reveal'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  customForm: CustomFormBlock,
  faqList: FaqListBlock,
  featureCards: FeatureCardsBlock,
  featureCarousel: FeatureCarouselBlock,
  featureSplit: FeatureSplitBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  newsBlock: NewsBlockComponent,
}

// Lists the blocks that fill the full page width.
export const fullBleedBlocks = new Set([
  'customForm',
  'faqList',
  'featureCards',
  'featureCarousel',
  'featureSplit',
  'newsBlock',
])

// Renders every block of a page in order.
export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  // Checks if it has blocks.
  if (hasBlocks) {
    // Returns all blocks in a fragment.
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          // Checks if block type is set and block type is in block components.
          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            // Checks if block is set.
            if (Block) {
              // Checks if full bleed blocks has block type.
              if (fullBleedBlocks.has(blockType)) {
                // Returns a full width block.
                return (
                  <Reveal key={index}>
                    {/* @ts-expect-error there may be some mismatch between the expected types here */}
                    <Block {...block} disableInnerContainer />
                  </Reveal>
                )
              }

              // Returns a block inside a wrapper.
              return (
                <Reveal className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </Reveal>
              )
            }
          }
          // Returns nothing for an unknown block.
          return null
        })}
      </Fragment>
    )
  }

  // Returns nothing when there are no blocks.
  return null
}
