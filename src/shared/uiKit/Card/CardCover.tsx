'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styled from '@emotion/styled'

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
  imageBgColor = '#F9F9F9',
  fixed = true,
  aspectRatio,
}: CardCoverProps) => {
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null)

  /** Явное fixed с родителя — только boolean true (не строка из старых данных) */
  const parentFixed = fixed === true

  const parentSlotAspect = parseAspectRatio(aspectRatio, 2)

  useEffect(() => {
    if (!src) return
    const img = new window.Image()
    let cancelled = false
    img.onload = () => {
      if (!cancelled && img.naturalWidth > 0) {
        setNatural({ w: img.naturalWidth, h: img.naturalHeight })
      }
    }
    img.onerror = () => {
      if (!cancelled) setNatural({ w: 5, h: 4 })
    }
    img.src = src
    return () => {
      cancelled = true
    }
  }, [src])

  if (!src) {
    return null
  }

  if (!natural) {
    return (
      <Root
        $bg={imageBgColor}
        $mode="loading"
        $slotAspect={parentFixed ? parentSlotAspect : WIDE_SLOT_ASPECT}
      />
    )
  }

  const wh = natural.w / natural.h
  const tooWideLow = wh > WIDE_WH_THRESHOLD

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

  /** Авто-широкая ячейка — cover; с родителя — портрет contain, иначе cover */
  const objectFit: 'contain' | 'cover' = tooWideLow && !parentFixed
    ? 'cover'
    : parentFixed && natural.h > natural.w
      ? 'contain'
      : 'cover'

  if (effectiveFixed) {
    return (
      <Root $bg={imageBgColor} $mode="fixed" $slotAspect={slotAspect}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          style={{
            objectFit,
            objectPosition: 'center',
          }}
        />
      </Root>
    )
  }

  return (
    <Root $bg={imageBgColor} $mode="natural" $slotAspect={slotAspect}>
      <Image
        src={src}
        alt={alt}
        width={natural.w}
        height={natural.h}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
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
