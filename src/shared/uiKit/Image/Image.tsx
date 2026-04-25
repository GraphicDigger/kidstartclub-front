'use client'

import { useState } from 'react'
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

    return (
        <>
            <NextImage
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
