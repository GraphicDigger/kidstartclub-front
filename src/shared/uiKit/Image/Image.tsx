'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import NextImage, { ImageProps as NextImageProps } from 'next/image'

export type ImageProps = NextImageProps

export const Image = ({
    src,
    alt = '',
    onLoad,
    style,
    ...props
}: ImageProps) => {
    const [loaded, setLoaded] = useState(false)
    const imgRef = useRef<HTMLImageElement | null>(null)

    const captureRef = useCallback((node: HTMLImageElement | null) => {
        imgRef.current = node
        // iOS Safari: cached images can finish loading before onLoad attaches,
        // so the load event never fires. Sync state from `complete` immediately.
        if (node && node.complete && node.naturalWidth > 0) {
            setLoaded(true)
        }
    }, [])

    useEffect(() => {
        const node = imgRef.current
        if (node && node.complete && node.naturalWidth > 0) {
            setLoaded(true)
        }
    }, [src])

    return (
        <>
            <NextImage
                ref={captureRef}
                src={src}
                alt={alt}
                onLoad={(e) => {
                    setLoaded(true)
                    onLoad?.(e)
                }}
                style={style}
                {...props}
            />
            <span
                aria-hidden
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: '#FFFFFF',
                    opacity: loaded ? 0 : 1,
                    transition: 'opacity .3s ease',
                    pointerEvents: 'none',
                }}
            />
        </>
    )
}

Image.displayName = 'Image'
