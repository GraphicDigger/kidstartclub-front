'use client'

import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import NextImage, { ImageProps as NextImageProps } from 'next/image'

export type ImageProps = NextImageProps & {
    /** Show a solid background that fades out when the image is decoded. */
    fadeBg?: string
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
    ({ alt = '', onLoad, fadeBg = '#FFFFFF', ...props }, forwardedRef) => {
        const [loaded, setLoaded] = useState(false)
        const localRef = useRef<HTMLImageElement | null>(null)

        const setRef = useCallback(
            (node: HTMLImageElement | null) => {
                localRef.current = node
                if (typeof forwardedRef === 'function') forwardedRef(node)
                else if (forwardedRef) forwardedRef.current = node
                // Mobile WebKit / Chrome: cached images can finish decoding
                // before onLoad attaches, so the load event never fires.
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
            }
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
                        transition: 'opacity .3s ease',
                        pointerEvents: 'none',
                        zIndex: 0,
                    }}
                />
            </>
        )
    }
)

Image.displayName = 'Image'
