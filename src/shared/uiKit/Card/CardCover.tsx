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
    if (!src) return
    let cancelled = false
    let rafId: number | null = null

    const apply = (w: number, h: number) => {
      if (cancelled) return
      setNatural({ w, h })
    }

    // Independent probe — guaranteed to deliver natural dimensions even
    // when the on-screen <img> does not fire `load` on mobile WebKit.
    const probe = new window.Image()
    probe.onload = () => apply(probe.naturalWidth, probe.naturalHeight)
    probe.onerror = () => apply(5, 4)
    probe.src = src
    if (probe.complete && probe.naturalWidth > 0) {
      apply(probe.naturalWidth, probe.naturalHeight)
    } else if (typeof probe.decode === 'function') {
      probe.decode().then(() => apply(probe.naturalWidth, probe.naturalHeight)).catch(() => {})
    }

    // Also poll the actually-rendered image element — it may be the only
    // path that succeeds in some mobile browsers.
    const tick = () => {
      if (cancelled) return
      const node = imgRef.current
      if (node && node.naturalWidth > 0) {
        apply(node.naturalWidth, node.naturalHeight)
        return
      }
      rafId = window.requestAnimationFrame(tick)
    }
    rafId = window.requestAnimationFrame(tick)

    return () => {
      cancelled = true
      probe.onload = null
      probe.onerror = null
      if (rafId !== null) window.cancelAnimationFrame(rafId)
    }
  }, [src])

  if (!src) {
    return null
  }

  const wh = natural ? natural.w / natural.h : 1
  const tooWideLow = !!natural && wh > WIDE_WH_THRESHOLD

  /**
   * Слот: с родителя — всегда `aspectRatio`; иначе авто-широкая — 1.5∶1
   */
  const slotAspect = parentFixed
    ? parentSlotAspect
    : tooWideLow
      ? WIDE_SLOT_ASPECT
      : parentSlotAspect

  /** Авто-широкая ячейка — cover; с родителя — портрет contain, иначе cover */
  const objectFit: 'contain' | 'cover' =
    tooWideLow && !parentFixed
      ? 'cover'
      : parentFixed && natural && natural.h > natural.w
        ? 'contain'
        : 'cover'

  return (
    <Root $bg={imageBgColor} $mode="fixed" $slotAspect={slotAspect}>
      <Image
        ref={captureRef}
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        onLoad={measure}
        style={{
          objectFit,
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
