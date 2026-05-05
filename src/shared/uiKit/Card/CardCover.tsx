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
   */
  aspectRatio?: number
  /** Override default `contain` if the call-site needs `cover`. */
  objectFit?: 'contain' | 'cover'
  priority?: boolean
}

export const CardCover = ({
  src,
  alt,
  imageBgColor = '#f2f2f2',
  aspectRatio = 1.5,
  objectFit = 'contain',
  priority = false,
}: CardCoverProps) => {
  if (!src) return null
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
