'use client'

import NextImage, { ImageProps as NextImageProps } from 'next/image'

export type ImageProps = NextImageProps

export const Image = ({ alt = '', ...props }: ImageProps) => {
    return <NextImage alt={alt} {...props} />
}

Image.displayName = 'Image'
