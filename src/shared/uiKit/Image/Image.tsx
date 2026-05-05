'use client'

import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import NextImage, { ImageProps as NextImageProps } from 'next/image'

export type ImageProps = NextImageProps & {
    /** Show a solid background that fades out when the image is decoded. */
    fadeBg?: string
}

/**
 * Safety fallback: even if onLoad never fires (mobile WebKit/Chrome have
 * known bugs with `<img loading=lazy>` + `aspect-ratio` parents and with
 * Next/Image `fill`), force the overlay to fade after this timeout so the
 * image is never permanently hidden behind it.
 */
const OVERLAY_SAFETY_MS = 1200

export const Image = forwardRef<HTMLImageElement, ImageProps>(
    ({ alt = '', onLoad, fadeBg = '#FFFFFF', ...props }, forwardedRef) => {
        const [loaded, setLoaded] = useState(false)
        const localRef = useRef<HTMLImageElement | null>(null)

        const setRef = useCallback(
            (node: HTMLImageElement | null) => {
                localRef.current = node
                if (typeof forwardedRef === 'function') forwardedRef(node)
                else if (forwardedRef) forwardedRef.current = node
                if (node && node.complete && node.naturalWidth > 0) {
                    setLoaded(true)
                }
            },
            [forwardedRef]
        )

        useEffect(() => {
            const node = localRef.current
            if (node && node.complete && node.naturalWidth > 0) {
                setLoaded(true)
                return
            }
            const id = window.setTimeout(() => setLoaded(true), OVERLAY_SAFETY_MS)
            return () => window.clearTimeout(id)
        }, [props.src])

        return (
            <>
                <NextImage
                    ref={setRef}
                    alt={alt}
                    onLoad={(e) => {
                        setLoaded(true)
                        onLoad?.(e)
                    }}
                    {...props}
                />
                <span
                    aria-hidden
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: fadeBg,
                        opacity: loaded ? 0 : 1,
                        transition: 'opacity .4s ease',
                        pointerEvents: 'none',
                    }}
                />
            </>
        )
    }
)

Image.displayName = 'Image'
