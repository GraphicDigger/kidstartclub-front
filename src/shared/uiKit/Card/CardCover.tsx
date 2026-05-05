'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { Image } from '../Image'

/**
 * «Узкая по высоте» (слишком широкий кадр): w/h > порога — авто-fixed ячейка WIDE_SLOT_ASPECT.
 */
const WIDE_WH_THRESHOLD = 1.5

/** Ячейка для авто-широких низких обложек: width / height */
const WIDE_SLOT_ASPECT = 1.5

export interface CardCoverProps {
  src?: string
  alt: string
  imageBgColor?: string
  /**
   * С родителя (`imageFixed`): принудительно fixed-ячейка с `aspectRatio`.
   * Авто w/h > 1.5 работает независимо, кроме явного `fixed={false}` (если передадите).
   */
  fixed?: boolean
  aspectRatio?: number | string
  priority?: boolean
}

function parseAspectRatio(value: number | string | undefined, fallback: number) {
  if (value === undefined) return fallback
  if (typeof value === 'number' && !Number.isNaN(value)) return value
  const n = parseFloat(String(value))
  return Number.isNaN(n) ? fallback : n
}

export const CardCover = ({
  src,
  alt,
  imageBgColor = '#f2f2f2',
  fixed = true,
  aspectRatio,
  priority = false,
}: CardCoverProps) => {
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)

  /** Явное fixed с родителя — только boolean true (не строка из старых данных) */
  const parentFixed = fixed === true

  const parentSlotAspect = parseAspectRatio(aspectRatio, 2)

  const measure = useCallback(() => {
    const node = imgRef.current
    if (node && node.naturalWidth > 0) {
      setNatural({ w: node.naturalWidth, h: node.naturalHeight })
    }
  }, [])

  const captureRef = useCallback(
    (node: HTMLImageElement | null) => {
      imgRef.current = node
      if (node && node.complete && node.naturalWidth > 0) {
        setNatural({ w: node.naturalWidth, h: node.naturalHeight })
      }
    },
    []
  )

  useEffect(() => {
    setNatural(null)
    const node = imgRef.current
    if (node && node.complete && node.naturalWidth > 0) {
      setNatural({ w: node.naturalWidth, h: node.naturalHeight })
    }
  }, [src])

  if (!src) {
    return null
  }

  const wh = natural ? natural.w / natural.h : 1
  const tooWideLow = !!natural && wh > WIDE_WH_THRESHOLD

  /** Родительский `imageFixed` ИЛИ авто по широкому кадру (w/h > 1.5). `imageFixed={false}` не отключает авто-широкий режим. */
  const effectiveFixed = parentFixed || tooWideLow

  /**
   * Слот: с родителя — всегда `aspectRatio`; иначе авто-широкая — 1.5∶1
   */
  const slotAspect = parentFixed
    ? parentSlotAspect
    : tooWideLow
      ? WIDE_SLOT_ASPECT
      : parentSlotAspect

  return (
    <Root $bg={imageBgColor} $mode="fixed" $slotAspect={slotAspect}>
      <Image
        ref={captureRef}
        src={src}
        alt={alt}
        fill
        priority={priority}
        fadeBg={imageBgColor}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        onLoad={measure}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    </Root>
  )
}

const Root = styled.div<{
  $bg: string
  $mode: 'loading' | 'fixed' | 'natural'
  $slotAspect: number
}>(({ $bg, $mode, $slotAspect }) => ({
  position: 'relative',
  width: '100%',
  backgroundColor: $bg,
  overflow: 'hidden',
  flexShrink: 0,
  ...($mode === 'loading'
    ? {
      minHeight: 180,
    }
    : $mode === 'fixed'
      ? {
        aspectRatio: $slotAspect,
        '@container (max-width: 400px)': {
          aspectRatio:
            $slotAspect >= 1 ? Math.min($slotAspect, 1.5) : $slotAspect,
        },
      }
      : {}),
}))
