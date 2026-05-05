'use client'

import styled from '@emotion/styled'
import { Image } from '../Image'

export interface CardCoverProps {
  src?: string
  alt: string
  imageBgColor?: string
  /**
   * Slot aspect-ratio (width / height). Default 1.5 — landscape slot
   * matching the design language; portrait images letterbox via `contain`.
   * Ignored when `natural` is true.
   */
  aspectRatio?: number
  /** Override default `contain` if the call-site needs `cover`. Ignored when `natural` is true. */
  objectFit?: 'contain' | 'cover'
  priority?: boolean
  /** Render the image in its intrinsic proportions without cropping or letterboxing. */
  natural?: boolean
}

export const CardCover = ({
  src,
  alt,
  imageBgColor = '#f2f2f2',
  aspectRatio = 1.5,
  objectFit = 'contain',
  priority = false,
  natural = false,
}: CardCoverProps) => {
  if (!src) return null

  if (natural) {
    return (
      <NaturalRoot $bg={imageBgColor}>
        <Image
          src={src}
          alt={alt}
          width={0}
          height={0}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </NaturalRoot>
    )
  }

  return (
    <Root $bg={imageBgColor} $slotAspect={aspectRatio}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        style={{ objectFit, objectPosition: 'center' }}
      />
    </Root>
  )
}

const Root = styled.div<{ $bg: string; $slotAspect: number }>(
  ({ $bg, $slotAspect }) => ({
    position: 'relative',
    width: '100%',
    aspectRatio: $slotAspect,
    backgroundColor: $bg,
    overflow: 'hidden',
    flexShrink: 0,
    '& img': {
      animation: 'coverFadeIn .5s ease',
    },
  })
)

const NaturalRoot = styled.div<{ $bg: string }>(({ $bg }) => ({
  // display: 'content',
  width: '100%',
  backgroundColor: $bg,
  flexShrink: 0,
  '& img': {
    animation: 'coverFadeIn .5s ease',
  },
}))
