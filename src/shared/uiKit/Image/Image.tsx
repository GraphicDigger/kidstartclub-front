'use client'

import { forwardRef } from 'react'
import NextImage, { ImageProps as NextImageProps } from 'next/image'

export type ImageProps = NextImageProps

export const Image = forwardRef<HTMLImageElement, ImageProps>(
    ({ alt = '', ...props }, ref) => {
        return <NextImage ref={ref} alt={alt} {...props} />
    }
)

Image.displayName = 'Image'
